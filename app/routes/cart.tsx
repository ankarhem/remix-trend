import type { ActionFunction } from 'remix';
import { json } from 'remix';
import { badRequest } from 'remix-utils';
import { cartIdCookie } from '~/cookies';
import type { AddToCartMutation } from '~/graphql/types';
import { AddToCartDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';
import { ProductType } from '~/lib/utils/product';

export type CartActionData = {
  cart?: NonNullable<AddToCartMutation['addToCart']>['cart'];
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
};
export const action: ActionFunction = async (args) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const cartId = await cartIdCookie.parse(cookieHeader);
  const body = await args.request.formData();

  // try {
  switch (body.get('_productType')) {
    case ProductType.Variant:
    case ProductType.Basic:
      const cartResult = await sendJetshopRequest({
        args,
        query: AddToCartDocument,
        variables: {
          input: {
            cartId: cartId,
            articleNumber: body.get('_articleNumber'),
          },
        },
      });

      const cart: AddToCartMutation = await cartResult
        .json()
        .then((json) => json?.data);
      const newCartId = cart.addToCart?.cart?.id;

      if (!newCartId) {
        throw badRequest({ message: 'Invalid cart id returned' });
      }

      return json<CartActionData>(
        { cart: cart.addToCart?.cart },
        {
          headers: {
            'Set-Cookie': await cartIdCookie.serialize(newCartId),
          },
        }
      );
    default:
      return {
        error: {
          name: 'InvalidProductType',
          message: 'The product type could not be determined',
        },
      };
  }
  // } catch (e) {
  //   if (e instanceof Error) {
  //     return {
  //       error: {
  //         name: e.name,
  //         message: e.message,
  //       },
  //     };
  //   }
  // }
};
