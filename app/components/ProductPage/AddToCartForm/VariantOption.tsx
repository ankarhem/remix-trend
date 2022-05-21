import { RadioGroup } from '@headlessui/react';
import { Link } from 'remix';
import { useTransitionalParams } from '~/lib/utils/useTransitionalParams';
import type { RouteProduct } from '~/utils/types';

export const VariantOption = ({
  option,
}: {
  option: NonNullable<NonNullable<RouteProduct['variants']>['options'][number]>;
}) => {
  const params = useTransitionalParams();
  if (!option?.name) return null;

  const urlValue = params.get(option.name);
  const toggleOptionPath = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (!option.name) return '';
    if (urlValue === value) {
      newParams.delete(option.name);
    } else {
      newParams.set(option.name, value);
    }

    return `?${newParams.toString()}`;
  };
  return (
    <RadioGroup
      key={option.name}
      value={urlValue}
      onChange={() => null}
      name={option.name}
      className='mb-2'
    >
      <RadioGroup.Label className='mb-2'>{option.name}</RadioGroup.Label>
      <div className='flex gap-2'>
        {option.values.map((value) => {
          if (!value) return null;

          return (
            <RadioGroup.Option
              as={Link}
              to={toggleOptionPath(value)}
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
