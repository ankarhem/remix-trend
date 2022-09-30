import React from 'react';
import type { RouteCategory } from '~/utils/types';
import ProductCard from './ProductCard';

type Props = {
  products: NonNullable<RouteCategory['products']>['result'];
  className?: string;
};

// TODO: Move padding out of ProductGrid component
function ProductGrid({ products, className }: Props) {
  return (
    <div
      className={`grid w-full grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 py-8 px-4 sm:px-8 ${
        className ? className : ''
      }`}
    >
      {products.map((product) => {
        if (!product) return null;
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductGrid;
