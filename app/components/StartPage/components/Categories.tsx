import React from 'react';
import { Link } from 'remix';
import { z } from 'zod';

const CategorySchema = z.object({
  header: z.string(),
});

const CategoryItemSchema = z.object({
  category: z.object({
    name: z.string(),
    primaryRoute: z
      .object({
        path: z.string(),
      })
      .optional(),
  }),
  categoryImage: z.object({
    value: z.string(),
  }),
});

const Categories: React.FC<z.infer<typeof CategorySchema>> = ({
  header,
  children,
}) => {
  return (
    <>
      <h3 className='text-2xl lg:hidden mx-4'>{header}</h3>
      <div className='pb-8 lg:pb-0 max-w-full lg:container grid mx-auto grid-flow-col auto-cols-[150px] px-8 lg:px-0 lg:translate-x-0 lg:auto-cols-[15%] gap-4 lg:gap-10 lg:-translate-y-1/2 lg:justify-center overflow-x-auto lg:overflow-visible min-h-min lg:min-h-unset'>
        {children}
      </div>
    </>
  );
};

const CategoryItem = ({
  category,
  categoryImage,
}: z.infer<typeof CategoryItemSchema>) => {
  return (
    <Link
      to={category.primaryRoute?.path || ''}
      className='group relative block rounded-md lg:rounded-xl overflow-hidden hover:scale-110 transition lg:-mb-[50%] overflow-y-visible'
      prefetch='intent'
    >
      <img
        src={categoryImage.value}
        alt='category'
        className='object-cover w-full h-full'
      />
      <div className='bg-blue-400/20 inset-0 absolute group-hover:opacity-100 transition opacity-0 flex items-center justify-center'>
        <h3 className='text-white text-2xl font-bold'>{category.name}</h3>
      </div>
    </Link>
  );
};

export default Object.assign(Categories, {
  schema: CategorySchema,
  Item: Object.assign(CategoryItem, {
    schema: CategoryItemSchema,
  }),
});
