import React from 'react';
import { useNavigate } from 'remix';
import { Filters, UseFiltersReturnType } from '~/lib/utils/useFilters';

export type BooleanFilterType =
  | Extract<NonNullable<Filters>[number], { __typename: 'BooleanFilter' }>[]
  | null
  | undefined;

type Props = {
  booleanFilters: BooleanFilterType;
  getActiveFilterValue: UseFiltersReturnType['getActiveFilterValue'];
  toggleFilterPath: UseFiltersReturnType['toggleFilterPath'];
};

function BooleanFilters({
  booleanFilters,
  getActiveFilterValue,
  toggleFilterPath,
}: Props) {
  const navigate = useNavigate();
  return (
    <>
      {booleanFilters?.map((filter) => {
        const urlValue = getActiveFilterValue(filter.__typename, filter.id);
        const value =
          typeof urlValue === 'string' ? urlValue === 'true' : filter.default;

        if (typeof value !== 'boolean') return null;
        return (
          <input
            key={filter.id}
            type='checkbox'
            checked={value}
            onChange={(event) => {
              const path = toggleFilterPath(filter.__typename, {
                id: filter.id,
                value: String(event.target.checked),
              });
              console.log('hello', path);

              navigate(path);
            }}
          />
        );
      })}
    </>
  );
}

export default BooleanFilters;
