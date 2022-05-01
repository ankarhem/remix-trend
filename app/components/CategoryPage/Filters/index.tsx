import React, { useMemo } from 'react';
import { Form, Link } from 'remix';
import Cross from '~/components/Icons/Cross';
import type { Filters as FiltersType } from '~/lib/utils/useFilters';
import { useFilters } from '~/lib/utils/useFilters';
import type { ListFiltersType } from './ListFilters';
import ListFilters from './ListFilters';
import type { RangeFiltersType } from './RangeFilters';
import RangeFilters from './RangeFilters';

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
    getActiveFilterValue,
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
        <RangeFilters
          rangeFilters={rangeFilters}
          getActiveFilterValue={getActiveFilterValue}
          toggleFilterPath={toggleFilterPath}
        />
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
