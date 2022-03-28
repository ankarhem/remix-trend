import React from 'react';
import { RouteCategory } from '~/utils/types';

type Props = {
  category: RouteCategory;
};

function CategoryPage({ category }: Props) {
  return <div>CategoryPage: {category.name}</div>;
}

export default CategoryPage;
