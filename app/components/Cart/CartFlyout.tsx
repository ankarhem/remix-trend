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
        className='fixed inset-0 z-20 overflow-y-auto'
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
            enterFrom='opacity-0 translate-x-full'
            enterTo='opacity-100 translate-x-0'
            leave='transition ease-in-out'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 translate-x-full'
            className='fixed top-0 bottom-0 right-0 w-96'
          >
            <div className='relative flex flex-col h-full px-6 py-4 bg-white'>
              <div className='grid items-center grid-cols-3 mb-6'>
                <Dialog.Title className='col-start-2 text-xl text-center text-gray-900'>
                  Cart
                </Dialog.Title>
                <button onClick={onClose} className='justify-self-end'>
                  <Cross className='w-6 h-6' />
                </button>
              </div>

              <hr className='border-gray-100/80' />

              <>
                {cart ? (
                  <>
                    <ul className='flex flex-col flex-1 px-6 mb-6 -mx-6 overflow-auto'>
                      {cart?.items?.map((item) => {
                        if (!item || !item.product) return null;

                        const variant = item.variant;
                        const product = item.product;

                        return (
                          <li
                            key={item.id}
                            className='flex gap-3 py-4 border-b border-gray-100/80 max-h-32'
                          >
                            <img
                              className='object-contain w-24 h-24 transition group-hover:scale-110'
                              src={(variant || product).images?.[0]?.url}
                              alt={
                                (variant || product).images?.[0]?.alt ??
                                product.name
                              }
                            />
                            <div className='grid'>
                              <div>
                                <Link
                                  className='hover:text-blue-400'
                                  to={product.primaryRoute?.path || '#'}
                                  prefetch='intent'
                                  onClick={onClose}
                                >
                                  <h2>{product.name}</h2>
                                </Link>
                                <span className='text-sm text-gray-600'>
                                  {item.articleNumber}
                                </span>
                              </div>

                              <div className='flex items-center self-end gap-2 text-sm'>
                                <button className='w-5 h-5 bg-gray-300 rounded'>
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button className='w-5 h-5 bg-gray-300 rounded'>
                                  +
                                </button>
                              </div>
                            </div>
                            <div className='flex flex-col justify-between ml-auto'>
                              <button onClick={() => null} className='self-end'>
                                <Cross className='w-6 h-6' />
                              </button>

                              <span className='text-sm text-gray-600'>
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
                      className='flex items-center justify-center py-3 bg-blue-400 rounded text-blue-50 hover:bg-blue-500 focus:ring focus:ring-blue-400 active:ring-blue-500 ring-offset-2 focus:outline-none'
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
