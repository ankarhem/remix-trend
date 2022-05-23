import type { ActionFunction } from 'remix';
import { json } from 'remix';
import { badRequest } from 'remix-utils';
import { cartIdCookie } from '~/cookies';
import type {
  AddToCartInput,
  AddToCartMutation,
  ChangeByOneItemQuantityInput,
  DecrementItemQuantityMutation,
  IncrementItemQuantityMutation,
  RemoveFromCartInput,
  RemoveFromCartMutation,
} from '~/graphql/types';
import {
  AddToCartDocument,
  DecrementItemQuantityDocument,
  IncrementItemQuantityDocument,
  RemoveFromCartDocument,
} from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';
import { ProductType } from '~/lib/utils/product';

export enum CartAction {
  AddToCart = 'addToCart',
  RemoveFromCart = 'removeFromCart',
  IncrementItemQuanity = 'incrementItemQuantity',
  DecrementItemQuantity = 'decrementItemQuantity',
}

export type CartActionData = {
  cart?:
    | NonNullable<AddToCartMutation['addToCart']>['cart']
    | NonNullable<RemoveFromCartMutation['removeFromCart']>['cart']
    | NonNullable<
        IncrementItemQuantityMutation['incrementItemQuantity']
      >['cart']
    | NonNullable<
        DecrementItemQuantityMutation['decrementItemQuantity']
      >['cart'];
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

  const action = body.get('_action');
  const articleNumber = body.get('_articleNumber');
  const itemId = body.get('_itemId');
  switch (action) {
    case CartAction.AddToCart:
      switch (body.get('_productType')) {
        case ProductType.Variant:
        case ProductType.Basic:
          if (typeof articleNumber !== 'string') {
            throw badRequest({ message: 'Invalid item id' });
          }
          const addToCartInput: AddToCartInput = {
            cartId: cartId,
            articleNumber: articleNumber,
          };
          const cartResult = await sendJetshopRequest({
            args,
            query: AddToCartDocument,
            variables: {
              input: addToCartInput,
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

    case CartAction.RemoveFromCart:
      if (typeof itemId !== 'string') {
        throw badRequest({ message: 'Invalid item id' });
      }
      const removeFromCartInput: RemoveFromCartInput = {
        cartId: cartId,
        itemId: itemId,
      };
      const removeFromCartResult = await sendJetshopRequest({
        args,
        query: RemoveFromCartDocument,
        variables: {
          input: removeFromCartInput,
        },
      });

      const removeItemCart: RemoveFromCartMutation = await removeFromCartResult
        .json()
        .then((json) => json?.data);

      console.log(removeItemCart);

      const removeItemCartId = removeItemCart.removeFromCart?.cart?.id;

      if (!removeItemCartId) {
        return json(undefined, {
          status: 200,
          headers: {
            'Set-Cookie': await cartIdCookie.serialize(cartId, {
              expires: new Date(0),
            }),
          },
        });
      }

      return json<CartActionData>(
        { cart: removeItemCart.removeFromCart?.cart },
        {
          headers: {
            'Set-Cookie': await cartIdCookie.serialize(removeItemCartId),
          },
        }
      );

    case CartAction.IncrementItemQuanity:
      if (typeof itemId !== 'string') {
        throw badRequest({ message: 'Invalid item id' });
      }
      const incrementItemQuantityInput: ChangeByOneItemQuantityInput = {
        cartId: cartId,
        itemId: itemId,
      };
      const incrementItemQuanityResult = await sendJetshopRequest({
        args,
        query: IncrementItemQuantityDocument,
        variables: {
          input: incrementItemQuantityInput,
        },
      });

      const incrementItemQuanityCart: IncrementItemQuantityMutation =
        await incrementItemQuanityResult.json().then((json) => json?.data);

      const incrementCartId =
        incrementItemQuanityCart.incrementItemQuantity?.cart?.id;

      if (!incrementCartId) {
        throw badRequest({ message: 'Invalid cart id returned' });
      }

      return json<CartActionData>(
        { cart: incrementItemQuanityCart.incrementItemQuantity?.cart },
        {
          headers: {
            'Set-Cookie': await cartIdCookie.serialize(incrementCartId),
          },
        }
      );

    case CartAction.DecrementItemQuantity:
      if (typeof itemId !== 'string') {
        throw badRequest({ message: 'Invalid item id' });
      }
      const decrementItemQuantityInput: ChangeByOneItemQuantityInput = {
        cartId: cartId,
        itemId: itemId,
      };
      const decrementItemQuanityResult = await sendJetshopRequest({
        args,
        query: DecrementItemQuantityDocument,
        variables: {
          input: decrementItemQuantityInput,
        },
      });

      const decrementItemQuanityCart: DecrementItemQuantityMutation =
        await decrementItemQuanityResult.json().then((json) => json?.data);

      const decrementItemCartId =
        decrementItemQuanityCart.decrementItemQuantity?.cart?.id;

      if (!decrementItemCartId) {
        throw badRequest({ message: 'Invalid cart id returned' });
      }

      return json<CartActionData>(
        { cart: decrementItemQuanityCart.decrementItemQuantity?.cart },
        {
          headers: {
            'Set-Cookie': await cartIdCookie.serialize(decrementItemCartId),
          },
        }
      );

    default:
      throw badRequest('Invalid action');
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
