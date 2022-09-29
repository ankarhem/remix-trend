import type { LoaderFunction, MetaFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import CategoryPage from '~/components/CategoryPage';
import ContentPage from '~/components/ContentPage';
import ProductPage from '~/components/ProductPage';
import type { RouteQuery } from '~/graphql/types';
import { RouteDocument } from '~/graphql/types';
import DynamicRoute from '~/lib/components/DynamicRoute';
import { createRouteLoaderFunction } from '~/lib/loaderFunctions';

export const loader: LoaderFunction = createRouteLoaderFunction({
  query: RouteDocument,
  variables: {
    pageSize: 24,
  },
});

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
  const data = useLoaderData<RouteQuery>();
  const route = data?.route;
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
