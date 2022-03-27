import { LoaderFunction, useLoaderData } from 'remix';
import { RouteQueryDocument } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export const loader: LoaderFunction = (args) => {
  const url = new URL(args.request.url);
  return sendJetshopRequest({
    args: args,
    query: RouteQueryDocument,
    variables: {
      path: url.pathname,
    },
  });
};

export default function Index() {
  const { data } = useLoaderData();

  console.log(data);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to the Startpage</h1>
      <ul>
        <li>
          <a
            target='_blank'
            href='https://remix.run/tutorials/blog'
            rel='noreferrer'
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target='_blank'
            href='https://remix.run/tutorials/jokes'
            rel='noreferrer'
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target='_blank' href='https://remix.run/docs' rel='noreferrer'>
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
