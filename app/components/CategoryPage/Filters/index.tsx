import React, { useMemo } from 'react';
import { Link } from '@remix-run/react';
import Cross from '~/components/Icons/Cross';
import type { Filters as FiltersType } from '~/lib/utils/useFilters';
import { useFilters } from '~/lib/utils/useFilters';
import type { BooleanFilterType } from './BooleanFilters';
import BooleanFilters from './BooleanFilters';
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
  const booleanFilters = useMemo(() => {
    return filters?.filter((filter) => filter?.__typename === 'BooleanFilter');
  }, [filters]) as BooleanFilterType;

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
      <div className="flex flex-col gap-8 px-4 sm:px-8 lg:flex-row">
        <div className="grid flex-1 grid-cols-2 flex-wrap gap-6 sm:grid-cols-3 md:flex">
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
        </div>
        <div className="flex min-w-[200px] flex-col items-end gap-2.5 self-end lg:self-start">
          <BooleanFilters
            booleanFilters={booleanFilters}
            getActiveFilterValue={getActiveFilterValue}
            toggleFilterPath={toggleFilterPath}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 px-4 sm:px-8">
        {activeFilters.map((activeFilter) => {
          return (
            <Link
              key={`${activeFilter.id}-${activeFilter.value}`}
              className="flex items-center rounded bg-blue-400 px-4 py-2 text-sm font-medium text-blue-50 ring-1"
              to={toggleFilterPath(activeFilter.type, activeFilter)}
            >
              <span className="mr-2 text-xs">{activeFilter.name}: </span>
              <span className="max-w-[10ch] truncate font-bold sm:max-w-[20ch]">
                {activeFilter.text}
              </span>
              <Cross className="ml-2 inline h-5 w-5" />
            </Link>
          );
        })}
        {activeFilters.length > 0 ? (
          <Link
            className="flex items-center rounded px-4 py-2 text-sm font-medium text-blue-400 ring-1 ring-blue-400"
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
