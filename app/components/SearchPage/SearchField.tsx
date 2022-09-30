import React, { useEffect, useState } from 'react';
import { Form, PrefetchPageLinks, useSearchParams } from '@remix-run/react';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlTerm]);

  return (
    <>
      <Form
        method="get"
        className={`mx-auto max-w-md px-4 sm:px-8`}
        action="/search"
      >
        <input
          name="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          type="search"
          className={`w-full flex-1 rounded-lg bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm hover:ring focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:hover:ring-2 ${
            className ? className : ''
          }`}
          placeholder="Search..."
          autoFocus
          autoComplete="off"
          {...inputProps}
        />
      </Form>
      {term && <PrefetchPageLinks page={`/search?term=${term}`} />}
    </>
  );
};

export default SearchField;
