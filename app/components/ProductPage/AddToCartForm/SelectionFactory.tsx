import React from 'react';
import { Link } from '@remix-run/react';
import { getProductType, ProductType } from '~/lib/utils/product';
import { type RouteProduct } from '~/utils/types';
import { ConfigurationOption } from './ConfigurationOption';
import { VariantOption } from './VariantOption';
import PackageSelection from './PackageSelection';

type Props = {
  product: RouteProduct;
};

function SelectionFactory({ product }: Props) {
  const productType = getProductType(product);
  switch (productType) {
    case ProductType.Variant:
      return (
        <>
          {product.variants?.options.map((option, index) => {
            if (!option) return null;
            return (
              <VariantOption
                key={option?.name}
                name={`_variantOption_${index}`}
                product={product}
                option={option}
              />
            );
          })}
        </>
      );
    case ProductType.Configuration:
      return (
        <>
          {product.configurations?.map((configuration) => {
            if (!configuration) return null;
            return (
              <ConfigurationOption
                key={configuration.name}
                product={product}
                configuration={configuration}
              />
            );
          })}
        </>
      );
    case ProductType.Package:
      return <PackageSelection product={product} />;
    default:
      return null;
  }
}

export default SelectionFactory;
