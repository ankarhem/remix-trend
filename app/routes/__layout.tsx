import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { type ErrorBoundaryComponent, json } from 'remix';
import { Outlet, useCatch } from '@remix-run/react';
import { Toaster } from 'react-hot-toast';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import type { CartQuery, NavTreeQuery, PagesQuery } from '~/graphql/types';
import { NavTreeDocument, PagesDocument } from '~/graphql/types';
import ProgressBar from '~/lib/components/ProgressBar';
import { sendJetshopRequest } from '~/lib/jetshop';
import type { DataFunctionArgs } from '@remix-run/node';

export type LayoutQueries = {
  navTree: NavTreeQuery['categories'];
  pages: PagesQuery['pages'];
  cart: CartQuery['cart'];
};

// TODO: Move this to a config file
export const PAGE_SIZE = 24;

export const loader = async (args: DataFunctionArgs) => {
  const [navTreeResult, pagesResult] = await Promise.all([
    sendJetshopRequest({
      args: args,
      query: NavTreeDocument,
      variables: {
        levels: 1,
        includeHidden: false,
      },
    }),
    sendJetshopRequest({
      args: args,
      query: PagesDocument,
    }),
  ]);

  const [navTree, pages] = await Promise.all([
    navTreeResult.json(),
    pagesResult.json(),
  ]);

  const headers = new Headers();
  headers.set(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300'
  );
  return json(
    {
      navTree: navTree.data?.categories,
      pages: pages.data?.pages,
    },
    {
      headers,
    }
  );
};

const LayoutComponent: React.FC = ({ children }) => {
  return (
    <>
      <ProgressBar />
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      <Toaster
        position="top-right"
        containerStyle={{ top: '48px' }}
        toastOptions={{ duration: 1500 }}
      />
    </>
  );
};

export default function PageContent() {
  return (
    <>
      <LayoutComponent>
        <Outlet />
      </LayoutComponent>
    </>
  );
}

export const CatchBoundary = () => {
  const caught = useCatch();
  return (
    <LayoutComponent>
      <div className="flex h-full flex-col items-center justify-center">
        <h1>{caught.status}</h1>
        <p>{caught.statusText}</p>
      </div>
    </LayoutComponent>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <LayoutComponent>
      <div className="my-6 flex h-full flex-col items-center justify-center">
        <h1 className="my-6 text-4xl">Whoops!</h1>
        <p>
          An unexepected{' '}
          <code className="rounded-sm bg-gray-300 px-1 text-base text-black">
            {error.name}
          </code>{' '}
          occured:
        </p>
        <p>{error.message}</p>
      </div>
      <div className="container mx-auto w-full max-w-prose rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-chestnut-100 px-4 py-2 text-left text-sm font-medium text-chestnut-900 hover:bg-chestnut-200 focus:outline-none focus-visible:ring focus-visible:ring-chestnut-500 focus-visible:ring-opacity-75">
                <span>Stack trace</span>{' '}
                <ChevronDownIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-chestnut-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel>
                <pre className="mx-2 my-4 whitespace-pre-wrap text-sm">
                  {error.stack}
                </pre>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </LayoutComponent>
  );
};
