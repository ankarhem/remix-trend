import React, { useEffect, useState } from 'react';
import { Form, PrefetchPageLinks, useSearchParams } from 'remix';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const SearchField = ({ className, ...inputProps }: Props) => {
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
        className={`px-4 sm:px-8 max-w-md mx-auto`}
        action='/search'
      >
        <input
          name='term'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          type='search'
          className={`rounded-lg flex-1 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:ring-blue-400 focus:ring-1 focus:hover:ring-2 focus:border-blue-400 hover:ring ${
            className ? className : ''
          }`}
          placeholder='Search...'
          autoFocus
          autoComplete='off'
          {...inputProps}
        />
      </Form>
      {term && <PrefetchPageLinks page={`/search?term=${term}`} />}
    </>
  );
};

export default SearchField;
