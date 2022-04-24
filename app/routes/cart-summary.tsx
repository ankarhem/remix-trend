import { ActionFunction, json, LoaderFunction, useLoaderData } from 'remix';
import { cartIdCookie } from '~/cookies';
import {
  AddToCartDocument,
  AddToCartMutation,
  CartDocument,
  CartQuery,
} from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export const loader: LoaderFunction = async (args) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const cartId = await cartIdCookie.parse(cookieHeader);

  const cartResult = await sendJetshopRequest({
    args: args,
    query: CartDocument,
    variables: {
      cartId: cartId,
    },
  });

  const cart = await cartResult.json();
  const data: CartQuery = cart.data;

  if (!data.cart?.id) {
    return json(data.cart);
  }

  return json(data.cart, {
    headers: {
      'Set-Cookie': await cartIdCookie.serialize(data.cart.id),
      Vary: 'Cookie',
    },
  });
};

export const action: ActionFunction = async (args) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const cartId = await cartIdCookie.parse(cookieHeader);
  const body = await args.request.formData();

  const cartResult = await sendJetshopRequest({
    args: args,
    query: AddToCartDocument,
    variables: {
      input: {
        cartId: cartId ?? undefined,
        articleNumber: body.get('articleNumber'),
      },
    },
  });

  const cart = await cartResult.json();
  const data: AddToCartMutation = cart.data;

  const newCartId = data.addToCart?.cart?.id;
  console.log(newCartId);

  if (!newCartId) {
    throw new Response('Bad Request', {
      status: 400,
    });
  }

  return json(data.addToCart?.cart, {
    headers: {
      'Set-Cookie': await cartIdCookie.serialize(newCartId),
      Vary: 'Cookie',
    },
  });
};

function Cart() {
  const { cart } = useLoaderData<CartQuery>();

  return <pre>{JSON.stringify(cart, null, 2)}</pre>;
}

export default Cart;
