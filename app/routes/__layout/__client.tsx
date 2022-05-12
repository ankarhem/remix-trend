import type { LoaderFunction } from 'remix';
import { json, Outlet, useMatches } from 'remix';
import { cartIdCookie } from '~/cookies';
import type { CartQuery } from '~/graphql/types';
import { CartDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export type ClientQueries = {
  cart: CartQuery['cart'];
};

export function useClientData() {
  const matches = useMatches();
  const clientData = matches.find(
    (match) => match.id === 'routes/__layout/__client'
  )?.data as ClientQueries | undefined;

  return {
    cart: clientData?.cart,
  };
}

export const loader: LoaderFunction = async (args) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const cartIdInCookie = await cartIdCookie.parse(cookieHeader);

  const [cartResult] = await Promise.all([
    sendJetshopRequest({
      args: args,
      query: CartDocument,
      variables: {
        cartId: cartIdInCookie || '498954d6-a89b-4360-aa1b-a8e2a543c8fc',
      },
    }),
  ]);

  const [cart] = await Promise.all([cartResult.json()]);

  return json({
    cart: cart.data.cart,
  });
};

export default function PageContent() {
  return <Outlet />;
}
