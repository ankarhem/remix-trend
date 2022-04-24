import { Dialog, Transition } from '@headlessui/react';
import { useEffect } from 'react';
import { useFetcher } from 'remix';
import { CartQuery } from '~/graphql/types';
import Cross from '../Icons/Cross';
import Price from '../Price';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CartFlyout({ isOpen, onClose }: Props) {
  const fetcher = useFetcher<CartQuery>();

  useEffect(() => {
    if (fetcher.type === 'init') {
      fetcher.load('/cart-summary');
    }
  }, [fetcher]);

  return (
    <Transition show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className='fixed z-10 inset-0 overflow-y-auto'
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
            className='fixed right-0 top-0 bottom-0 w-96'
          >
            <div className='relative bg-white h-full py-4'>
              <div className='grid grid-cols-3 items-center mb-6'>
                <Dialog.Title className='text-xl text-center text-gray-900 col-start-2'>
                  Cart
                </Dialog.Title>
                <button onClick={onClose} className='justify-self-end mr-6'>
                  <Cross className='w-6 h-6' />
                </button>
              </div>

              <hr className='mx-6 border-gray-100/80' />

              <>
                {fetcher.data ? (
                  <ul className='grid grid-cols-1 mx-6'>
                    {fetcher.data.cart?.items?.map((item) => {
                      if (!item || !item.product) return null;

                      const product = item.product;
                      return (
                        <li
                          key={item.id}
                          className='flex py-4 gap-3 border-b border-gray-100/80'
                        >
                          <img
                            className='h-24 w-24 object-contain group-hover:scale-110 transition'
                            src={product.images?.[0]?.url}
                            alt={product.images?.[0]?.alt ?? product.name}
                          />
                          <div className='grid'>
                            <div>
                              <h2>{product.name}</h2>
                              <span className='text-gray-600 text-sm'>
                                {product.articleNumber}
                              </span>
                            </div>

                            <div className='flex items-center gap-2 self-end text-sm'>
                              <button className='rounded bg-gray-300 w-5 h-5'>
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button className='rounded bg-gray-300 w-5 h-5'>
                                +
                              </button>
                            </div>
                          </div>
                          <div className='flex flex-col ml-auto justify-between'>
                            <button onClick={() => null} className='self-end'>
                              <Cross className='w-6 h-6' />
                            </button>

                            <span className='text-gray-600 text-sm'>
                              <Price
                                price={product.price}
                                quantity={item.quantity}
                              />
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
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
