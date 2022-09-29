import type {
  ResultOf,
  TypedDocumentNode,
  VariablesOf,
} from '@graphql-typed-document-node/core';
import { print } from 'graphql';
import { Exact } from '~/graphql/types';
import { sendGraphQLRequest } from 'remix-graphql/index.server';
import type { FuncParams } from './utils/types';

type StoreAPIError = {
  message?: string;
  extensions?: {
    code?: string;
  };
};

interface StoreAPIResponse<T> {
  data?: T;
  errors?: StoreAPIError[];
}

type TypedResponse<T> = Promise<Response & {
  json: () => Promise<StoreAPIResponse<ResultOf<T>>>
}>

export const sendJetshopRequest = async <T extends TypedDocumentNode<any, any>>(
  props: Omit<
    FuncParams<typeof sendGraphQLRequest>,
    'endpoint' | 'query' | 'variables'
  > & {
    query: T;
    variables?: VariablesOf<T> extends Exact<{
      [key: string]: never;
    }>
      ? undefined
      : VariablesOf<T>;
    // Generated types have a required but empty variables object
    // this massages the types so that you just don't include it if that's the case
  }
): TypedResponse<T> => {
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
  })
};
