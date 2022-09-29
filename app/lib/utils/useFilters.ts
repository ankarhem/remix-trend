import { useCallback, useMemo } from 'react';
import { useLocation, useTransition } from '@remix-run/react';
import type { RouteCategory } from '~/utils/types';

export type Filters = NonNullable<RouteCategory['products']>['filters'];

type FilterType = Extract<
  NonNullable<Filters>[number],
  { __typename: string }
>['__typename'];

type ActiveFilter = {
  type: FilterType;
  id: string;
  name: string;
  value: string;
  text: string;
};

type Filter = Pick<ActiveFilter, 'id' | 'value'>;
export interface UseFiltersReturnType {
  activeFilters: ActiveFilter[];
  toggleFilterPath: (type: FilterType, filter: Filter) => string;
  clearFiltersPath: () => string;
  getActiveFilterValues: (type: FilterType, id: string) => string[];
  getActiveFilterValue: (type: FilterType, id: string) => string | null;
}

export function useFilters(filters: Filters): UseFiltersReturnType {
  const location = useLocation();
  const transition = useTransition();
  const currentLocation = transition.location || location;

  const activeFilters = useMemo(() => {
    if (!currentLocation.search) return [];
    const params = new URLSearchParams(currentLocation.search);

    const activeFilters: ActiveFilter[] = [];
    for (const [key, value] of params) {
      const id = key.split('_')[1];
      const filter = filters?.find((f) => f?.id === id);
      if (!filter) continue;

      switch (filter.__typename) {
        case 'ListFilter':
          const filterItem = filter.items.find((v) => v?.value === value);
          if (!filterItem) continue;

          activeFilters.push({
            type: filter.__typename,
            id: filter.id,
            name: filter.name,
            value: value,
            text: filterItem.text,
          });
          break;
        case 'NumericRangeFilter':
          activeFilters.push({
            type: filter.__typename,
            id: filter.id,
            name: filter.name,
            value: value,
            text: `${filter.min} - ${filter.max}`,
          });
          break;
        case 'BooleanFilter':
          activeFilters.push({
            type: filter.__typename,
            id: filter.id,
            name: filter.name,
            value: value,
            text: value === 'true' ? 'Yes' : 'No',
          });
        default:
          continue;
      }
    }

    return activeFilters;
  }, [currentLocation.search, filters]);

  const toggleFilterPath = useCallback(
    (type: string, { id, value }: Filter) => {
      const params = new URLSearchParams(currentLocation.search);
      const paramKey = `${type}_${id}`;
      switch (type) {
        case 'ListFilter':
          const urlValues = params.getAll(paramKey);
          if (urlValues.includes(value)) {
            // Cannot remove a single value
            // So we need to remove all and add the rest back
            const filteredParams = urlValues.filter((v) => v !== value);
            params.delete(paramKey);
            filteredParams.forEach((value) => params.append(paramKey, value));
          } else {
            params.append(paramKey, value);
          }
          break;
        case 'NumericRangeFilter':
          const urlValue = params.get(paramKey);
          if (urlValue === value) {
            params.delete(paramKey);
          } else {
            params.set(paramKey, value);
          }
          break;
        case 'BooleanFilter':
          const booleanValue = params.get(paramKey);
          if (booleanValue) {
            params.delete(paramKey);
          } else {
            params.set(paramKey, value);
          }
        default:
          break;
      }
      return `?${params.toString()}`;
    },
    [currentLocation.search]
  );

  const clearFiltersPath = useCallback(() => {
    const params = new URLSearchParams(currentLocation.search);
    const term = params.get('term');
    const newParams = new URLSearchParams();
    if (term) {
      newParams.append('term', term);
    }
    return `?${newParams.toString()}`;
  }, [currentLocation.search]);

  const getActiveFilterValues = useCallback(
    (type: string, id: string) => {
      const params = new URLSearchParams(currentLocation.search);
      const paramKey = `${type}_${id}`;
      return params.getAll(paramKey);
    },
    [currentLocation.search]
  );

  const getActiveFilterValue = useCallback(
    (type: string, id: string) => {
      const params = new URLSearchParams(currentLocation.search);
      const paramKey = `${type}_${id}`;
      return params.get(paramKey);
    },
    [currentLocation.search]
  );

  return {
    activeFilters,
    toggleFilterPath,
    clearFiltersPath,
    getActiveFilterValues,
    getActiveFilterValue,
  };
}
