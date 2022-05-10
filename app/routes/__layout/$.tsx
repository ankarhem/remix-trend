import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import type {
  CatchBoundaryComponent,
  ErrorBoundaryComponent,
} from '@remix-run/react/routeModules';
import type { LoaderFunction, MetaFunction } from 'remix';
import { useLoaderData, useParams } from 'remix';
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

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-full my-6'>
        <h1 className='text-4xl my-6'>Whoops!</h1>
        <p>
          An unexepected{' '}
          <code className='bg-gray-300 rounded-sm text-black px-1 text-base'>
            {error.name}
          </code>{' '}
          occured:
        </p>
        <p>{error.message}</p>
      </div>
      <div className='mx-auto w-full container rounded-2xl bg-white p-2 max-w-prose'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg bg-chestnut-100 px-4 py-2 text-left text-sm font-medium text-chestnut-900 hover:bg-chestnut-200 focus:outline-none focus-visible:ring focus-visible:ring-chestnut-500 focus-visible:ring-opacity-75'>
                <span>Stack trace</span>{' '}
                <ChevronDownIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-chestnut-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel>
                <pre className='text-sm my-4 mx-2 whitespace-pre-wrap'>
                  {error.stack}
                </pre>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};
