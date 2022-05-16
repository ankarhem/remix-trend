import type { RouteProduct } from '~/utils/types';
import ProductGrid from '../CategoryPage/ProductGrid';
import Price from '../Price';
import AddToCartForm from './AddToCartForm';

type Props = {
  product: RouteProduct;
};

function ProductPage({ product }: Props) {
  if (!product) return null;

  return (
    <div className='container flex flex-col mx-auto mt-12 mb-8 gap-12'>
      <div className='flex gap-12 flex-col lg:flex-row mx-4 lg:mx-0 '>
        <div className='basis-full bg-white flex items-center justify-center'>
          <img
            className='object-contain max-h-[600px] lg:min-h-[500px] p-8'
            src={product.images?.[0]?.url}
            alt={product.images?.[0]?.alt ?? product.name}
          />
        </div>
        <div className='lg:basis-[90%]'>
          <div className='mb-6'>
            <h1 className='text-gray-900 font-bold text-3xl uppercase'>
              {product.name}
            </h1>
            <h2 className='font-bold text-sm'>{product.subName}</h2>
            <span className='text-sm'>{product.articleNumber}</span>
          </div>

          <div
            className='text-gray-500 text-sm mb-6 max-w-prose'
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />

          <div className='text-xl font-bold uppercase mb-6'>
            <Price price={product.price} />
          </div>

          <AddToCartForm product={product} />
        </div>
      </div>

      {product.relatedProducts && product.relatedProducts?.length > 0 ? (
        <div className='mx-4 lg:mx-0'>
          <h2 className='text-gray-900 font-bold text-2xl uppercase mb-6'>
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
