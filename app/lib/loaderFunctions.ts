import { json, LoaderFunction, redirect } from 'remix';
import { RouteQuery } from '~/graphql/types';
import { sendJetshopRequest } from './jetshop';
import { FuncParams } from './utils/types';

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

    const response = await sendJetshopRequest({
      args: args,
      query: props.query,
      variables: {
        path: url.pathname,
        first: props.variables.pageSize,
        offset: offset,
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

    return json(data);
  };
