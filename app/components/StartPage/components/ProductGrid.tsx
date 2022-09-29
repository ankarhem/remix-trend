import { Transition } from '@headlessui/react';
import { useInView } from 'react-intersection-observer';
import { Link } from '@remix-run/react';
import { z } from 'zod';
import CategoryGrid from '../../CategoryPage/ProductGrid';

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  subName: z.string(),
  price: z.object({
    incVat: z.number(),
    exVat: z.number(),
    vat: z.number(),
  }),
  primaryRoute: z
    .object({
      path: z.string(),
    })
    .optional(),
  images: z.array(
    z.object({
      alt: z.string(),
      url: z.string(),
      title: z.string(),
      // modifiedDate: z.string(),
    })
  ),
  description: z.string(),
});

const ProductGridSchema = z.object({
  header: z.string(),
  product1: ProductSchema,
  product2: ProductSchema,
  product3: ProductSchema,
  product4: ProductSchema,
});

const ProductItem = ({
  product,
  index,
}: {
  product: z.infer<typeof ProductSchema>;
  index: number;
}) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: true,
  });
  const alignment = index % 2 === 0 ? 'left' : 'right';

  return (
    <div
      ref={ref}
      className={`grid place-items-center min-h-[700px]`}
      key={product.id}
    >
      <Transition show={inView}>
        <div className='grid grid-cols-2 gap-10 place-items-center'>
          <Transition.Child
            as={Link}
            prefetch='intent'
            to={product.primaryRoute?.path || ''}
            className={`${alignment === 'left' ? 'order-0' : 'order-1'}`}
            enter='transition duration-500'
            enterFrom={`opacity-0 ${
              alignment === 'left' ? '-translate-x-5' : 'translate-x-5'
            }`}
            enterTo='opacity-100'
          >
            <img
              src={product.images?.[0].url}
              alt={product.images?.[0].alt}
              className='max-h-[500px] max-w-[600px]'
            />
          </Transition.Child>
          <Transition.Child
            enter='transition duration-500'
            enterFrom={`opacity-0 ${
              alignment === 'left' ? 'translate-x-5' : '-translate-x-5'
            }`}
            enterTo='opacity-100 translate-x-0'
            className={`justify-self-start ${
              alignment === 'left' ? '' : 'text-right justify-self-end'
            }`}
          >
            <Link
              to={product.primaryRoute?.path || ''}
              className='hover:underline underline-offset-4'
              prefetch='intent'
            >
              <h3 className='mb-2 text-4xl font-semibold'>{product.name}</h3>
            </Link>
            <p className='mb-10 text-xl text-gray-400'>{product.subName}</p>
            <div
              className='text-gray-600 max-w-prose'
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </Transition.Child>
        </div>
      </Transition>
    </div>
  );
};

function ProductGrid({ header, ...rest }: z.infer<typeof ProductGridSchema>) {
  const products: z.infer<typeof ProductSchema>[] = Object.entries(rest)
    // get the rest of the properties with keys like 'product1' and 'product2'
    .filter(([key]) => /^product(\d+)$/.test(key))
    .map(([key, value]) => value);

  return (
    <>
      {/* Desktop */}
      <div className='hidden gap-10 lg:grid'>
        {products.map((product, index) => {
          return (
            <ProductItem
              key={`${product.id}`}
              product={product}
              index={index}
            />
          );
        })}
      </div>
      {/* Mobile */}
      <div className='lg:hidden'>
        <h3 className='mx-4 text-2xl lg:hidden'>{header}</h3>
        <CategoryGrid products={products as any} />
      </div>
    </>
  );
}

export default Object.assign(ProductGrid, {
  schema: ProductGridSchema,
});
