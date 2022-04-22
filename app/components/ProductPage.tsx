import React from 'react';
import { RouteProduct } from '~/utils/types';
import ProductGrid from './CategoryPage/ProductGrid';
import Price from './Price';

type Props = {
  product: RouteProduct;
};

function ProductPage({ product }: Props) {
  if (!product) return null;

  return (
    <div className='container flex flex-col mx-auto mt-12 mb-8 gap-12'>
      <div className='flex gap-12'>
        <div className='basis-full bg-white flex items-center justify-center'>
          <img
            className='object-contain max-h-[600px] min-h-[500px]'
            src={product.images?.[0]?.url}
            alt={product.images?.[0]?.alt ?? product.name}
          />
        </div>
        <div className='basis-[90%]'>
          <div className='mb-6'>
            <h1 className='text-gray-900 font-bold text-3xl uppercase'>
              {product.name}
            </h1>
            <h2 className='font-bold text-sm'>{product.subName}</h2>
            <span className='text-sm'>{product.articleNumber}</span>
          </div>

          <div
            className='text-gray-500 text-sm mb-6'
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />

          <div className='text-xl font-bold uppercase mb-6'>
            <Price price={product.price} />
          </div>

          <form>
            <button className='text-blue-50 bg-blue-400 hover:bg-blue-500 w-96 py-3 rounded'>
              Add to cart
            </button>
          </form>
        </div>
      </div>

      {product.relatedProducts && product.relatedProducts?.length > 0 ? (
        <div>
          <h2 className='text-gray-900 font-bold text-3xl uppercase mb-6'>
            Related products
          </h2>

          <ProductGrid
            products={product.relatedProducts}
            className='justify-start !grid-cols-[repeat(auto-fit,_minmax(300px,350px))]'
          />
        </div>
      ) : null}
    </div>
  );
}

export default ProductPage;
