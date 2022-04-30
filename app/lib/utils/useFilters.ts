import { useCallback, useMemo } from 'react';
import { useLocation, useTransition } from 'remix';
import { RouteCategory } from '~/utils/types';

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
interface UseFiltersReturnType {
  activeFilters: ActiveFilter[];
  toggleFilterPath: (type: FilterType, filter: Filter) => string;
  clearFiltersPath: () => string;
  getActiveFilterValues: (type: FilterType, id: string) => string[];
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
        default:
          continue;
      }
    }

    return activeFilters;
  }, [currentLocation.search]);

  const toggleFilterPath = useCallback(
    (type: string, { id, value }: Filter) => {
      const params = new URLSearchParams(currentLocation.search);
      const paramKey = `${type}_${id}`;
      const values = params.getAll(paramKey);
      if (values.includes(value)) {
        // Cannot remove a single value
        // So we need to remove all and add the rest back
        const filteredParams = values.filter((v) => v !== value);
        params.delete(paramKey);
        filteredParams.forEach((value) => params.append(paramKey, value));
      } else {
        params.append(paramKey, value);
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

  return {
    activeFilters,
    toggleFilterPath,
    clearFiltersPath,
    getActiveFilterValues,
  };
}
