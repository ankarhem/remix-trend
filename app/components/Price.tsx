import React from 'react';
import { RouteCategory } from '~/utils/types';

interface PriceProps {
  price?: NonNullable<
    NonNullable<RouteCategory['products']>['result'][number]
  >['price'];
}

const Price = ({ price }: PriceProps) => {
  if (!price) return null;
  const culture = 'sv-SE';
  const currency = 'SEK';

  return (
    <>
      {Intl.NumberFormat(culture, {
        style: 'currency',
        currency: currency,
        // maximumFractionDigits: 1,
      }).format(price?.incVat)}
    </>
  );
};

export default Price;
