import type { LoaderFunction } from 'remix';
import { AutocompleteDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export const loader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url);
  const term = url.searchParams.get('term');

  const result = await sendJetshopRequest({
    args: args,
    query: AutocompleteDocument,
    variables: {
      term: term || '',
    },
  });

  return result.data;
};
