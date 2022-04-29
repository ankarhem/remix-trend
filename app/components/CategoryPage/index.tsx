import React from 'react';
import { RouteCategory } from '~/utils/types';
import Pagination from '../Pagination';
import Filters from './Filters';
import ProductGrid from './ProductGrid';

type Props = {
  category: RouteCategory;
};

function CategoryPage({ category }: Props) {
  return (
    <div className='container mx-auto my-6'>
      <Filters filters={category.products?.filters} />
      <ProductGrid products={category.products?.result ?? []} />
      <Pagination totalResults={category?.products?.totalResults ?? 0} />
    </div>
  );
}

export default CategoryPage;
