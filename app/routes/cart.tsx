import type { ActionFunction } from 'remix';
import { json } from 'remix';
import { badRequest, notFound } from 'remix-utils';
import { cartIdCookie } from '~/cookies';
import type { AddToCartMutation, ProductVariantsQuery } from '~/graphql/types';
import { AddToCartDocument, ProductVariantsDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';
import { ProductType } from '~/lib/utils/product';

export const action: ActionFunction = async (args) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const cartId = await cartIdCookie.parse(cookieHeader);
  const body = await args.request.formData();

  switch (body.get('_productType')) {
    case ProductType.Variant:
      const variantResult = await sendJetshopRequest({
        args,
        query: ProductVariantsDocument,
        variables: {
          articleNumber: body.get('_articleNumber'),
        },
      });
      const data: ProductVariantsQuery = await variantResult
        .json()
        .then((json) => json?.data);

      const selectedOptions = data.product?.variants?.options.map((option) => {
        const selectedOption = option?.name ? body.get(option.name) : undefined;
        if (typeof selectedOption !== 'string') {
          throw badRequest({ message: 'Invalid selected option' });
        }
        return selectedOption;
      });

      const selectedVariant = data.product?.variants?.values?.find(
        (variant) => {
          return selectedOptions?.every((value) => {
            return variant?.values.includes(value);
          });
        }
      );

      if (!selectedVariant) {
        throw notFound({ message: 'Variant not found matching options' });
      }

      const variantCartResult = await sendJetshopRequest({
        args,
        query: AddToCartDocument,
        variables: {
          input: {
            cartId: cartId,
            articleNumber: selectedVariant.articleNumber,
          },
        },
      });

      const variantCart: AddToCartMutation = await variantCartResult
        .json()
        .then((json) => json?.data);
      const variantNewCartId = variantCart.addToCart?.cart?.id;

      if (!variantNewCartId) {
        throw badRequest({ message: 'Invalid cart id returned' });
      }

      return json(variantCart.addToCart?.cart, {
        headers: {
          'Set-Cookie': await cartIdCookie.serialize(variantNewCartId),
        },
      });
    case ProductType.Basic:
      const basicCartResult = await sendJetshopRequest({
        args,
        query: AddToCartDocument,
        variables: {
          input: {
            cartId: cartId,
            articleNumber: body.get('_articleNumber'),
          },
        },
      });

      const basicCart: AddToCartMutation = await basicCartResult
        .json()
        .then((json) => json?.data);
      const basicNewCartId = basicCart.addToCart?.cart?.id;

      if (!basicNewCartId) {
        throw badRequest({ message: 'Invalid cart id returned' });
      }

      return json(basicCart.addToCart?.cart, {
        headers: {
          'Set-Cookie': await cartIdCookie.serialize(basicNewCartId),
        },
      });
    default:
      throw new Error('Not implemented');
  }
};
