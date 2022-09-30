import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from '@remix-run/react';
import type { CartQuery } from '~/graphql/types';
import Cross from '../Icons/Cross';
import Price from '../Price';

type Props = {
  cart: CartQuery['cart'];
  open: boolean;
  onClose: () => void;
};

function CartFlyout({ cart, open, onClose }: Props) {
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
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in-out"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
            className="fixed top-0 bottom-0 right-0 w-96"
          >
            <div className="relative flex h-full flex-col bg-white px-6 py-4">
              <div className="mb-6 grid grid-cols-3 items-center">
                <Dialog.Title className="col-start-2 text-center text-xl text-gray-900">
                  Cart
                </Dialog.Title>
                <button onClick={onClose} className="justify-self-end">
                  <Cross className="h-6 w-6" />
                </button>
              </div>

              <hr className="border-gray-100/80" />

              <>
                {cart ? (
                  <>
                    <ul className="-mx-6 mb-6 flex flex-1 flex-col overflow-auto px-6">
                      {cart?.items?.map((item) => {
                        if (!item || !item.product) return null;

                        const variant = item.variant;
                        const product = item.product;

                        return (
                          <li
                            key={item.id}
                            className="flex max-h-32 gap-3 border-b border-gray-100/80 py-4"
                          >
                            <img
                              className="h-24 w-24 object-contain transition group-hover:scale-110"
                              src={(variant || product).images?.[0]?.url}
                              alt={
                                (variant || product).images?.[0]?.alt ??
                                product.name
                              }
                            />
                            <div className="grid">
                              <div>
                                <Link
                                  className="hover:text-blue-400"
                                  to={product.primaryRoute?.path || '#'}
                                  prefetch="intent"
                                  onClick={onClose}
                                >
                                  <h2>{product.name}</h2>
                                </Link>
                                <span className="text-sm text-gray-600">
                                  {item.articleNumber}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 self-end text-sm">
                                <button className="h-5 w-5 rounded bg-gray-300">
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button className="h-5 w-5 rounded bg-gray-300">
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="ml-auto flex flex-col justify-between">
                              <button onClick={() => null} className="self-end">
                                <Cross className="h-6 w-6" />
                              </button>

                              <span className="text-sm text-gray-600">
                                <Price
                                  price={(variant || product).price}
                                  quantity={item.quantity}
                                />
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <a
                      href={cart.externalCheckoutUrl}
                      className="flex items-center justify-center rounded bg-blue-400 py-3 text-blue-50 ring-offset-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 active:ring-blue-500"
                    >
                      Go to checkout
                    </a>
                  </>
                ) : null}
              </>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CartFlyout;
