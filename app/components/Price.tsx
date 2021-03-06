import React from 'react';
import type { RouteCategory } from '~/utils/types';

interface PriceProps {
  price?: NonNullable<
    NonNullable<RouteCategory['products']>['result'][number]
  >['price'];
  quantity?: number;
}

const Price = ({ price, quantity = 1 }: PriceProps) => {
  if (!price) return null;
  const culture = 'sv-SE';
  const currency = 'SEK';

  return (
    <>
      {Intl.NumberFormat(culture, {
        style: 'currency',
        currency: currency,
        // maximumFractionDigits: 1,
      }).format(price?.incVat * quantity)}
    </>
  );
};

export default Price;
