import { CatchBoundaryComponent } from '@remix-run/react/routeModules';
import { LoaderFunction, MetaFunction, useLoaderData, useParams } from 'remix';
import CategoryPage from '~/components/CategoryPage';
import ContentPage from '~/components/ContentPage';
import ProductPage from '~/components/ProductPage';
import { RouteDocument, RouteQuery } from '~/graphql/types';
import DynamicRoute from '~/lib/components/DynamicRoute';
import { createRouteLoaderFunction } from '~/lib/loaderFunctions';

export const loader: LoaderFunction = createRouteLoaderFunction({
  query: RouteDocument,
  variables: {
    pageSize: 24,
  },
});

export const CatchBoundary: CatchBoundaryComponent = () => {
  const params = useParams();
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1>404</h1>
      <p>Could not find page {params['*']}</p>
    </div>
  );
};

export const meta: MetaFunction = (args) => {
  const data: RouteQuery = args.data;

  const tags = data.route?.object?.head?.metaTags?.reduce((tags, tag) => {
    if (tag && tag.name && tag.content) {
      tags[tag.name] = tag.content;
    }
    return tags;
  }, {} as Record<string, string>);

  return {
    title: data.route?.object?.head?.title,
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
