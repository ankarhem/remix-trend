import { RadioGroup } from '@headlessui/react';
import type { RouteProduct } from '~/utils/types';

export const VariantOption = ({
  name,
  option,
  product,
}: {
  name: string;
  product: RouteProduct;
  option: NonNullable<NonNullable<RouteProduct['variants']>['options'][number]>;
}) => {
  if (!option?.name) return null;
  const defaultValue = option.values[0];

  return (
    <RadioGroup
      key={option.name}
      name={name}
      defaultValue={defaultValue!}
      onChange={(value) => {
        if (!value) return;
      }}
      className="mb-2"
    >
      <RadioGroup.Label className="mb-2">{option.name}</RadioGroup.Label>
      <div className="flex gap-2">
        {option.values.map((value) => {
          if (!value) return null;

          return (
            <RadioGroup.Option
              key={value}
              value={value}
              className={({ active, checked }) =>
                `${active ? 'ring-2 ring-blue-200 ' : ''}
                ${checked ? 'bg-blue-400 text-blue-50' : 'bg-white'}
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none aria-disabled:cursor-not-allowed aria-disabled:bg-gray-100/80`
              }
            >
              {value}
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
};
