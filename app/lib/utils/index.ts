import { useSearchParams } from 'remix';

export const usePagination = ({
  totalResults,
  pageSize,
}: {
  totalResults: number;
  pageSize: number;
}) => {
  const params = useSearchParams();
  const page = parseInt(params[0].get('page') || '1');

  const totalPages = Math.ceil(totalResults / pageSize);

  const pagination = {
    currentPage: page,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < Math.ceil(totalResults / pageSize) ? page + 1 : null,
    totalPages,
  };

  return pagination;
};
