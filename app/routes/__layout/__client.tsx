import type { LoaderFunction } from 'remix';
import { json, Outlet, useFetchers, useMatches } from 'remix';
import { cartIdCookie } from '~/cookies';
import type { CartQuery } from '~/graphql/types';
import { CartDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';
import { CartAction } from '../cart';

export type ClientQueries = {
  cart: CartQuery['cart'];
};

export function useClientData() {
  const matches = useMatches();
  const fetchers = useFetchers();

  console.log(fetchers);

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
  const itemId = cartForm?.get('_itemId'); // only for remove, increment, decrement
  switch (action) {
    case CartAction.AddToCart:
      const AddTransitionCart: CartQuery['cart'] = {
        ...clientData?.cart,
        totalQuantity: clientData?.cart?.totalQuantity
          ? clientData?.cart.totalQuantity + 1
          : 1,
      };
      return {
        cart: AddTransitionCart,
      };
    case CartAction.RemoveFromCart:
      if (!itemId) {
        return {
          cart: clientData?.cart,
        };
      }
      const removeItems = clientData?.cart?.items?.filter(
        (item) => item?.id !== itemId
      );
      const RemoveTransitionCart: CartQuery['cart'] = {
        ...clientData?.cart,
        items: removeItems,
      };
      return {
        cart: RemoveTransitionCart,
      };

    case CartAction.IncrementItemQuanity:
      if (!itemId) {
        return {
          cart: clientData?.cart,
        };
      }

      const incrementItems = clientData?.cart?.items?.map((item) => {
        if (item?.id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      const IncrementTransitionCart: CartQuery['cart'] = {
        ...clientData?.cart,
        items: incrementItems,
      };
      return {
        cart: IncrementTransitionCart,
      };

    case CartAction.DecrementItemQuantity:
      if (!itemId) {
        return {
          cart: clientData?.cart,
        };
      }

      const decrementItems = clientData?.cart?.items?.map((item) => {
        if (item?.id === itemId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      const DecrementTransitionCart: CartQuery['cart'] = {
        ...clientData?.cart,
        items: decrementItems,
      };
      return {
        cart: DecrementTransitionCart,
      };
  }

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
