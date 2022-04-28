import { CatchBoundaryComponent } from '@remix-run/react/routeModules';
import {
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  useSearchParams,
} from 'remix';
import SearchPage from '~/components/SearchPage';
import { SearchDocument, SearchQuery } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';
import { PAGE_SIZE } from '../__layout';

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
  console.log(data);

  if (!data.search?.products?.result.length) {
    throw new Response(`No results found for ${term}`, {
      status: 404,
    });
  }

  return data;
};

export const CatchBoundary: CatchBoundaryComponent = () => {
  const searchParams = useSearchParams();
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <p>No results found for "{searchParams[0].get('term')}"</p>
    </div>
  );
};

export const meta: MetaFunction = (args) => {
  const searchParams = new URLSearchParams(args.location.search);
  return {
    title: `${searchParams.get('term')} - Search`,
  };
};

export default function PageContent() {
  const { search } = useLoaderData<SearchQuery>();
  if (!search) return null;

  return <SearchPage search={search} />;
}
