import React from 'react';
import { RouteCategory } from '~/utils/types';
import Pagination from '../Pagination';
import ProductGrid from './ProductGrid';

type Props = {
  category: RouteCategory;
};

function CategoryPage({ category }: Props) {
  return (
    <div className='container mx-auto'>
      <ProductGrid products={category.products?.result ?? []} />
      <Pagination totalResults={category?.products?.totalResults ?? 0} />
    </div>
  );
}

export default CategoryPage;
