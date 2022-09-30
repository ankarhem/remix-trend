import { RefreshIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { Link, useFetcher } from '@remix-run/react';
import Cross from '~/components/Icons/Cross';
import { getProductType, useSelectedArticleNumber } from '~/lib/utils/product';
import { useClientData } from '~/routes/__layout/__client';
import type { RouteProduct } from '~/utils/types';
import SelectionFactory from './SelectionFactory';
import type { AddToCartMutation } from '~/graphql/types';
import type { StoreAPIResponse } from '~/lib/jetshop';

type Props = {
  product: RouteProduct;
};

function AddToCartForm({ product }: Props) {
  const fetcher = useFetcher<StoreAPIResponse<AddToCartMutation>>();
  const state =
    fetcher.state === 'idle' && fetcher.data?.errors ? 'error' : fetcher.state;
  const productType = getProductType(product);
  const { cart } = useClientData();
  const articleNumber = useSelectedArticleNumber(product);
  const quantity =
    cart?.items?.find((item) => item?.articleNumber === articleNumber)
      ?.quantity ?? 0;

  if (state === 'error') {
    const data = fetcher.data;

    return (
      <div className="max-w-xs rounded border border-cerise-500 bg-cerise-100 px-4 py-2 text-cerise-600">
        <p className="my-2 mb-5 text-xl font-semibold">
          {data?.errors?.[0]?.message}
        </p>
        <Link
          to="."
          className="flex items-center justify-center gap-2 rounded border border-cerise-600 bg-cerise-300 px-4 py-2 text-cerise-600 hover:bg-cerise-400 hover:text-cerise-700"
        >
          Reload
          <RefreshIcon className="h-6 w-5" />
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
        className={`flex gap-6 rounded bg-white px-6 py-4 shadow-md transition ${
          t.visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          className="h-24 w-24 object-contain"
          src={(variant || product).images?.[0]?.url}
          alt={product.name}
        />
        <div>
          <h2 className="font-bold">Added to cart</h2>
          <span className="text-sm text-gray-600">{product.name}</span>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="align-start flex"
        >
          <Cross className="h-6 w-6" />
        </button>
      </div>
    ));
  };

  return (
    <fetcher.Form method="post" action="/cart" onSubmit={handleSubmit}>
      <input type="hidden" name="_action" value="addToCart" />
      <input type="hidden" name="_productType" value={productType} />
      <input
        type="hidden"
        name="_articleNumber"
        value={articleNumber || product.articleNumber}
      />
      <input type="hidden" name="_quantity" value={quantity + 1} />
      <fieldset>
        <SelectionFactory product={product} />
        <button
          // disabled={!articleNumber}
          type="submit"
          className="mt-4 w-full rounded bg-blue-400 py-3 text-blue-50 ring-offset-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 active:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80 lg:w-96"
        >
          Add to cart
        </button>
      </fieldset>
    </fetcher.Form>
  );
}

export default AddToCartForm;
