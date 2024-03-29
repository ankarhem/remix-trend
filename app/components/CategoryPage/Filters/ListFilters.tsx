import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { Link } from '@remix-run/react';
import type { Filters, UseFiltersReturnType } from '~/lib/utils/useFilters';

export type ListFiltersType =
  | Extract<NonNullable<Filters>[number], { __typename: 'ListFilter' }>[]
  | null
  | undefined;

type Props = {
  listFilters: ListFiltersType;
  getActiveFilterValues: UseFiltersReturnType['getActiveFilterValues'];
  toggleFilterPath: UseFiltersReturnType['toggleFilterPath'];
};

function ListFilters({
  listFilters,
  getActiveFilterValues,
  toggleFilterPath,
}: Props) {
  if (!listFilters || listFilters.length === 0) return null;

  return (
    <>
      {listFilters?.map((filter) => {
        return (
          <Listbox
            key={filter.id}
            value={getActiveFilterValues(filter.__typename, filter.id)}
            onChange={() => null}
            multiple
          >
            <div className='relative md:w-52'>
              <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm'>
                <span className='block truncate'>{filter.name}</span>
                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <SelectorIcon
                    className='w-5 h-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg focus:outline-none max-h-60 ring-1 ring-black ring-opacity-5 sm:text-sm'>
                  {filter.items.map((item) => {
                    if (!item?.id) return null;

                    return (
                      <Listbox.Option
                        key={item.id}
                        className={({ active }) =>
                          `block relative text-gray-900 cursor-default select-none hover:text-blue-500 hover-bg-blue-50 ${
                            active ? 'bg-blue-50 text-blue-500' : ''
                          }${
                            typeof item.resultCount === 'number' &&
                            item.resultCount === 0
                              ? 'opacity-50'
                              : ''
                          }`
                        }
                        value={item.value}
                      >
                        {({ selected }) => (
                          <Link
                            className='flex items-center justify-between py-2 pl-10 pr-4'
                            to={toggleFilterPath(filter.__typename, {
                              id: filter.id,
                              value: item.value,
                            })}
                            prefetch='intent'
                          >
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {item.text}
                            </span>
                            <span className='px-2'>{item.resultCount}</span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                <CheckIcon
                                  className='w-5 h-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </Link>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        );
      })}
    </>
  );
}

export default ListFilters;
