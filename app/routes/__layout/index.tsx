import { json, LoaderFunction, useLoaderData } from 'remix';
import { RouteDocument, RouteQuery } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

export const loader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url);

  const routeResult = await sendJetshopRequest({
    args: args,
    query: RouteDocument,
    variables: {
      path: url.pathname,
    },
  });

  const route = await routeResult.json();

  return json(route.data.route);
};

export default function Index() {
  const route = useLoaderData<RouteQuery['route']>();
  // just to help types, won't actually trigger
  if (route?.object?.__typename !== 'StartPage') return null;

  const startPage = route?.object;

  return (
    <div className=''>
      <div className='grid md:grid-cols-2 items-stretch'>
        <div className='grid grid-cols-2 py-16 px-24'>
          <div>
            <h1 className='text-6xl font-bold mb-12'>
              .amazing.
              <br />
              high quality
              <br />
              products.
            </h1>
            <a
              href='/news'
              className='rounded py-4 px-8 border-blue-400 border text-blue-400 hover:bg-blue-400 hover:text-blue-50'
            >
              Shop new arrivals
            </a>
          </div>
        </div>
        <img
          className='object-cover inset-0'
          src='https://w.wallhaven.cc/full/j8/wallhaven-j83jgw.jpg'
          alt='hero'
        />
        <img
          className='object-cover'
          src='https://w.wallhaven.cc/full/4y/wallhaven-4yx56l.jpg'
          alt='hero'
        />
      </div>
    </div>
  );
}
