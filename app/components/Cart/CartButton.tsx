import React, { useState } from 'react';
import { useClientData } from '~/routes/__layout/__client';
import CartFlyout from './CartFlyout';

function CartButton() {
  const [open, setOpen] = useState(false);
  const { cart } = useClientData();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="relative"
        aria-label="Open cart"
      >
        <svg fill="none" viewBox="0 0 24 24" className="h-6 w-6">
          <path
            d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18m-5 4a4 4 0 11-8 0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          ></path>
        </svg>
        {cart?.totalQuantity ? (
          <span className="absolute right-0 top-0 h-4 w-4 translate-x-2 -translate-y-2 rounded-xl bg-blue-400 text-xs text-blue-50">
            {cart.totalQuantity}
          </span>
        ) : null}
      </button>
      <CartFlyout cart={cart} open={open} onClose={() => setOpen(!open)} />
    </>
  );
}

export default CartButton;
