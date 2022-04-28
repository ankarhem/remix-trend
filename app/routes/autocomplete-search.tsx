import { LoaderFunction } from 'remix';
import { AutocompleteDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export const loader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url);
  const term = url.searchParams.get('term');

  console.log(term);

  const response = await sendJetshopRequest({
    args: args,
    query: AutocompleteDocument,
    variables: {
      term: term,
    },
  });
  const result = await response.json();
  console.log(result);

  return result.data;
};
