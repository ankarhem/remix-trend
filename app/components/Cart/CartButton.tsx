import React from 'react';

type Props = {
  cartOpen: boolean;
  setCartOpen: (cartOpen: boolean) => void;
};

function CartButton({ cartOpen, setCartOpen }: Props) {
  return (
    <button onClick={() => setCartOpen(!cartOpen)}>
      <svg fill='none' viewBox='0 0 24 24' className='w-6 h-6'>
        <path
          d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18m-5 4a4 4 0 11-8 0'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        ></path>
      </svg>
    </button>
  );
}

export default CartButton;
