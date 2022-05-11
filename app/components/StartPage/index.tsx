import React from 'react';
import type { ContentComponents } from '~/lib/components/ContentRenderer';
import { ContentRenderer } from '~/lib/components/ContentRenderer';
import type { RouteStartPage } from '~/utils/types';
import ErrorComponent from '../ContentPage/components/ErrorComponent';
import Hero from './components/Hero';

type Props = {
  startPage: RouteStartPage;
};

const components: ContentComponents = {
  Hero: Hero,
};

function StartPage({ startPage }: Props) {
  return (
    <ContentRenderer
      items={startPage.data?.items || undefined}
      components={components}
      ErrorComponent={ErrorComponent}
    />
  );
}

export default StartPage;
