import type { ActionFunction } from 'remix';
import { json } from 'remix';
import type { CartQuery } from '~/graphql/types';
import { ProductType } from '~/lib/utils/product';
import { getSession } from '~/session.server';

export type CartActionData = {
  cart?: CartQuery['cart'];
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
};

export const action: ActionFunction = async (args) => {
  const session = await getSession(args);
  const body = await args.request.formData();
  const serializedCart = body.get('_cart') as CartQuery['cart'] | null;

  let cart: CartQuery['cart'] = serializedCart || (await session.getCart());

  switch (body.get('_productType')) {
    case ProductType.Variant:
    case ProductType.Basic:
      const item = {
        articleNumber: body.get('_articleNumber') as string,
      };
      cart = await session.addToCart(item);
      break;
    default:
      return {
        error: {
          name: 'InvalidProductType',
          message: 'The product type could not be determined',
        },
      };
  }

  return json<CartActionData>(
    { cart: cart },
    {
      headers: {
        'Set-Cookie': await session.commitSession(),
      },
    }
  );
};
