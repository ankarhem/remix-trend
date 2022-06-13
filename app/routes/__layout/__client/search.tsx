import type { CatchBoundaryComponent } from '@remix-run/react/routeModules';
import type { LoaderFunction, MetaFunction } from 'remix';
import { useLoaderData } from 'remix';
import SearchPage from '~/components/SearchPage';
import SearchField from '~/components/SearchPage/SearchField';
import type { SearchQuery } from '~/graphql/types';
import { SearchDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';
import { PAGE_SIZE } from '../../__layout';

export const loader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url);
  const term = url.searchParams.get('term');

  if (!term || term.length === 0) {
    throw new Response('No search term provided', {
      status: 404,
    });
  }

  const page = parseInt(url.searchParams.get('page') || '1');
  const offset = Math.max((page - 1) * PAGE_SIZE, 0);
  const search = await sendJetshopRequest({
    args: args,
    query: SearchDocument,
    variables: {
      term: term,
      first: PAGE_SIZE,
      offset: offset,
    },
  }).then((data) => data.search);

  if (!search?.products?.result.length) {
    throw new Response(`No results found for ${term}`, {
      status: 404,
    });
  }

  return search;
};

export const CatchBoundary: CatchBoundaryComponent = () => {
  return (
    <div className='container mx-auto py-8'>
      <SearchField />
      <p className='text-center py-8'>No results found for "{}"</p>
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
  const search = useLoaderData<SearchQuery['search']>();
  if (!search) return null;

  return <SearchPage search={search} />;
}
