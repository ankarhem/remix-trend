import type { DataFunctionArgs } from '@remix-run/node';
import { AutocompleteDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export const loader = async (args: DataFunctionArgs) => {
  const url = new URL(args.request.url);
  const term = url.searchParams.get('term');

  const response = await sendJetshopRequest({
    args: args,
    query: AutocompleteDocument,
    variables: {
      term: term ?? '',
    },
  });
  const result = await response.json();

  return result.data;
};
