import React, { Fragment } from 'react';
import type { z } from 'zod';
import type { ContentItemProperty, Maybe, Scalars } from '~/graphql/types';
import { isDev } from '~/utils/common';

/**
 * Type juggling because GraphQL changed their type standard,
 * so we need to force alias on boolean values to it's own property name
 **/
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

/**
 * Convert the shitty GraphQL type to what
 * one would expect as a React component props
 */
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

const ContentItemComponent = ({
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

  // If the component has a schema, we need to validate the props
  // This throws a validation error if the props are not valid
  if (schema) {
    schema.parse(props);
  } else if (isDev) {
    console.warn(`Component ${item.type} has no schema defined.`);
  }

  /**
   * This is a bit hacky, but it's the only way encapsulate
   * components such that we can wrap them in an "ErrorBoundary"
   *
   * I.e. what this does is that we render each item in a try-catch block
   * and if the component itself has an exported ErrorBoundary
   * it will still render the parent and replace the errored child
   * with the ErrorBoundary. Therefore allowing partly rendered content.
   *
   * If it doesn't have an ErrorBoundary, it will pass the error to the parent
   * and the parent will render its own ErrorBoundary if it exists.
   *
   * If no ErrorBoundary is defined, it will just throw the error, in which case
   * the Remix Route ErrorComponent will be rendered.
   */
  try {
    const children =
      item?.children
        ?.filter((i) => !!i)
        .map((childItem, index) => {
          if (!childItem) return null;
          try {
            const Contents = ContentItemComponent({
              components,
              item: childItem,
            });
            return (
              <Fragment key={`${childItem.type}-${index}`}>{Contents}</Fragment>
            );
          } catch (e) {
            const ChildComponent = components[childItem.type];
            if (!ChildComponent?.hasOwnProperty('ErrorComponent')) throw e;
            const ChildErrorComponent = (ChildComponent as any).ErrorComponent;

            return <ChildErrorComponent error={e} />;
          }
        }) || null; // cant return undefined as children
    return <Component {...props}>{children}</Component>;
  } catch (e) {
    if (!Component.hasOwnProperty('ErrorComponent')) throw e;

    const ErrorComponent = (Component as any).ErrorComponent;
    return <ErrorComponent error={e} />;
  }
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
          // Calling it as a function circumvents the problem
          try {
            const Contents = ContentItemComponent({ item, components });
            return (
              <Fragment key={`${item.type}-${index}`}>{Contents}</Fragment>
            );
          } catch (e) {
            if (!ErrorComponent) throw e;
            return <ErrorComponent key={`${item.type}-${index}`} error={e} />;
          }
        })}
    </>
  );
}
