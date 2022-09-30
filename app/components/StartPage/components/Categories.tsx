import React from 'react';
import { Link } from '@remix-run/react';
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
      <h3 className="mx-4 text-2xl lg:hidden">{header}</h3>
      <div className="lg:min-h-unset mx-auto -mt-8 grid min-h-min max-w-full auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-6 pt-6 pb-8 lg:container lg:mt-0 lg:translate-x-0 lg:-translate-y-1/2 lg:auto-cols-[15%] lg:justify-center lg:gap-10 lg:overflow-visible lg:px-0 lg:pb-0">
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
      className="group relative block overflow-hidden overflow-y-visible rounded-md transition hover:scale-110 lg:-mb-[50%] lg:rounded-xl"
      prefetch="intent"
    >
      <img
        src={categoryImage.value}
        alt="category"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-blue-400/20 opacity-0 transition group-hover:opacity-100">
        <h3 className="text-2xl font-bold text-white">{category.name}</h3>
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
