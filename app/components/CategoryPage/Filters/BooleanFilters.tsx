import React from 'react';
import { useNavigate } from '@remix-run/react';
import type { Filters, UseFiltersReturnType } from '~/lib/utils/useFilters';

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
          typeof urlValue === 'string'
            ? urlValue === 'true'
            : filter.default === true;

        return (
          <label
            key={filter.id}
            className="flex items-center gap-4 text-sm hover:cursor-pointer"
          >
            {filter.name}
            <input
              className="rounded p-2.5 text-blue-400 hover:ring focus:ring-blue-400"
              type="checkbox"
              checked={value}
              onChange={(event) => {
                const path = toggleFilterPath(filter.__typename, {
                  id: filter.id,
                  value: String(event.target.checked),
                });

                navigate(path);
              }}
            />
          </label>
        );
      })}
    </>
  );
}

export default BooleanFilters;
