import { RefreshIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { Link, useFetcher } from '@remix-run/react';
import Cross from '~/components/Icons/Cross';
import {
  getProductType,
  ProductType,
  useSelectedArticleNumber,
} from '~/lib/utils/product';
import type { CartActionData } from '~/routes/cart';
import { useClientData } from '~/routes/__layout/__client';
import type { RouteProduct } from '~/utils/types';
import { VariantOption } from './VariantOption';

type Props = {
  product: RouteProduct;
};

function AddToCartForm({ product }: Props) {
  const fetcher = useFetcher<CartActionData>();
  const state =
    fetcher.state === 'idle' && fetcher.data?.error ? 'error' : fetcher.state;
  const productType = getProductType(product);
  const { cart } = useClientData();
  const articleNumber = useSelectedArticleNumber(product);
  const quantity =
    cart?.items?.find((item) => item?.articleNumber === articleNumber)
      ?.quantity ?? 0;

  if (state === 'error') {
    const data = fetcher.data;

    return (
      <div className='max-w-xs px-4 py-2 border rounded bg-cerise-100 border-cerise-500 text-cerise-600'>
        <h3 className='my-2 text-xl font-semibold'>{data?.error?.name}</h3>
        <p className='mb-5'>{data?.error?.message}</p>
        <Link
          to='.'
          className='flex items-center justify-center gap-2 px-4 py-2 border rounded border-cerise-600 text-cerise-600 bg-cerise-300 hover:bg-cerise-400 hover:text-cerise-700'
        >
          Reload
          <RefreshIcon className='w-5 h-6' />
        </Link>
      </div>
    );
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const formData = new FormData(event.currentTarget);
    const articleNumber = formData.get('_articleNumber') as string;
    const variant = product.variants?.values.find(
      (variant) => variant?.articleNumber === articleNumber
    );

    toast.custom((t) => (
      <div
        className={`flex gap-6 transition bg-white px-6 py-4 shadow-md rounded ${
          t.visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          className='object-contain w-24 h-24'
          src={(variant || product).images?.[0]?.url}
          alt={product.name}
        />
        <div>
          <h2 className='font-bold'>Added to cart</h2>
          <span className='text-sm text-gray-600'>{product.name}</span>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className='flex align-start'
        >
          <Cross className='w-6 h-6' />
        </button>
      </div>
    ));
  };

  return (
    <fetcher.Form method='post' action='/cart' onSubmit={handleSubmit}>
      <input type='hidden' name='_action' value='addToCart' />
      <input type='hidden' name='_productType' value={productType} />
      <input
        type='hidden'
        name='_articleNumber'
        value={articleNumber || product.articleNumber}
      />
      <input type='hidden' name='_quantity' value={quantity + 1} />
      <fieldset>
        {productType === ProductType.Variant ? (
          <>
            {product.variants?.options.map((option) => {
              if (!option) return null;
              return (
                <VariantOption
                  product={product}
                  key={option?.name}
                  option={option}
                />
              );
            })}
          </>
        ) : null}
        <button
          disabled={!articleNumber}
          type='submit'
          className='w-full py-3 mt-4 bg-blue-400 rounded text-blue-50 hover:bg-blue-500 lg:w-96 focus:ring focus:ring-blue-400 active:ring-blue-500 ring-offset-2 focus:outline-none disabled:opacity-80 disabled:cursor-not-allowed'
        >
          Add to cart
        </button>
      </fieldset>
    </fetcher.Form>
  );
}

export default AddToCartForm;
