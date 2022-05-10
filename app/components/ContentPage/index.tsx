import React from 'react';
import { Link } from 'remix';
import type { ContentComponents } from '~/lib/components/ContentRenderer';
import { ContentRenderer } from '~/lib/components/ContentRenderer';
import type { RoutePage } from '~/utils/types';
import Hero from './components/Hero';

type Props = {
  page: RoutePage;
};

const components: ContentComponents = {
  Hero: Hero,
  HTML: (props: Record<string, unknown>) => {
    if (typeof props.html !== 'string') {
      throw new Error('HTML is required and must be a string');
    }
    return (
      <div
        className='html-content'
        dangerouslySetInnerHTML={{
          __html: props.html,
        }}
      />
    );
  },
};

function ContentPage({ page }: Props) {
  return (
    <div className='container mx-auto my-10 flex lg:max-w-5xl'>
      <aside className='max-w-[250px] flex-auto border-r border-gray-400 mr-8'>
        <ol>
          {page.subPages?.map((subPage) => {
            if (!subPage.primaryRoute?.path) return null;

            return (
              <li key={subPage.id} className='block'>
                <Link to={subPage.primaryRoute.path}>{subPage.name}</Link>
              </li>
            );
          })}
        </ol>
      </aside>
      <article className='max-w-3xl'>
        <h1 className='text-3xl font-semibold mb-6'>{page.name}</h1>
        <ContentRenderer
          items={page.data?.items}
          components={components}
          ErrorComponent={() => {
            return <div>Error</div>;
          }}
        />
      </article>
    </div>
  );
}

export default ContentPage;
