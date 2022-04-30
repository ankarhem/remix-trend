import React, { useEffect, useRef, useState } from 'react';
import { useActionKey } from '~/utils/useActionKey';
import SearchDialog from './SearchDialog';

const SearchButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [icon] = useActionKey();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setOpen(!open);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, ref]);

  return (
    <>
      <button
        ref={ref}
        onClick={() => setOpen(!open)}
        className='rounded-lg border-transparent flex items-center gap-4 flex-1 appearance-none border border-gray-300  w-full py-1 pl-2 pr-4 bg-white text-gray-400 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700'
        aria-label='Toggle search field'
      >
        <svg fill='none' viewBox='0 0 24 24' className='h-6 w-6'>
          <path
            d='M9.657 16.713a7 7 0 100-14 7 7 0 000 14zm11 4l-6-6'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
          ></path>
        </svg>
        <span className='text-sm'>Quick search...</span>
        <span className='text-xs min-w-[32px]'>
          {icon ? `${icon} K` : null}
        </span>
      </button>
      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default SearchButton;
