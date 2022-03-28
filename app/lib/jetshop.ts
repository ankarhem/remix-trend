import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';
import { sendGraphQLRequest } from 'remix-graphql/index.server';

type FuncParams<T extends (args: any) => any> = T extends (args: infer P) => any
  ? P
  : never;

export const sendJetshopRequest = (
  props: Omit<FuncParams<typeof sendGraphQLRequest>, 'endpoint' | 'query'> & {
    query: TypedDocumentNode<any, any> | string;
  }
) => {
  return sendGraphQLRequest({
    ...props,
    endpoint: 'https://storeapi.jetshop.io',
    headers: {
      token: '359fd7c1-8e72-4270-b899-2bda9ae6ef57',
      shopid: 'demostore',
      ...props.headers,
    },
    query: typeof props.query === 'string' ? props.query : print(props.query),
  });
};
