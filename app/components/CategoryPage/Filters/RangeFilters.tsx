import { Popover, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import ReactSlider from 'react-slider';
import { Link } from 'remix';
import type { Filters, UseFiltersReturnType } from '~/lib/utils/useFilters';

export type RangeFiltersType =
  | Extract<
      NonNullable<Filters>[number],
      { __typename: 'NumericRangeFilter' }
    >[]
  | null
  | undefined;

type RangeFilterProps = {
  filter: NonNullable<RangeFiltersType>[number];
  getActiveFilterValue: UseFiltersReturnType['getActiveFilterValue'];
  toggleFilterPath: UseFiltersReturnType['toggleFilterPath'];
};

export const VALUES_SEPERATOR = '_';

function RangeFilter({
  filter,
  getActiveFilterValue,
  toggleFilterPath,
}: RangeFilterProps) {
  const [urlMin, urlMax] = getActiveFilterValue(filter.__typename, filter.id)
    ?.split(VALUES_SEPERATOR)
    .map((v) => parseInt(v)) || [undefined, undefined];
  const [values, setValues] = useState<[number, number]>([
    urlMin || filter.min,
    urlMax || filter.max,
  ]);

  return (
    <Popover key={filter.id}>
      {({ open }) => (
        <div className='relative md:w-52'>
          <Popover.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm'>
            <span className='block truncate'>{filter.name}</span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <SelectorIcon
                className='w-5 h-5 text-gray-400'
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
            <Popover.Panel className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg focus:outline-none max-h-60 ring-1 ring-black ring-opacity-5 sm:text-sm'>
              <div className='flex flex-col gap-4 p-4'>
                <ReactSlider
                  className='h-4 mt-6'
                  value={values}
                  onChange={(v) => setValues(v)}
                  ariaLabel={['Lower thumb', 'Upper thumb']}
                  ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                  renderThumb={(props, state) => (
                    <div {...props}>
                      <span className='inline-block w-4 h-4 bg-blue-400 rounded-full hover:bg-blue-500' />
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
                          state.index === 1 ? 'bg-gray-700' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                  )}
                  min={filter.min}
                  max={filter.max}
                />
                <Link
                  to={toggleFilterPath(filter.__typename, {
                    id: filter.id,
                    value: `${values[0]}${VALUES_SEPERATOR}${values[1]}`,
                  })}
                  className='block w-full py-2 text-center bg-blue-400 rounded hover:bg-blue-500 text-blue-50 focus:bg-blue-500'
                  prefetch='intent'
                >
                  {urlMin !== values[0] || urlMax !== values[1]
                    ? 'Apply'
                    : 'Reset'}
                </Link>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}

type RangeFiltersProps = {
  rangeFilters: RangeFiltersType;
  getActiveFilterValue: UseFiltersReturnType['getActiveFilterValue'];
  toggleFilterPath: UseFiltersReturnType['toggleFilterPath'];
};

function RangeFilters({
  rangeFilters,
  getActiveFilterValue,
  toggleFilterPath,
}: RangeFiltersProps) {
  return (
    <>
      {rangeFilters?.map((filter) => {
        return (
          <RangeFilter
            key={filter.id}
            filter={filter}
            getActiveFilterValue={getActiveFilterValue}
            toggleFilterPath={toggleFilterPath}
          />
        );
      })}
    </>
  );
}

export default RangeFilters;
