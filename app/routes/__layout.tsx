import { Outlet, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from 'remix';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import {
  NavTreeDocument,
  NavTreeQuery,
  PagesDocument,
  PagesQuery,
} from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

type LayoutQueries = {
  navTree: NavTreeQuery;
  pages: PagesQuery;
};

export const PAGE_SIZE = 24;

export const loader: LoaderFunction = async (args) => {
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
      variables: {
        levels: 1,
        includeHidden: false,
      },
    }),
  ]);
  const navTree = await navTreeResult.json();
  const pages = await pagesResult.json();

  return json(
    {
      navTree: navTree.data,
      pages: pages.data,
    },
    {
      headers: {
        // 1 minute cache
        // 'Cache-Control': 'public, max-age=60',
      },
    }
  );
};

export default function Root() {
  const data = useLoaderData<LayoutQueries>();

  return (
    <>
      <Header navTree={data.navTree.categories} />
      <main className='flex flex-1 flex-col'>
        <Outlet />
      </main>
      <Footer pages={data.pages.pages} />
    </>
  );
}
