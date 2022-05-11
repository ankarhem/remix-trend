import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import StartPage from '~/components/StartPage';
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

export default function PageContent() {
  const { route } = useLoaderData<RouteQuery>();
  // just to help types, won't actually trigger
  if (route?.object?.__typename !== 'StartPage') return null;

  const startPage = route?.object;

  return <StartPage startPage={startPage} />;
}
