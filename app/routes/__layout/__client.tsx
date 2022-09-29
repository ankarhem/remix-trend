import { Outlet, useFetchers, useMatches } from '@remix-run/react';
import { json, type DataFunctionArgs } from '@remix-run/server-runtime';
import { getSession } from '~/cookies';
import type { CartQuery } from '~/graphql/types';
import { CartDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export type ClientQueries = {
  cart: CartQuery['cart'];
};

export function useClientData() {
  const matches = useMatches();
  const fetchers = useFetchers();

  const clientData = matches.find(
    (match) => match.id === 'routes/__layout/__client'
  )?.data as ClientQueries | undefined;

  const cartFetcher = fetchers.filter((fetcher) => {
    return fetcher.state !== 'idle' && fetcher.submission?.action === '/cart';
  })?.[0];

  if (!cartFetcher) {
    return {
      cart: clientData?.cart,
    };
  }

  const cartForm = cartFetcher.submission?.formData;
  const action = cartForm?.get('_action');
  switch (action) {
    case 'addToCart':
      const transitionCartWithUpdatedQuantity: CartQuery['cart'] = {
        ...clientData?.cart,
        totalQuantity: clientData?.cart?.totalQuantity
          ? clientData?.cart.totalQuantity + 1
          : 1,
      };
      return {
        cart: transitionCartWithUpdatedQuantity,
      };
  }

  return {
    cart: clientData?.cart,
  };
}

export const loader = async (args: DataFunctionArgs) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const session = await getSession(cookieHeader);

  const cartId = session.get('cartId');

  const [cartResult] = await Promise.all([
    sendJetshopRequest({
      args: args,
      query: CartDocument,
      variables: {
        cartId: cartId || '498954d6-a89b-4360-aa1b-a8e2a543c8fc',
      },
    }),
  ]);

  const [cart] = await Promise.all([cartResult.json()]);

  const headers = new Headers();

  let purpose =
    args.request.headers.get('Purpose') ||
    args.request.headers.get('X-Purpose') ||
    args.request.headers.get('Sec-Purpose') ||
    args.request.headers.get('Sec-Fetch-Purpose') ||
    args.request.headers.get('Moz-Purpose');

  if (purpose) {
    headers.append('Cache-Control', 'private, max-age=10');
  }

  return json(
    {
      cart: cart.data.cart,
    },
    { headers }
  );
};

export default function PageContent() {
  return <Outlet />;
}
