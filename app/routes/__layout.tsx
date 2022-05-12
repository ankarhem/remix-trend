import { Toaster } from 'react-hot-toast';
import type { LoaderFunction } from 'remix';
import { json, Outlet } from 'remix';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { cartIdCookie } from '~/cookies';
import type { CartQuery, NavTreeQuery, PagesQuery } from '~/graphql/types';
import { CartDocument, NavTreeDocument, PagesDocument } from '~/graphql/types';
import ProgressBar from '~/lib/components/ProgressBar';
import { sendJetshopRequest } from '~/lib/jetshop';

export type LayoutQueries = {
  navTree: NavTreeQuery['categories'];
  pages: PagesQuery['pages'];
  cart: CartQuery['cart'];
};

// TODO: Move this to a config file
export const PAGE_SIZE = 24;

export const loader: LoaderFunction = async (args) => {
  const cookieHeader = args.request.headers.get('Cookie');
  const cartIdInCookie = await cartIdCookie.parse(cookieHeader);

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
        cartId: cartIdInCookie || '498954d6-a89b-4360-aa1b-a8e2a543c8fc',
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

export default function PageContent() {
  return (
    <>
      <ProgressBar />
      <Header />
      <main className='flex flex-1 flex-col'>
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position='top-right'
        containerStyle={{ top: '48px' }}
        toastOptions={{ duration: 1500 }}
      />
    </>
  );
}
