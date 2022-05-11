import React from 'react';
import type { z } from 'zod';
import type { ContentItemProperty, Maybe, Scalars } from '~/graphql/types';

type ContentItem = {
  children?: Maybe<Maybe<ContentItem | BoolContentItem>[]> | undefined;
  properties?:
    | Maybe<Maybe<ContentItemProperty | BoolContentItemProperty>[]>
    | undefined;
  type: Scalars['String'];
};

type BoolContentItemProperty = Omit<ContentItemProperty, 'value'> & {
  boolValue?: Maybe<boolean>;
};

type BoolContentItem = {
  children?: Maybe<Maybe<BoolContentItem>[]> | undefined;
  properties?: Maybe<Maybe<BoolContentItemProperty>[]> | undefined;
  type: Scalars['String'];
};

export type ErrorBoundary = React.FC<{ error: Error }>;

export type ContentComponents = {
  [key: string]:
    | undefined
    | React.FC<any>
    | (React.FC<any> & { schema?: z.Schema; ErrorComponent: ErrorBoundary });
};

const convertPropsToObject = (item: ContentItem) => {
  const props = item.properties?.reduce(
    (merged: Record<string, any>, current) => {
      if (!current) return merged;

      const propKey = current.name;

      switch (current.valueType) {
        case 'SCALAR':
          const stringValue = (current as any)?.value?.value;
          const boolValue = (current as any)?.value?.boolValue;
          const primitive = stringValue || boolValue;
          merged[propKey] = primitive;
          break;
        case 'OBJECT':
          const object = (current as any)?.value;
          merged[propKey] = object;
          break;
        default:
          break;
      }
      return merged;
    },
    {}
  );

  return props;
};

const renderItem = ({
  components,
  item,
}: {
  components: ContentComponents;
  item: ContentItem;
}) => {
  const Component = components[item.type];

  if (!Component) {
    throw new Error(
      `Component ${item.type} has no defined implementation. Did you forget to pass it to the ContentRenderer?`
    );
  }

  const props = convertPropsToObject(item);

  const schema = Component.hasOwnProperty('schema')
    ? (Component as any).schema
    : undefined;

  if (schema) {
    schema.parse(props);
  }

  return (
    <Component {...props}>
      {item.children && item.children.length > 0 ? (
        <ContentRenderer items={item.children} components={components} />
      ) : null}
    </Component>
  );
};

export function ContentRenderer({
  items,
  components,
  ErrorComponent: FallbackErrorComponent,
}: {
  items: Maybe<Maybe<ContentItem>[]> | undefined;
  components: ContentComponents;
  ErrorComponent?: ErrorBoundary;
}) {
  if (!items) return null;
  return (
    <>
      {items
        .filter((i) => !!i)
        .map((item, index) => {
          // should never happen but types are not correct
          if (!item) return null;
          const Component = components[item.type];
          const ErrorComponent = Component?.hasOwnProperty('ErrorComponent')
            ? (Component as any).ErrorComponent
            : FallbackErrorComponent;

          // Need to do this with imperative error handling
          // because ErrorBoundaries doesn't have SSR support
          try {
            return renderItem({ components, item });
          } catch (e) {
            return <ErrorComponent key={`${item.type}-${index}`} error={e} />;
          }
        })}
    </>
  );
}
