import React from 'react';
import { useSearchParams } from '@remix-run/react';
import type { SearchQuery } from '~/graphql/types';
import ProductGrid from '../CategoryPage/ProductGrid';
import Pagination from '../Pagination';
import SearchField from './SearchField';

type Props = {
  search: NonNullable<SearchQuery['search']>;
};

function SearchPage({ search }: Props) {
  const searchParams = useSearchParams();
  const term = searchParams[0].get('term');
  const products = search.products;

  if (!products?.result || !products.totalResults) return null;

  return (
    <div className="container mx-auto py-8">
      <SearchField />
      <span className="px-4 text-sm sm:px-8">
        {products?.totalResults} results for "{term}"
      </span>
      <ProductGrid products={products?.result} />
      <Pagination totalResults={products?.totalResults} />
    </div>
  );
}

export default SearchPage;
