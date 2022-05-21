import React from 'react';
import { useFetcher } from 'remix';
import {
  getProductType,
  ProductType,
  useSelectedArticleNumber,
} from '~/lib/utils/product';
import type { RouteProduct } from '~/utils/types';
import { VariantOption } from './VariantOption';

type Props = {
  product: RouteProduct;
};

function AddToCartForm({ product }: Props) {
  const fetcher = useFetcher();
  const productType = getProductType(product);
  // const data = useActionData();
  const articleNumber = useSelectedArticleNumber(product);

  return (
    <fetcher.Form method='post' action='/cart'>
      <input type='hidden' name='_productType' value={productType} />
      <input
        type='hidden'
        name='_articleNumber'
        value={articleNumber || product.articleNumber}
      />
      <fieldset>
        {productType === ProductType.Variant ? (
          <>
            {product.variants?.options.map((option) => {
              if (!option) return null;
              return <VariantOption key={option?.name} option={option} />;
            })}
          </>
        ) : null}
        <button
          disabled={!articleNumber}
          type='submit'
          className='text-blue-50 bg-blue-400 hover:bg-blue-500 w-full lg:w-96 py-3 rounded focus:ring focus:ring-blue-400 active:ring-blue-500 ring-offset-2 focus:outline-none mt-4 disabled:opacity-80 disabled:cursor-not-allowed'
        >
          Add to cart
        </button>
      </fieldset>
    </fetcher.Form>
  );
}

export default AddToCartForm;
