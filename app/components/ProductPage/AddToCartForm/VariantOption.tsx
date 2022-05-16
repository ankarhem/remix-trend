import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import type { RouteProduct } from '~/utils/types';

export const VariantOption = ({
  option,
}: {
  option: NonNullable<NonNullable<RouteProduct['variants']>['options'][number]>;
}) => {
  const [selected, setSelected] = useState(option.values[0]);
  if (!option?.name) return null;

  return (
    <RadioGroup
      key={option.name}
      value={selected}
      onChange={setSelected}
      name={option.name}
      className='mb-2'
    >
      <RadioGroup.Label className='mb-2'>{option.name}</RadioGroup.Label>
      <div className='flex gap-2'>
        {option.values.map((value) => {
          if (!value) return null;

          return (
            <RadioGroup.Option
              key={value}
              value={value}
              className={({ active, checked }) =>
                `${active ? 'ring-2 ring-blue-200 ' : ''}
                ${checked ? 'bg-blue-400 text-blue-50' : 'bg-white'}
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
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
