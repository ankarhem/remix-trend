import { type DataFunctionArgs, json } from '@remix-run/server-runtime';
import { badRequest } from 'remix-utils';
import { commitSession, getSession } from '~/cookies';
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
export const action = async (args: DataFunctionArgs) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const session = await getSession(cookieHeader);
  const cartId = session.get('cartId');
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
            articleNumber: body.get('_articleNumber') as string,
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

      session.set('cartId', newCartId);

      return json<CartActionData>(
        { cart: cart.addToCart?.cart },
        {
          headers: {
            'Set-Cookie': await commitSession(session),
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
