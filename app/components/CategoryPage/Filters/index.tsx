import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import React, { Fragment, useMemo } from 'react';
import { Form, Link } from 'remix';
import Cross from '~/components/Icons/Cross';
import { Filters as FiltersType, useFilters } from '~/lib/utils/useFilters';

type Props = {
  filters: FiltersType;
};

type ListFilters =
  | Extract<
      NonNullable<NonNullable<Props['filters']>[number]>,
      { __typename: 'ListFilter' }
    >[]
  | null
  | undefined;

function Filters({ filters }: Props) {
  const listFilters = useMemo(() => {
    return filters?.filter((filter) => filter?.__typename === 'ListFilter');
  }, [filters]) as ListFilters;

  const {
    activeFilters,
    toggleFilterPath,
    clearFiltersPath,
    getActiveFilterValues,
  } = useFilters(filters);

  if (!filters) return null;

  return (
    <>
      <Form className='px-4 sm:px-8 flex gap-4' reloadDocument>
        {listFilters?.map((filter) => {
          return (
            <Listbox
              key={filter.id}
              value={getActiveFilterValues(filter.__typename, filter.id)}
              onChange={() => null}
              multiple
            >
              <div className='relative w-52'>
                <Listbox.Button className='focus:outline-none relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left shadow-md focus:ring-2 focus:ring-blue-400 sm:text-sm'>
                  <span className='block truncate'>{filter.name}</span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <SelectorIcon
                      className='h-5 w-5 text-gray-400'
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
                  <Listbox.Options className='z-10 focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm'>
                    {filter.items.map((item) => {
                      if (!item?.id) return null;

                      return (
                        <Listbox.Option
                          key={item.id}
                          className={({ active }) =>
                            `block relative text-gray-900 cursor-default select-none hover:text-blue-500 hover-bg-blue-50 ${
                              active ? 'bg-blue-50 text-blue-500' : ''
                            }`
                          }
                          value={item.value}
                        >
                          {({ selected }) => (
                            <Link
                              className='flex py-2 pl-10 pr-4 justify-between items-center'
                              to={toggleFilterPath(filter.__typename, {
                                id: filter.id,
                                value: item.value,
                              })}
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
                                    className='h-5 w-5'
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
      </Form>
      <div className='px-4 sm:px-8 mt-6 flex gap-4 flex-wrap'>
        {activeFilters.map((activeFilter) => {
          return (
            <Link
              key={`${activeFilter.id}-${activeFilter.value}`}
              className='px-4 py-2 text-sm font-medium text-blue-50 ring-1 bg-blue-400 rounded flex items-center'
              to={toggleFilterPath(activeFilter.type, activeFilter)}
            >
              <span className='text-xs mr-2'>{activeFilter.name}: </span>
              <span className='font-bold'>{activeFilter.text}</span>
              <Cross className='ml-2 w-5 h-5 inline' />
            </Link>
          );
        })}
        {activeFilters.length > 0 ? (
          <Link
            className='px-4 py-2 text-sm font-medium text-blue-400 ring-1 ring-blue-400 rounded flex items-center'
            to={clearFiltersPath()}
          >
            Clear all filters
          </Link>
        ) : null}
      </div>
    </>
  );
}

export default Filters;
