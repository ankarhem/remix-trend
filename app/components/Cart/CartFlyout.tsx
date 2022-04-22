import { Dialog, Transition } from '@headlessui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CartFlyout({ isOpen, onClose }: Props) {
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
                <button
                  onClick={onClose}
                  className='w-6 h-6 justify-self-end mr-6'
                >
                  <svg width='24' height='24' viewBox='0 0 24 24' role='img'>
                    <path
                      d='M18 6 6 18M6 6l12 12'
                      stroke='currentColor'
                      stroke-linecap='square'
                      stroke-linejoin='round'
                    ></path>
                  </svg>
                </button>
              </div>

              <hr className='mx-6 border-gray-100/80 border' />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CartFlyout;
