import { Outlet } from '@remix-run/react';
import { json, LoaderFunction } from 'remix';
import { v4 as uuid } from 'uuid';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { cartIdCookie } from '~/cookies';
import {
  CartDocument,
  CartQuery,
  NavTreeDocument,
  NavTreeQuery,
  PagesDocument,
  PagesQuery,
} from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export type LayoutQueries = {
  navTree: NavTreeQuery['categories'];
  pages: PagesQuery['pages'];
  cart: CartQuery['cart'];
};

export const PAGE_SIZE = 24;

export const loader: LoaderFunction = async (args) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const cartId = (await cartIdCookie.parse(cookieHeader)) || uuid();

  const [navTreeResult, pagesResult, cartResult] = await Promise.all([
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
    sendJetshopRequest({
      args: args,
      query: CartDocument,
      variables: {
        cartId: cartId,
      },
    }),
  ]);

  const [navTree, pages, cart] = await Promise.all([
    navTreeResult.json(),
    pagesResult.json(),
    cartResult.json(),
  ]);

  return json(
    {
      navTree: navTree.data.categories,
      pages: pages.data.pages,
      cart: cart.data.cart,
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
  return (
    <>
      <Header />
      <main className='flex flex-1 flex-col'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
