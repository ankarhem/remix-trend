import React from 'react';
import type { z } from 'zod';
import type { ContentItem, Maybe } from '~/graphql/types';

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
          const primitive = ((current.value as any)?.value ||
            (current.value as any)?.boolValue) as string | boolean;
          merged[propKey] = primitive;
          break;
        case 'OBJECT':
          const object = current.value;
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
          // should never happend but types are not correct
          if (!item) return null;

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
            try {
              schema.parse(props);
            } catch (e) {
              const ErrorComponent = Component.hasOwnProperty('ErrorComponent')
                ? (Component as any).ErrorComponent
                : FallbackErrorComponent;
              return <ErrorComponent error={e} />;
            }
          }

          return (
            <Component key={`${item.type}-${index}`} {...props}>
              {item.children && item.children.length > 0 ? (
                <ContentRenderer
                  items={item.children}
                  components={components}
                />
              ) : null}
            </Component>
          );
        })}
    </>
  );
}
