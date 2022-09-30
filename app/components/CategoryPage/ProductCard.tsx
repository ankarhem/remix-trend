import React from 'react';
import { Link } from '@remix-run/react';
import type { RouteCategory } from '~/utils/types';
import Price from '../Price';

type Props = {
  product: NonNullable<RouteCategory['products']>['result'][number];
};

function ProductCard({ product }: Props) {
  if (!product) return null;

  return (
    <div className="group rounded shadow hover:shadow-md">
      <div className="overflow-hidden rounded-t border border-b-0 bg-white">
        <Link to={product.primaryRoute?.path || ''} prefetch="intent">
          <img
            className="h-56 w-full object-contain py-4 transition group-hover:scale-110"
            src={product.images?.[0]?.url ? product.images[0]?.url : undefined}
            alt={
              product.images?.[0]?.alt ? product.images[0]?.alt : product.name
            }
          />
        </Link>
      </div>
      <div className="flex flex-col rounded-b border bg-transparent px-8 py-2">
        <Link to={product.primaryRoute?.path || ''} prefetch="intent">
          <h1 className="text-md self-start overflow-hidden text-ellipsis whitespace-nowrap text-gray-900 hover:text-blue-400">
            {product?.name}
          </h1>
        </Link>
        <span className="text-sm font-bold">
          <Price price={product.price} />
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
