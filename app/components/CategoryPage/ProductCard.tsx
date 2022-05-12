import React from 'react';
import { Link } from 'remix';
import type { RouteCategory } from '~/utils/types';
import Price from '../Price';

type Props = {
  product: NonNullable<RouteCategory['products']>['result'][number];
};

function ProductCard({ product }: Props) {
  if (!product) return null;

  return (
    <div className='shadow hover:shadow-md group rounded'>
      <div className='bg-white rounded-t overflow-hidden border border-b-0'>
        <Link to={product.primaryRoute?.path || ''} prefetch='intent'>
          <img
            className='h-56 w-full object-contain py-4 group-hover:scale-110 transition'
            src={product.images?.[0]?.url ? product.images[0]?.url : undefined}
            alt={
              product.images?.[0]?.alt ? product.images[0]?.alt : product.name
            }
          />
        </Link>
      </div>
      <div className='flex flex-col px-8 py-2 bg-transparent border rounded-b'>
        <Link to={product.primaryRoute?.path || ''} prefetch='intent'>
          <h1 className='text-gray-900 text-md whitespace-nowrap text-ellipsis overflow-hidden hover:text-blue-400 self-start'>
            {product?.name}
          </h1>
        </Link>
        <span className='font-bold text-sm'>
          <Price price={product.price} />
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
