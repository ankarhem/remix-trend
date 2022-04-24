import React from 'react';
import { json, LoaderFunction, useLoaderData } from 'remix';
import { v4 as uuid } from 'uuid';
import { cartIdCookie } from '~/cookies';
import { CartDocument, CartQuery } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export const loader: LoaderFunction = async (args) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const cartId =
    'b8a7ca1a-48a0-4728-a831-34643d2fb634' ||
    (await cartIdCookie.parse(cookieHeader)) ||
    uuid();

  const cartResult = await sendJetshopRequest({
    args: args,
    query: CartDocument,
    variables: {
      cartId: cartId,
    },
  });

  const cart = await cartResult.json();

  return json(
    {
      cart: {
        ...cart.data.cart,
        id: cartId,
      },
    },
    {
      headers: {
        'Set-Cookie': await cartIdCookie.serialize(cartId),
        Vary: 'Cookie',
      },
    }
  );
};

function Cart() {
  const { cart } = useLoaderData<CartQuery>();

  console.log(cart);

  return <div>Cart</div>;
}

export default Cart;
