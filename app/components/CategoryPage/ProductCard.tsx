import React from 'react';
import { Link } from 'remix';
import { RouteCategory } from '~/utils/types';
import Price from '../Price';

type Props = {
  product: NonNullable<RouteCategory['products']>['result'][number];
};

function ProductCard({ product }: Props) {
  if (!product) return null;

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden my-10 hover:shadow-xl'>
      <Link
        to={product.primaryRoute?.path || ''}
        className='group'
        prefetch='intent'
      >
        <h1 className='text-gray-900 font-bold text-2xl uppercase text-center whitespace-nowrap text-ellipsis overflow-hidden px-4 py-2 hover:text-blue-400'>
          {product?.name}
        </h1>
        <img
          className='h-56 w-full object-contain my-4 group-hover:scale-110 transition'
          src={product.images?.[0]?.url ? product.images[0]?.url : undefined}
          alt={product.images?.[0]?.alt ? product.images[0]?.alt : product.name}
        />
      </Link>
      <div className='flex items-center justify-between px-4 py-2 bg-blue-400'>
        <span className='text-blue-50 font-bold text-lg'>
          <Price price={product.price} />
        </span>
        <button className='px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 font-semibold rounded focus:outline-none focus:ring focus:ring-gray-100 ring-offset-2 ring-offset-blue-400'>
          Add to card
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
