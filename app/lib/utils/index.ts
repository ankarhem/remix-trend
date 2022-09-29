import { useSearchParams } from '@remix-run/react';

export const usePagination = ({
  totalResults,
  pageSize,
}: {
  totalResults: number;
  pageSize: number;
}) => {
  const [params] = useSearchParams();
  const page = Math.max(parseInt(params.get('page') || '1'), 1);

  const totalPages = Math.ceil(totalResults / pageSize);

  params.delete('page');
  const queryString = params.toString();
  const prevPage = page - 1 > 1 ? `page=${page - 1}` : undefined;
  const nextPage = page < totalPages ? `page=${page + 1}` : undefined;

  const pagination = {
    currentPage: page,
    previousPage: {
      path:
        queryString.length > 0
          ? `?${queryString}${prevPage ? `&${prevPage}` : ''}`
          : `?${prevPage}`,
      disabled: page === 1,
    },
    nextPage: {
      path:
        queryString.length > 0
          ? `?${queryString}${nextPage ? `&${nextPage}` : ''}`
          : `?${nextPage}`,
      disabled: page === totalPages,
    },
    totalPages,
  };

  return pagination;
};
