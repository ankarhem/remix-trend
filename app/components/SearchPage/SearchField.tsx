import React from 'react';
import { Form } from 'remix';

type Props = { term?: string | null };

export const SearchField = ({ term }: Props) => {
  return (
    <Form
      method='get'
      className='px-4 sm:px-8 max-w-md mx-auto'
      action='/search'
    >
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
  );
};

export default SearchField;
