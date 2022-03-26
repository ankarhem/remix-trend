import { LoaderFunction, useLoaderData } from 'remix';
import { sendGraphQLRequest } from 'remix-graphql/index.server';

const ROUTE_QUERY = /* GraphQL */ `
  query routeQuery {
    route(path: "/bikes") {
      id
      path
    }
  }
`;

export const loader: LoaderFunction = (args) =>
  sendGraphQLRequest({
    // Pass on the arguments that Remix passes to a loader function.
    args,
    // Provide the endpoint of the remote GraphQL API.
    endpoint: 'https://storeapi.jetshop.io',
    // Optionally add headers to the request.
    headers: {
      token: '359fd7c1-8e72-4270-b899-2bda9ae6ef57',
      shopid: 'demostore',
    },
    // Provide the GraphQL operation to send to the remote API.
    query: ROUTE_QUERY,
    // Optionally provide variables that should be used for executing the
    // operation. If this is not passed, `remix-graphql` will derive variables
    // from...
    // - ...the route params.
    // - ...the submitted `formData` (if it exists).
    // That means the following is the default and could also be ommited.
    variables: args.params,
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
