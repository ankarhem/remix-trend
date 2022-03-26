import { LoaderFunction, useLoaderData } from 'remix';
import { sendJetshopRequest } from '~/graphql/jetshop';

const ROUTE_QUERY = /* GraphQL */ `
  query Route {
    route(path: "/bikes") {
      id
      path
    }
  }
`;

export const loader: LoaderFunction = (args) =>
  sendJetshopRequest({
    args: args,
    query: ROUTE_QUERY,
  });

export default function Index() {
  const { data } = useLoaderData();

  console.log(data);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
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
