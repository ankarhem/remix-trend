import toast from 'react-hot-toast';
import { useFetcher } from 'remix';
import type { RouteProduct } from '~/utils/types';
import ProductGrid from './CategoryPage/ProductGrid';
import Cross from './Icons/Cross';
import Price from './Price';

type Props = {
  product: RouteProduct;
};

function ProductPage({ product }: Props) {
  const fetcher = useFetcher();

  if (!product) return null;

  const handleAddToCart = async () => {
    await fetcher.submit(
      { articleNumber: product.articleNumber },
      { method: 'post', action: '/cart-summary' }
    );
    toast.custom((t) => (
      <div
        className={`flex gap-6 transition bg-white px-6 py-4 shadow-md rounded ${
          t.visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          className='h-24 w-24 object-contain'
          src={product.images?.[0]?.url}
          alt={product.images?.[0]?.alt ?? product.name}
        />
        <div>
          <h2 className='font-bold'>Added to cart</h2>
          <span className='text-gray-600 text-sm'>{product.name}</span>
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
    <div className='container flex flex-col mx-auto mt-12 mb-8 gap-12'>
      <div className='flex gap-12'>
        <div className='basis-full bg-white flex items-center justify-center'>
          <img
            className='object-contain max-h-[600px] min-h-[500px] p-8'
            src={product.images?.[0]?.url}
            alt={product.images?.[0]?.alt ?? product.name}
          />
        </div>
        <div className='basis-[90%]'>
          <div className='mb-6'>
            <h1 className='text-gray-900 font-bold text-3xl uppercase'>
              {product.name}
            </h1>
            <h2 className='font-bold text-sm'>{product.subName}</h2>
            <span className='text-sm'>{product.articleNumber}</span>
          </div>

          <div
            className='text-gray-500 text-sm mb-6'
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />

          <div className='text-xl font-bold uppercase mb-6'>
            <Price price={product.price} />
          </div>

          <button
            onClick={handleAddToCart}
            className='text-blue-50 bg-blue-400 hover:bg-blue-500 w-96 py-3 rounded focus:ring focus:ring-blue-400 active:ring-blue-500 ring-offset-2 focus:outline-none'
          >
            Add to cart
          </button>
        </div>
      </div>

      {product.relatedProducts && product.relatedProducts?.length > 0 ? (
        <div>
          <h2 className='text-gray-900 font-bold text-3xl uppercase mb-6'>
            Related products
          </h2>

          <ProductGrid
            products={product.relatedProducts}
            className='justify-start !grid-cols-[repeat(auto-fit,_minmax(300px,350px))] !p-0'
          />
        </div>
      ) : null}
    </div>
  );
}

export default ProductPage;
