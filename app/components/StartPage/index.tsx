import React from 'react';
import type { ContentComponents } from '~/lib/components/ContentRenderer';
import { ContentRenderer } from '~/lib/components/ContentRenderer';
import type { RouteStartPage } from '~/utils/types';
import ErrorComponent from '../ContentPage/components/ErrorComponent';
import Campaign from './components/Campaign';
import Categories from './components/Categories';
import Hero from './components/Hero';
import HTMLContent from './components/HTML';
import ProductGrid from './components/ProductGrid';

type Props = {
  startPage: RouteStartPage;
};

const components: ContentComponents = {
  Hero: Hero,
  Categories: Categories,
  categoryItem: Categories.Item,
  Campaign: Campaign,
  ProductGrid: ProductGrid,
  HTML: HTMLContent,
};

function StartPage({ startPage }: Props) {
  return (
    <div className='grid gap-8'>
      <ContentRenderer
        items={startPage.data?.items || undefined}
        components={components}
        ErrorComponent={ErrorComponent}
      />
    </div>
  );
}

export default StartPage;
