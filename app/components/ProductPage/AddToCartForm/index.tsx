import { RefreshIcon } from '@heroicons/react/outline';
import { Link, useFetcher } from 'remix';
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
  // const data = useActionData();
  const { cart } = useClientData();
  const articleNumber = useSelectedArticleNumber(product);
  const quantity =
    cart?.items?.find((item) => item?.articleNumber === articleNumber)
      ?.quantity ?? 0;

  if (state === 'error') {
    const data = fetcher.data;

    return (
      <div className='max-w-xs bg-cerise-100 px-4 py-2 rounded border border-cerise-500 text-cerise-600'>
        <h3 className='font-semibold text-xl my-2'>{data?.error?.name}</h3>
        <p className='mb-5'>{data?.error?.message}</p>
        <Link
          to='.'
          className='px-4 py-2 flex items-center justify-center gap-2 border border-cerise-600 text-cerise-600 bg-cerise-300 rounded hover:bg-cerise-400 hover:text-cerise-700'
        >
          Reload
          <RefreshIcon className='w-5 h-6' />
        </Link>
      </div>
    );
  }

  return (
    <fetcher.Form method='post' action='/cart'>
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
          className='text-blue-50 bg-blue-400 hover:bg-blue-500 w-full lg:w-96 py-3 rounded focus:ring focus:ring-blue-400 active:ring-blue-500 ring-offset-2 focus:outline-none mt-4 disabled:opacity-80 disabled:cursor-not-allowed'
        >
          Add to cart
        </button>
      </fieldset>
    </fetcher.Form>
  );
}

export default AddToCartForm;
