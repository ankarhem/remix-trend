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
    <div className='rounded shadow hover:shadow-md group'>
      <div className='overflow-hidden bg-white border border-b-0 rounded-t'>
        <Link to={product.primaryRoute?.path || ''} prefetch='intent'>
          <img
            className='object-contain w-full h-56 py-4 transition group-hover:scale-110'
            src={product.images?.[0]?.url ? product.images[0]?.url : undefined}
            alt={
              product.images?.[0]?.alt ? product.images[0]?.alt : product.name
            }
          />
        </Link>
      </div>
      <div className='flex flex-col px-8 py-2 bg-transparent border rounded-b'>
        <Link to={product.primaryRoute?.path || ''} prefetch='intent'>
          <h1 className='self-start overflow-hidden text-gray-900 text-md whitespace-nowrap text-ellipsis hover:text-blue-400'>
            {product?.name}
          </h1>
        </Link>
        <span className='text-sm font-bold'>
          <Price price={product.price} />
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
