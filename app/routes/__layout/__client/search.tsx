import type { DataFunctionArgs, MetaFunction } from '@remix-run/server-runtime';
import { useCatch, useLoaderData } from '@remix-run/react';
import SearchPage from '~/components/SearchPage';
import SearchField from '~/components/SearchPage/SearchField';
import type { SearchQuery } from '~/graphql/types';
import { SearchDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';
import { PAGE_SIZE } from '../../__layout';

export const loader = async (args: DataFunctionArgs) => {
  const url = new URL(args.request.url);
  const term = url.searchParams.get('term');

  if (!term || term.length === 0) {
    throw new Response('No search term provided', {
      status: 404,
    });
  }

  const page = parseInt(url.searchParams.get('page') || '1');
  const offset = Math.max((page - 1) * PAGE_SIZE, 0);
  const response = await sendJetshopRequest({
    args: args,
    query: SearchDocument,
    variables: {
      term: term,
      first: PAGE_SIZE,
      offset: offset,
    },
  });
  const { data }: { data: SearchQuery } = await response.json();

  if (!data.search?.products?.result.length) {
    throw new Response(`No results found for ${term}`, {
      status: 404,
    });
  }

  return data;
};

export const CatchBoundary = () => {
  const caught = useCatch();
  return (
    <div className='container py-8 mx-auto'>
      <SearchField />
      <p className='py-8 text-center'>No results found for "{caught.data}"</p>
    </div>
  );
};

export const meta: MetaFunction = (args) => {
  const searchParams = new URLSearchParams(args.location.search);
  const term = searchParams.get('term');
  return {
    title: term ? `${searchParams.get('term')} - Search` : 'Search',
  };
};

export default function PageContent() {
  const { search } = useLoaderData<SearchQuery>();
  if (!search) return null;

  return <SearchPage search={search} />;
}
