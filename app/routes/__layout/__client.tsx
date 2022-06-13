import type { LoaderFunction } from 'remix';
import { json, Outlet, useFetchers, useMatches } from 'remix';
import type { CartQuery } from '~/graphql/types';
import { getSession } from '~/session.server';

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

export const loader: LoaderFunction = async (args) => {
  const session = await getSession(args);
  const cart = await session.getCart();

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
      cart: cart,
    },
    { headers }
  );
};

export default function PageContent() {
  return <Outlet />;
}
