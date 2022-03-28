import React from 'react';
import { RouteProduct } from '~/utils/types';

type Props = {
  product: RouteProduct;
};

function ProductPage({ product }: Props) {
  return <div>ProductPage: {product.name}</div>;
}

export default ProductPage;
