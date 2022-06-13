import type {
  ResultOf,
  TypedDocumentNode,
  VariablesOf,
} from '@graphql-typed-document-node/core';
import { print } from 'graphql';
import { sendGraphQLRequest } from 'remix-graphql/index.server';
import type { FuncParams } from './utils/types';

export const sendJetshopRequest = <T extends TypedDocumentNode<any, any>>(
  props: Omit<
    FuncParams<typeof sendGraphQLRequest>,
    'endpoint' | 'query' | 'variables'
  > & {
    query: T;
    variables: VariablesOf<T>;
  }
) => {
  const token = process.env.STOREAPI_TOKEN;

  if (!token) {
    throw new Error('STOREAPI_TOKEN is not set');
  }

  return new Promise<ResultOf<T>>((resolve, reject) => {
    sendGraphQLRequest({
      ...props,
      endpoint: 'https://storeapi.jetshop.io',
      headers: {
        token: token,
        shopid: process.env.SHOP_ID || 'demostore',
        ...props.headers,
      },
      query: typeof props.query === 'string' ? props.query : print(props.query),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          reject(json.errors);
        }
        resolve(json.data);
      });
  });
};
