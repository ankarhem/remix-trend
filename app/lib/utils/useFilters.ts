import { useCallback, useMemo } from 'react';
import { useLocation, useTransition } from 'remix';
import { RouteCategory } from '~/utils/types';

export type Filters = NonNullable<RouteCategory['products']>['filters'];

type ActiveFilter = {
  id: string;
  name: string;
  value: string;
  text: string;
};

type Filter = Pick<ActiveFilter, 'id' | 'value'>;

interface UseFiltersReturnType {
  activeFilters: ActiveFilter[];
  toggleFilterPath: (filter: Filter) => string;
  clearFiltersPath: () => string;
  getActiveFilterValues: (id: string) => string[];
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
      const filter = filters?.find((f) => f?.id === key);
      if (!filter) continue;

      switch (filter.__typename) {
        case 'ListFilter':
          const filterItem = filter.items.find((v) => v?.value === value);
          if (!filterItem) continue;
          activeFilters.push({
            id: key,
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
    ({ id, value }: Filter) => {
      const params = new URLSearchParams(currentLocation.search);
      const values = params.getAll(id);
      if (values.includes(value)) {
        // Cannot remove a single value
        // So we need to remove all and add the rest back
        const filteredParams = values.filter((v) => v !== value);
        params.delete(id);
        filteredParams.forEach((value) => params.append(id, value));
      } else {
        params.append(id, value);
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
    (id: string) => {
      const params = new URLSearchParams(currentLocation.search);
      return params.getAll(id);
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
