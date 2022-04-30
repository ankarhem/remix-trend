import { Popover, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import React, { Fragment, useMemo } from 'react';
import ReactSlider from 'react-slider';
import { Form, Link } from 'remix';
import Cross from '~/components/Icons/Cross';
import { Filters as FiltersType, useFilters } from '~/lib/utils/useFilters';
import ListFilters, { ListFiltersType } from './ListFilters';

export type RangeFiltersType =
  | Extract<
      NonNullable<FiltersType>[number],
      { __typename: 'NumericRangeFilter' }
    >[]
  | null
  | undefined;

type Props = {
  filters: FiltersType;
};

function Filters({ filters }: Props) {
  const listFilters = useMemo(() => {
    return filters?.filter((filter) => filter?.__typename === 'ListFilter');
  }, [filters]) as ListFiltersType;
  const rangeFilters = useMemo(() => {
    return filters?.filter(
      (filter) => filter?.__typename === 'NumericRangeFilter'
    );
  }, [filters]) as RangeFiltersType;

  const {
    activeFilters,
    toggleFilterPath,
    clearFiltersPath,
    getActiveFilterValues,
  } = useFilters(filters);

  if (!filters) return null;

  return (
    <>
      <Form className='px-4 sm:px-8 flex gap-4'>
        <ListFilters
          listFilters={listFilters}
          getActiveFilterValues={getActiveFilterValues}
          toggleFilterPath={toggleFilterPath}
        />
        {rangeFilters?.map((filter) => {
          const values = getActiveFilterValues(filter.__typename, filter.id);
          const min = values?.[0] ? parseInt(values[0]) : undefined;
          const max = values?.[1] ? parseInt(values[1]) : undefined;

          return (
            <Popover key={filter.id}>
              {({ open }) => (
                <div className='relative w-52'>
                  <Popover.Button className='focus:outline-none relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left shadow-md focus:ring-2 focus:ring-blue-400 sm:text-sm'>
                    <span className='block truncate'>{filter.name}</span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                      <SelectorIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </Popover.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Popover.Panel className='z-10 focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm'>
                      <div className='flex flex-col gap-4 p-4'>
                        <ReactSlider
                          className='h-4 mt-6'
                          defaultValue={[filter.min, filter.max]}
                          ariaLabel={['Lower thumb', 'Upper thumb']}
                          ariaValuetext={(state) =>
                            `Thumb value ${state.valueNow}`
                          }
                          renderThumb={(props, state) => (
                            <div {...props}>
                              <span className='inline-block w-4 h-4 bg-blue-400 rounded-full' />
                              <span
                                className={`absolute -top-6 left-1/2 -translate-x-1/2`}
                              >
                                {state.valueNow}
                              </span>
                            </div>
                          )}
                          renderTrack={(props, state) => (
                            <div
                              {...props}
                              className={`${props.className} h-4 flex items-center`}
                            >
                              <span
                                className={`h-0.5 w-full rounded ${
                                  state.index === 1
                                    ? 'bg-gray-700'
                                    : 'bg-gray-200'
                                }`}
                              />
                            </div>
                          )}
                          min={filter.min}
                          max={filter.max}
                        />
                        <button className='w-full bg-blue-400 hover:bg-blue-500 text-blue-50 focus:bg-blue-500 rounded py-2'>
                          Apply
                        </button>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </div>
              )}
            </Popover>
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
