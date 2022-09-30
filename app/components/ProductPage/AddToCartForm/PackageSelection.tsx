import React from 'react';
import { Link } from '@remix-run/react';
import type { RouteProduct } from '~/utils/types';
import SelectionFactory from './SelectionFactory';
import { getProductType, ProductType } from '~/lib/utils/product';
import { VariantOption } from './VariantOption';

type PackageItemProps = {
  children?: React.ReactNode;
  item: NonNullable<NonNullable<RouteProduct>['package']>['items'][number];
};
const PackageItemWrapper = ({ children, item }: PackageItemProps) => {
  if (!item.product) return null;

  return (
    <div
      key={item?.product?.id}
      className="flex border-b border-gray-100 py-4 first:pt-0 last:border-none last:pb-0"
    >
      <Link
        to={item?.product.primaryRoute?.path || ''}
        aria-disabled={!item?.product.primaryRoute?.path}
        className="mr-4 aria-disabled:pointer-events-none"
      >
        <img
          src={item?.product?.images?.[0]?.url}
          alt={item?.product.name}
          className="inline-block h-20 w-20 object-contain"
        />
      </Link>
      <div className="text-sm">
        <Link
          to={item?.product.primaryRoute?.path || ''}
          aria-disabled={!item?.product.primaryRoute?.path || undefined}
          className="aria-disabled:pointer-events-none"
        >
          <h2 className="text-base font-bold">{item.product.name}</h2>
          <h3 className="mb-4 text-gray-500">{item.product.subName}</h3>
        </Link>
        {children}
      </div>
    </div>
  );
};

type PackageSelectionProps = { product: RouteProduct };
function PackageSelection({ product }: PackageSelectionProps) {
  return (
    <>
      <h1 className="my-4 text-lg font-bold">Included products</h1>
      <div className="rounded-md border border-gray-100 bg-white px-6 py-4">
        {product.package?.items.map((item) => {
          if (!item?.product) return null;
          const productType = getProductType(item.product);
          switch (productType) {
            case ProductType.Basic:
              return (
                <PackageItemWrapper key={item?.product?.id} item={item}>
                  <input
                    type="hidden"
                    name="_BasicProduct"
                    value={item?.product?.articleNumber}
                  />
                </PackageItemWrapper>
              );
            case ProductType.Variant:
              return (
                <PackageItemWrapper item={item} key={item?.product?.id}>
                  {item.product.variants?.options.map((option, index) => {
                    if (!option || !item.product?.articleNumber) return null;
                    return (
                      <VariantOption
                        key={option?.name}
                        name={`_packageVariantOption_${item.product.articleNumber}_${index}`}
                        product={product}
                        option={option}
                      />
                    );
                  })}
                </PackageItemWrapper>
              );
            default:
              return null;
          }
        })}
      </div>
    </>
  );
}

export default PackageSelection;
