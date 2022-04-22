import React from 'react';
import { RouteCategory } from '~/utils/types';
import ProductCard from './ProductCard';

type Props = {
  category: RouteCategory;
};

function CategoryPage({ category }: Props) {
  return (
    <div className=''>
      <div className='container grid gap-4 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] w-full mx-auto'>
        {category.products?.result.map((product) => {
          if (!product) return null;
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default CategoryPage;
