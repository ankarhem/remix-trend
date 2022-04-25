import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { RouteDocument, RouteQuery } from '~/graphql/types';
import { createRouteLoaderFunction } from '~/lib/loaderFunctions';

export const loader: LoaderFunction = createRouteLoaderFunction({
  query: RouteDocument,
  variables: {
    pageSize: 24,
  },
});

export const meta: MetaFunction = (args) => {
  const data: RouteQuery | undefined = args.data;

  const tags = data?.route?.object?.head?.metaTags?.reduce((tags, tag) => {
    if (tag && tag.name && tag.content) {
      tags[tag.name] = tag.content;
    }
    return tags;
  }, {} as Record<string, string>);

  return {
    title: 'Demostore on Remix',
    ...tags,
  };
};

export default function Index() {
  const { route } = useLoaderData<RouteQuery>();
  // just to help types, won't actually trigger
  if (route?.object?.__typename !== 'StartPage') return null;

  const startPage = route?.object;

  return (
    <div className=''>
      <div className='grid md:grid-cols-2 items-stretch'>
        <img
          className='object-cover inset-0'
          src='https://w.wallhaven.cc/full/j8/wallhaven-j83jgw.jpg'
          alt='hero'
        />
        <div className='grid sm:grid-cols-2 py-12 px-12 sm:py-16 sm:px-24 sm:col-start-1 sm:row-start-1'>
          <div className='flex flex-col'>
            <h1 className='text-4xl sm:text-6xl font-bold mb-8 sm:mb-12'>
              .amazing.
              <br />
              high quality
              <br />
              products.
            </h1>
            <a
              href='/news'
              className='rounded py-4 px-8 border-blue-400 border text-blue-400 hover:bg-blue-400 hover:text-blue-50 w-min whitespace-nowrap'
            >
              Shop new arrivals
            </a>
          </div>
        </div>
        <img
          className='object-cover'
          src='https://w.wallhaven.cc/full/4y/wallhaven-4yx56l.jpg'
          alt='hero'
        />
      </div>
    </div>
  );
}
