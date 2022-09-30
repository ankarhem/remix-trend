import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link, useLoaderData } from '@remix-run/react';
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
        className="fixed inset-0 z-20 overflow-y-auto"
      >
        <div className="min-h-screen">
          <Transition.Child
            enter="transition-opacity ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in-out"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
            className="fixed top-0 bottom-0 left-0 w-96"
          >
            <div className="relative flex h-full flex-col bg-white px-6 py-4">
              <div className="mb-6 grid grid-cols-3 items-center">
                <Dialog.Title className="col-start-2 text-center text-xl text-gray-900">
                  Menu
                </Dialog.Title>
                <button onClick={onClose} className="justify-self-end">
                  <Cross className="h-6 w-6" />
                </button>
              </div>

              <hr className="border-gray-100/80" />

              {/* <h1 className='mt-6 text-xl'>Categories</h1> */}
              <nav>
                <ul className="flex flex-col">
                  {navTree.map((category) => {
                    if (!category?.primaryRoute?.path) return null;
                    return (
                      <li
                        key={`${category.id}`}
                        className="border-b border-gray-100/80 px-4 py-3"
                      >
                        <Link
                          to={category?.primaryRoute?.path}
                          className="text-lg"
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
