import React from 'react';
import { Form, useSearchParams } from 'remix';
import { SearchQuery } from '~/graphql/types';
import ProductGrid from '../CategoryPage/ProductGrid';
import Pagination from '../Pagination';

type Props = {
  search: NonNullable<SearchQuery['search']>;
};

function SearchPage({ search }: Props) {
  const searchParams = useSearchParams();
  const term = searchParams[0].get('term');
  const products = search.products;

  if (!products?.result || !products.totalResults) return null;

  return (
    <div className='container mx-auto py-8'>
      <Form method='get' className='px-4 sm:px-8 max-w-md mx-auto'>
        <input
          name='term'
          defaultValue={term || ''}
          type='text'
          id='search-input'
          className='rounded-lg border-transparent flex-1 appearance-none border border-gray-300  w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2'
          placeholder='Search...'
          autoFocus
        />
      </Form>
      <span className='text-sm px-4 sm:px-8'>
        {products?.totalResults} results for "{term}"
      </span>
      <ProductGrid products={products?.result} />
      <Pagination totalResults={products?.totalResults} />
    </div>
  );
}

export default SearchPage;
