import type { DataFunctionArgs } from '@remix-run/server-runtime';
import { VALUES_SEPERATOR } from '~/components/CategoryPage/Filters/RangeFilters';

interface FilterInput {
  listFilters: {
    id: string;
    values: string[];
  }[];
  rangeFilters: {
    id: string;
    min: number;
    max: number;
  }[];
  booleanFilters: {
    id: string;
    value: boolean;
  }[];
  multiListFilters: {
    id: string;
    values: string[];
  }[];
}

export const getRouteQueryVariables = ({
  args,
  pageSize,
}: {
  args: DataFunctionArgs;
  pageSize: number;
}) => {
  const url = new URL(args.request.url);

  const page = parseInt(url.searchParams.get('page') || '1');
  const offset = Math.max((page - 1) * pageSize, 0);

  // Filters
  const listFiltersState = {} as Record<string, any[]>;
  const rangeFilters: FilterInput['rangeFilters'] = [];
  const booleanFilters: FilterInput['booleanFilters'] = [];
  const params = new URLSearchParams(url.search);
  for (const [key, value] of params) {
    const [type, id] = key.split('_');
    if (!id) continue;

    switch (type) {
      case 'ListFilter':
        if (!listFiltersState.hasOwnProperty(id)) {
          listFiltersState[id] = [];
        }
        listFiltersState[id].push(value);
      case 'NumericRangeFilter':
        const [min, max] = value
          .split(`${VALUES_SEPERATOR}`)
          .map((v) => parseInt(v));
        rangeFilters.push({
          id: id,
          min: min,
          max: max,
        });
      case 'BooleanFilter':
        booleanFilters.push({
          id: id,
          value: value === 'true',
        });
      default:
        continue;
    }
  }
  const listFiltersInput = Object.entries(listFiltersState).map(
    ([id, values]) => ({ id, values })
  );

  const filterInput: FilterInput = {
    listFilters: listFiltersInput,
    rangeFilters: rangeFilters,
    booleanFilters: booleanFilters,
    multiListFilters: [],
  };

  const variables = {
    path: url.pathname,
    first: pageSize,
    offset: offset,
    filters: filterInput,
  };

  return variables;
};
