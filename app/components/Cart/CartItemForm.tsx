import React from 'react';
import { useFetcher } from 'remix';
import type { CartQuery } from '~/graphql/types';

type Props = {
  children: React.ReactNode;
  item: NonNullable<
    NonNullable<NonNullable<CartQuery['cart']>['items']>[number]
  >;
};

function CartItemForm({ children, item }: Props) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method='post' action='/cart'>
      <input type='hidden' name='_itemId' value={item.id} />
      <input type='hidden' name='_articleNumber' value={item.id} />
      {children}
    </fetcher.Form>
  );
}

export default CartItemForm;
