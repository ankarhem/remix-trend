import React, { useEffect, useState } from 'react';
import { Form, PrefetchPageLinks, useSearchParams } from 'remix';

export const SearchField = () => {
  const [searchParams] = useSearchParams();
  const [term, setTerm] = useState<string>(searchParams.get('term') || '');

  const urlTerm = searchParams.get('term');

  useEffect(() => {
    if (urlTerm && urlTerm !== term) {
      setTerm(urlTerm);
    }
  }, [urlTerm]);

  return (
    <>
      <Form
        method='get'
        className='px-4 sm:px-8 max-w-md mx-auto'
        action='/search'
      >
        <input
          name='term'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          type='text'
          id='search-input'
          className='rounded-lg border-transparent flex-1 appearance-none border border-gray-300  w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2'
          placeholder='Search...'
          autoFocus
          autoComplete='off'
        />
      </Form>
      {term && <PrefetchPageLinks page={`/search?term=${term}`} />}
    </>
  );
};

export default SearchField;
