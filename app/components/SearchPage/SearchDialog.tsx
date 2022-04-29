import { Combobox, Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link, useFetcher, useNavigate } from 'remix';
import { AutocompleteQuery } from '~/graphql/types';

type AutocompleteItems =
  | NonNullable<
      NonNullable<
        NonNullable<AutocompleteQuery['searchAutoComplete']>['categories']
      >['result']
    >
  | NonNullable<
      NonNullable<
        NonNullable<AutocompleteQuery['searchAutoComplete']>['products']
      >['result']
    >;

type Props = {
  open: boolean;
  onClose: () => void;
};

const AutocompleteOptions = ({
  header,
  items,
}: {
  header: string;
  items: AutocompleteItems;
}) => {
  if (items.length === 0) return null;
  return (
    <>
      <h2 className='mt-2 mb-1 mx-4 font-bold uppercase text-xs'>{header}</h2>
      {items.map((item) => {
        if (!item?.primaryRoute?.path) return null;
        return (
          <Combobox.Option
            onClick={() => null}
            key={item.id}
            className='relative text-gray-900 hover:text-blue-500 hover:bg-blue-50 cursor-default select-none'
            value={item}
          >
            <Link
              prefetch='intent'
              to={item.primaryRoute.path}
              className='block truncate py-2 pl-10 pr-4 focus-within:bg-blue-50 focus-within:text-blue-500 focus-within:outline-none'
            >
              {item.name}
            </Link>
          </Combobox.Option>
        );
      })}
    </>
  );
};

// TODO: Make this less js dependent
function SearchDialog({ open, onClose }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const autocomplete = useFetcher<AutocompleteQuery>();

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={onClose}
        className='fixed z-10 inset-0 overflow-y-auto'
      >
        <div className='flex min-h-[60vh] items-center justify-center'>
          <Transition.Child
            // as={Fragment}
            enter='transition duration-200 ease-in-out'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition duration-200 ease-in-out'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          </Transition.Child>
          <div className='relative'>
            <Transition.Child
              // as={Fragment}
              enter='transition duration-100'
              enterFrom='opacity-50 scale-95'
              enterTo='opacity-100 scale-100'
              leave='transition duration-100'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-50 scale-95'
            >
              <autocomplete.Form action='/autocomplete-search'>
                <Combobox
                  value={null}
                  onChange={(item: AutocompleteItems[number]) => {
                    console.log(item);
                    onClose();
                  }}
                >
                  <div className='relative mt-1'>
                    <div className='focus:outline-none relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
                      <input
                        name='term'
                        className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
                        onChange={(event) => {
                          setQuery(event.target.value);
                          autocomplete.submit(event.target.form);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            navigate(`/search?term=${query}`);
                            onClose();
                          }
                        }}
                        placeholder='Search...'
                        autoComplete='off'
                      />
                      <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                        <span className='text-[8px] leading-[12px] bg-gray-100 rounded p-1'>
                          ESC
                        </span>
                      </Combobox.Button>
                    </div>
                    <Transition
                      show={query.length > 0}
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                      afterLeave={() => setQuery('')}
                    >
                      <Combobox.Options className='focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm'>
                        {autocomplete.state === 'loading' ? (
                          <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                            Loading.
                          </div>
                        ) : autocomplete.data?.searchAutoComplete?.products
                            ?.result.length === 0 &&
                          autocomplete.data?.searchAutoComplete?.categories
                            ?.result?.length === 0 ? (
                          <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                            Nothing found. <br />
                            Press{' '}
                            <span className='text-[8px] leading-[12px] bg-gray-100 rounded p-1 mx-1'>
                              ENTER
                            </span>{' '}
                            to do a full search.
                          </div>
                        ) : null}
                        {autocomplete.data?.searchAutoComplete?.products
                          ?.result && (
                          <AutocompleteOptions
                            header='Products'
                            items={
                              autocomplete.data?.searchAutoComplete?.products
                                ?.result
                            }
                          />
                        )}
                        {autocomplete.data?.searchAutoComplete?.categories
                          ?.result && (
                          <AutocompleteOptions
                            header='Categories'
                            items={
                              autocomplete.data?.searchAutoComplete?.categories
                                ?.result
                            }
                          />
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </autocomplete.Form>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SearchDialog;
