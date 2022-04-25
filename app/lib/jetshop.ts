import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';
import { sendGraphQLRequest } from 'remix-graphql/index.server';
import { FuncParams } from './utils/types';

export const sendJetshopRequest = (
  props: Omit<FuncParams<typeof sendGraphQLRequest>, 'endpoint' | 'query'> & {
    query: TypedDocumentNode<any, any> | string;
  }
) => {
  const token = process.env.STOREAPI_TOKEN;

  if (!token) {
    throw new Error('STOREAPI_TOKEN is not set');
  }

  return sendGraphQLRequest({
    ...props,
    endpoint: 'https://storeapi.jetshop.io',
    headers: {
      token: token,
      shopid: process.env.SHOP_ID || 'demostore',
      ...props.headers,
    },
    query: typeof props.query === 'string' ? props.query : print(props.query),
  });
};
