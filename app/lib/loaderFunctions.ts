import { json, LoaderFunction, redirect } from 'remix';
import { RouteQuery } from '~/graphql/types';
import { sendJetshopRequest } from './jetshop';
import { FuncParams } from './utils/types';

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
    const filtersState = {
      listFilters: {} as Record<string, any[]>,
      // rangeFilters: {} as Record<string, ,
      // booleanFilters: ,
      // multiListFilters: {},
    };
    const params = new URLSearchParams(url.search);
    for (const [key, value] of params) {
      const [type, id] = key.split('_');
      if (!id) continue;

      switch (type) {
        case 'ListFilter':
          if (!filtersState.listFilters.hasOwnProperty(id)) {
            filtersState.listFilters[id] = [];
          }
          filtersState.listFilters[id].push(value);
        default:
          continue;
      }
    }

    const listFilters = Object.entries(filtersState.listFilters).map(
      ([id, values]) => ({ id, values })
    );
    console.log(filtersState, listFilters);

    const filterInput: FilterInput = {
      listFilters: listFilters,
      rangeFilters: [],
      booleanFilters: [],
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

    // console.log(result.data.route.object);

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

    return json(data);
  };
