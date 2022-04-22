import React from 'react';
import { RouteCategory } from '~/utils/types';
import Price from '../Price';

type Props = {
  product: NonNullable<RouteCategory['products']>['result'][number];
};

function ProductCard({ product }: Props) {
  if (!product) return null;

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden my-10 hover:shadow-xl'>
      <a href={product.primaryRoute?.path}>
        <div className='px-4 py-2'>
          <h1 className='text-gray-900 font-bold text-3xl uppercase text-center'>
            {product?.name}
          </h1>
          {/* <div
          className='text-gray-500 text-sm mt-1'
          dangerouslySetInnerHTML={{
            __html: product.description,
          }}
        /> */}
        </div>
        <img
          className='h-56 w-full object-contain my-4'
          src={product.images?.[0]?.url ? product.images[0]?.url : undefined}
          alt={product.images?.[0]?.alt ? product.images[0]?.alt : product.name}
        />
      </a>
      <div className='flex items-center justify-between px-4 py-2 bg-blue-400'>
        <h1 className='text-blue-50 font-bold text-xl'>
          <Price price={product.price} />
        </h1>
        <button className='px-3 py-1 bg-gray-100 text-sm text-gray-700 font-semibold rounded'>
          Add to card
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
