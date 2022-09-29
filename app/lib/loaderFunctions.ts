import { type LoaderFunction, json, redirect } from '@remix-run/server-runtime';
import { VALUES_SEPERATOR } from '~/components/CategoryPage/Filters/RangeFilters';
import type { RouteQuery } from '~/graphql/types';
import { sendJetshopRequest } from './jetshop';
import type { FuncParams } from './utils/types';

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

export const createRouteLoaderFunction =
  (
    props: Pick<FuncParams<typeof sendJetshopRequest>, 'query'> & {
      variables: {
        pageSize: number;
      };
    }
  ): LoaderFunction =>
  async (args) => {
    const url = new URL(args.request.url);
    const pathname = url.pathname;

    const page = parseInt(url.searchParams.get('page') || '1');
    const offset = Math.max((page - 1) * props.variables.pageSize, 0);

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

    const response = await sendJetshopRequest({
      args: args,
      query: props.query,
      variables: {
        path: url.pathname,
        first: props.variables.pageSize,
        offset: offset,
        filters: filterInput,
      },
    });
    const result = await response.json();

    const data: RouteQuery = result.data;

    // If the path is not found, redirect to the 404 page.
    if (!data.route) {
      throw new Response('Not Found', {
        status: 404,
      });
    }

    // If the path is a redirect, redirect to the target.
    if ((data?.route?.path ?? pathname) !== pathname) {
      redirect(data.route.path);
    }

    const headers = new Headers();
    headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300'
    );

    return json(data, { headers });
  };
