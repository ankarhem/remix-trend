import React from 'react';

type Props<P> = {
  productPage: React.FC<{ product: P }>;
  product: P;
};

function ProductRoute<P>({ productPage: Component, product }: Props<P>) {
  return <Component product={product} />;
}

export default ProductRoute;
