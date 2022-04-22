import { Outlet, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from 'remix';
import Header from '~/components/Header';
import { NavTreeDocument, NavTreeQuery } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

type LayoutQueries = {
  navTree: NavTreeQuery;
};

export const loader: LoaderFunction = async (args) => {
  const navTreeResult = await sendJetshopRequest({
    args: args,
    query: NavTreeDocument,
    variables: {
      levels: 1,
      includeHidden: false,
    },
  });
  const navTree = await navTreeResult.json();

  return json({
    navTree: navTree.data,
  });
};

export default function Root() {
  const data = useLoaderData<LayoutQueries>();

  return (
    <>
      <Header navTree={data.navTree} />
      <Outlet />
    </>
  );
}
