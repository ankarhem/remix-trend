import { json, LoaderFunction, useLoaderData } from 'remix';
import { RouteDocument, RouteQuery } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export const loader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url);

  const routeResult = await sendJetshopRequest({
    args: args,
    query: RouteDocument,
    variables: {
      path: url.pathname,
    },
  });

  const route = await routeResult.json();

  return json({
    route: route.data.route,
  });
};

export default function Index() {
  const route = useLoaderData<RouteQuery['route']>();
  // just to help types, won't actually trigger
  if (!(route?.object?.__typename === 'StartPage')) return null;

  const startPage = route?.object;

  return null;
}
