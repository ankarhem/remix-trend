import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { LoaderFunction, redirect } from 'remix';
import { sendJetshopRequest } from './jetshop';

export const createRouteLoaderFunction =
  (RouteDocument: TypedDocumentNode<any, any> | string): LoaderFunction =>
  async (args) => {
    const url = new URL(args.request.url);
    const pathname = url.pathname;
    const response = await sendJetshopRequest({
      args: args,
      query: RouteDocument,
      variables: {
        path: url.pathname,
        paths: url.pathname,
      },
    });
    const result = await response.json();

    // If the path is not found, redirect to the 404 page.
    if (!result.data.route) {
      throw new Response('Not Found', {
        status: 404,
      });
    }

    // If the path is a redirect, redirect to the target.
    if ((result?.data?.route?.path ?? pathname) !== pathname) {
      redirect(result.data.route.path);
    }

    return result.data;
  };
