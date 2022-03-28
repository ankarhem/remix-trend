import React from 'react';

type Props<P> = {
  categoryPage: React.FC<{ category: P }>;
  category: P;
};

function CategoryRoute<P>({ categoryPage: Component, category }: Props<P>) {
  return <Component category={category} />;
}

export default CategoryRoute;
