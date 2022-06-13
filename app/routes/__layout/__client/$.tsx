import type { LoaderFunction, MetaFunction } from 'remix';
import { redirect, useLoaderData } from 'remix';
import CategoryPage from '~/components/CategoryPage';
import ContentPage from '~/components/ContentPage';
import ProductPage from '~/components/ProductPage';
import type { RouteQuery } from '~/graphql/types';
import { RouteDocument } from '~/graphql/types';
import DynamicRoute from '~/lib/components/DynamicRoute';
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

  return route;
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
    title: data?.route?.object?.head?.title || 'Demostore on Remix',
    ...tags,
  };
};

export default function PageContent() {
  const route = useLoaderData<RouteQuery['route']>();
  if (!route?.object) return null;

  return (
    <>
      <DynamicRoute
        route={route}
        categoryPage={CategoryPage}
        productPage={ProductPage}
        contentPage={ContentPage}
      />
    </>
  );
}
