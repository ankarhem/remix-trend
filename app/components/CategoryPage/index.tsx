import React from 'react';
import { RouteCategory } from '~/utils/types';
import ProductGrid from './ProductGrid';

type Props = {
  category: RouteCategory;
};

function CategoryPage({ category }: Props) {
  return (
    <div className='container mx-auto'>
      <ProductGrid products={category.products?.result ?? []} />
    </div>
  );
}

export default CategoryPage;
