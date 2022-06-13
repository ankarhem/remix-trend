import type { LoaderFunction, MetaFunction } from 'remix';
import { json, redirect, useLoaderData } from 'remix';
import StartPage from '~/components/StartPage';
import type { RouteQuery } from '~/graphql/types';
import { RouteDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';
import { getRouteQueryVariables } from '~/lib/loaderFunctions';
import { PAGE_SIZE } from '~/routes/__layout';

export const loader: LoaderFunction = async (args) => {
  const pathname = new URL(args.request.url).pathname;
  const variables = getRouteQueryVariables({ args, pageSize: PAGE_SIZE });

  const route = await sendJetshopRequest({
    args: args,
    query: RouteDocument,
    variables: variables,
  }).then((data) => data.route);

  // If the path is not found, redirect to the 404 page.
  if (!route) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  // If the path is a redirect, redirect to the target.
  if (route.path !== pathname) {
    redirect(route.path);
  }

  const headers = new Headers();
  headers.set(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300'
  );

  return json(route, { headers });
};

export const meta: MetaFunction = (args) => {
  const data: RouteQuery | undefined = args.data;

  const tags = data?.route?.object?.head?.metaTags?.reduce((tags, tag) => {
    if (tag && tag.name && tag.content) {
      tags[tag.name] = tag.content;
    }
    return tags;
  }, {} as Record<string, string>);

  return {
    title: 'Demostore on Remix',
    ...tags,
  };
};

export default function PageContent() {
  const route = useLoaderData<RouteQuery['route']>();
  if (route?.object?.__typename !== 'StartPage') return null;
  const startPage = route?.object;

  return <StartPage startPage={startPage} />;
}
