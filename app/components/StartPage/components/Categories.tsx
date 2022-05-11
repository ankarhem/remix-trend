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

const Categories: React.FC<z.infer<typeof CategorySchema>> = ({ children }) => {
  return (
    <div className='container mx-auto grid grid-flow-col auto-cols-auto gap-8 -translate-y-1/2'>
      {children}
    </div>
  );
};

const CategoryItem = ({
  category,
  categoryImage,
}: z.infer<typeof CategoryItemSchema>) => {
  return (
    <Link
      to={category.primaryRoute?.path || ''}
      className='group relative block rounded-xl overflow-hidden hover:scale-110 transition -mb-[50%]'
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
