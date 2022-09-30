import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import { Link } from '@remix-run/react';
import { usePagination } from '~/lib/utils';
import { PAGE_SIZE } from '~/routes/__layout';

type Props = {
  totalResults: number;
};

const linkStyle =
  'flex w-fit px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 whitespace-nowrap';

const linkDisabledStyles = 'pointer-events-none opacity-50';

function Pagination({ totalResults }: Props) {
  const { previousPage, nextPage, totalPages, currentPage } = usePagination({
    totalResults,
    pageSize: PAGE_SIZE,
  });

  return (
    <nav className="mb-8 grid grid-cols-3 px-4 sm:px-8">
      <span
        className={`flex justify-start ${
          !previousPage ? 'cursor-not-allowed' : ''
        }`}
      >
        <Link
          to={previousPage.path}
          className={`${linkStyle} ${
            previousPage.disabled ? linkDisabledStyles : ''
          }`}
          prefetch="intent"
          tabIndex={previousPage.disabled ? -1 : 0}
        >
          <ArrowNarrowLeftIcon className="mr-1 h-6 w-6" />
          <span className="hidden sm:inline-block">Previous</span>
        </Link>
      </span>
      <div className="flex items-center justify-center">{`Page ${currentPage} of ${totalPages}`}</div>
      <span
        className={`flex justify-end ${
          nextPage.disabled ? 'cursor-not-allowed' : ''
        }`}
      >
        <Link
          to={nextPage.path}
          className={`${linkStyle} ${
            nextPage.disabled ? linkDisabledStyles : ''
          }`}
          prefetch="intent"
          tabIndex={!nextPage ? -1 : 0}
        >
          <span className="hidden sm:inline-block">Next</span>
          <ArrowNarrowRightIcon className="ml-1 h-6 w-6" />
        </Link>
      </span>
    </nav>
  );
}

export default Pagination;
