import React from 'react';
import { RouteCategory } from '~/utils/types';
import ProductCard from './ProductCard';

type Props = {
  products: NonNullable<RouteCategory['products']>['result'];
  className?: string;
};

function ProductGrid({ products, className }: Props) {
  return (
    <div
      className={`grid gap-4 grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] w-full ${className}`}
    >
      {products.map((product) => {
        if (!product) return null;
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductGrid;