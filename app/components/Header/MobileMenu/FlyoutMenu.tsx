import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link, useLoaderData } from 'remix';
import Cross from '~/components/Icons/Cross';
import type { LayoutQueries } from '~/routes/__layout';

type Props = {
  open: boolean;
  onClose: () => void;
};

function FlyoutMenu({ open, onClose }: Props) {
  const { navTree } = useLoaderData<LayoutQueries>();
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={onClose}
        className='fixed z-20 inset-0 overflow-y-auto'
      >
        <div className='min-h-screen'>
          <Transition.Child
            enter='transition-opacity ease-in-out'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-in-out'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          </Transition.Child>
          <Transition.Child
            enter='transition ease-in-out'
            enterFrom='opacity-0 -translate-x-full'
            enterTo='opacity-100 translate-x-0'
            leave='transition ease-in-out'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 -translate-x-full'
            className='fixed left-0 top-0 bottom-0 w-96'
          >
            <div className='relative bg-white h-full py-4 flex flex-col px-6'>
              <div className='grid grid-cols-3 items-center mb-6'>
                <Dialog.Title className='text-xl text-center text-gray-900 col-start-2'>
                  Menu
                </Dialog.Title>
                <button onClick={onClose} className='justify-self-end'>
                  <Cross className='w-6 h-6' />
                </button>
              </div>

              <hr className='border-gray-100/80' />

              {/* <h1 className='mt-6 text-xl'>Categories</h1> */}
              <nav>
                <ul className='flex flex-col'>
                  {navTree.map((category) => {
                    if (!category?.primaryRoute?.path) return null;
                    return (
                      <li
                        key={`${category.id}`}
                        className='py-3 px-4 border-b border-gray-100/80'
                      >
                        <Link
                          to={category?.primaryRoute?.path}
                          className='text-lg'
                          onClick={onClose}
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default FlyoutMenu;
