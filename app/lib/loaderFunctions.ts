import { LoaderFunction, redirect } from 'remix';
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
    const first = page * props.variables.pageSize;
    const offset = (page - 1) * props.variables.pageSize;

    const response = await sendJetshopRequest({
      args: args,
      query: props.query,
      variables: {
        path: url.pathname,
        first: first,
        offset: offset,
      },
    });
    const result = await response.json();

    // If the path is not found, redirect to the 404 page.
    if (!result.data.route) {
      throw new Response('Not Found', {
        status: 404,
      });
    }

    // If the path is a redirect, redirect to the target.
    if ((result?.data?.route?.path ?? pathname) !== pathname) {
      redirect(result.data.route.path);
    }

    return result.data;
  };
