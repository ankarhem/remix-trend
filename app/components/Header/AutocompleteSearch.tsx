import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link, useFetcher, useNavigate } from 'remix';
import { AutocompleteQuery } from '~/graphql/types';

type Item =
  | NonNullable<
      NonNullable<
        NonNullable<AutocompleteQuery['searchAutoComplete']>['categories']
      >['result']
    >[number]
  | NonNullable<
      NonNullable<
        NonNullable<AutocompleteQuery['searchAutoComplete']>['products']
      >['result']
    >[number];

function AutocompleteSearch() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const autocomplete = useFetcher<AutocompleteQuery>();

  return (
    <autocomplete.Form
      method='get'
      action='/autocomplete-search'
      className='mx-4'
    >
      <Combobox
        value={null}
        onChange={(item: Item) => {
          console.log(item);
          return null;
        }}
      >
        <div className='relative group'>
          <Combobox.Input
            placeholder='Search...'
            name='term'
            className='peer rounded-lg border-transparent flex-1 appearance-none border border-gray-300  w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2'
            onChange={(event) => {
              if (!focused) {
                setFocused(true);
              }
              autocomplete.submit(event.target.form);
            }}
            onClick={() => setFocused(true)}
            autoComplete='off'
          />
          <Transition
            as={Fragment}
            show={focused && !!autocomplete.data}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Combobox.Options className='hidden group-focus-within:block peer-placeholder-shown:hidden shadow-xl absolute top-full mt-2 max-h-60 overflow-auto bg-white text-base w-full rounded'>
              <h2 className='text-xs uppercase font-bold mx-4 mt-2'>
                Products
              </h2>
              {autocomplete.data?.searchAutoComplete?.products?.result &&
              autocomplete.data.searchAutoComplete.products.result.length >
                0 ? (
                autocomplete.data?.searchAutoComplete?.products?.result?.map(
                  (product) => {
                    if (!product?.primaryRoute?.path) return null;
                    return (
                      <Combobox.Option
                        key={product.id}
                        value={product}
                        className={({ active }) =>
                          `relative text-gray-900 select-none hover:bg-blue-50 hover:text-blue-500 ${
                            active ? 'bg-blue-50 text-blue-500' : ''
                          }`
                        }
                      >
                        <Link
                          prefetch='intent'
                          to={product.primaryRoute.path}
                          className='block py-2 pl-10 pr-4'
                        >
                          {product.name}
                        </Link>
                      </Combobox.Option>
                    );
                  }
                )
              ) : (
                <p className='text-center text-sm py-2'>No results found</p>
              )}
              <h2 className='text-xs uppercase font-bold mx-4 mt-2'>
                Categories
              </h2>
              {autocomplete.data?.searchAutoComplete?.categories?.result &&
              autocomplete.data.searchAutoComplete.categories.result.length >
                0 ? (
                autocomplete.data?.searchAutoComplete?.categories?.result?.map(
                  (category) => {
                    if (!category?.primaryRoute?.path) return null;
                    return (
                      <Combobox.Option
                        key={category.id}
                        value={category}
                        className={({ active }) =>
                          `relative text-gray-900 select-none hover:bg-blue-50 hover:text-blue-500 ${
                            active ? 'bg-blue-50 text-blue-500' : ''
                          }`
                        }
                      >
                        <Link
                          prefetch='intent'
                          to={category.primaryRoute.path}
                          className='block py-2 pl-10 pr-4'
                        >
                          {category.name}
                        </Link>
                      </Combobox.Option>
                    );
                  }
                )
              ) : (
                <p className='text-center text-sm py-2'>No results found</p>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </autocomplete.Form>
  );
}

export default AutocompleteSearch;
