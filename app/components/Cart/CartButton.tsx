import React, { useState } from 'react';
import { useLoaderData } from 'remix';
import { LayoutQueries } from '~/routes/__layout';
import CartFlyout from './CartFlyout';

function CartButton() {
  const [open, setOpen] = useState(false);
  const { cart } = useLoaderData<LayoutQueries>();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className='relative'
        aria-label='Open cart'
      >
        <svg fill='none' viewBox='0 0 24 24' className='w-6 h-6'>
          <path
            d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18m-5 4a4 4 0 11-8 0'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
          ></path>
        </svg>
        {cart?.totalQuantity ? (
          <span className='absolute text-xs right-0 top-0 translate-x-2 -translate-y-2 bg-blue-400 text-blue-50 rounded-xl w-4 h-4'>
            {cart.totalQuantity}
          </span>
        ) : null}
      </button>
      <CartFlyout cart={cart} open={open} onClose={() => setOpen(!open)} />
    </>
  );
}

export default CartButton;
