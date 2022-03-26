import { sendGraphQLRequest } from 'remix-graphql/index.server';

type FuncParams<T extends (args: any) => any> = T extends (args: infer P) => any
  ? P
  : never;

export const sendJetshopRequest = (
  props: Omit<FuncParams<typeof sendGraphQLRequest>, 'endpoint'>
) => {
  return sendGraphQLRequest({
    ...props,
    endpoint: 'https://storeapi.jetshop.io',
    headers: {
      token: '359fd7c1-8e72-4270-b899-2bda9ae6ef57',
      shopid: 'demostore',
      ...props.headers,
    },
  });
};
