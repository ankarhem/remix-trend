import { MenuIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import FlyoutMenu from './FlyoutMenu';

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className='lg:hidden' onClick={() => setOpen(!open)}>
        <MenuIcon className='w-6 h-6' />
      </button>
      <FlyoutMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default MobileMenu;
