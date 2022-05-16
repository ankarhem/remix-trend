import React from 'react';
import { useActionData, useFetcher } from 'remix';
import type { RouteProduct } from '~/utils/types';
import { VariantOption } from './VariantOption';

export enum ProductType {
  Basic = 'Basic',
  Variant = 'Variant',
  Package = 'Package',
  Configuration = 'Configuration',
}

const getProductType: (product: RouteProduct) => ProductType = (product) => {
  if (product.hasVariants) return ProductType.Variant;
  if (product.isPackage) return ProductType.Package;
  if (product.hasConfigurations) return ProductType.Configuration;
  return ProductType.Basic;
};

type Props = {
  product: RouteProduct;
};

function AddToCartForm({ product }: Props) {
  const fetcher = useFetcher();
  const productType = getProductType(product);
  const data = useActionData();
  console.log(data);

  return (
    <fetcher.Form method='post' action='/cart'>
      <input
        type='hidden'
        name='_articleNumber'
        value={product.articleNumber}
      />
      <input type='hidden' name='_productType' value={productType} />
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
          type='submit'
          className='text-blue-50 bg-blue-400 hover:bg-blue-500 w-full lg:w-96 py-3 rounded focus:ring focus:ring-blue-400 active:ring-blue-500 ring-offset-2 focus:outline-none mt-4'
        >
          Add to cart
        </button>
      </fieldset>
    </fetcher.Form>
  );
}

export default AddToCartForm;
