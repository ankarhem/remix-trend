import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import { Link } from 'remix';
import { usePagination } from '~/lib/utils';
import { PAGE_SIZE } from '~/routes/__layout';

type Props = {
  totalResults: number;
};

const linkStyle =
  'flex w-fit px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 whitespace-nowrap';

const linkDisabledStyles = 'pointer-events-none opacity-50';

function Pagination({ totalResults }: Props) {
  const { previousPage, nextPage, totalPages, currentPage } = usePagination({
    totalResults,
    pageSize: PAGE_SIZE,
  });

  console.log(totalPages);

  return (
    <nav className='grid grid-cols-3 mb-8'>
      <span
        className={`flex justify-start ${
          !previousPage ? 'cursor-not-allowed' : ''
        }`}
      >
        <Link
          to={`?page=${previousPage}`}
          className={`${linkStyle} ${!previousPage ? linkDisabledStyles : ''}`}
          prefetch='intent'
          tabIndex={!previousPage ? -1 : 0}
        >
          <ArrowNarrowLeftIcon className='w-6 h-6 mr-1' />
          Previous
        </Link>
      </span>
      <div className='flex items-center justify-center'>{`Page ${currentPage} of ${totalPages}`}</div>
      <span
        className={`flex justify-end ${!nextPage ? 'cursor-not-allowed' : ''}`}
      >
        <Link
          to={`?page=${nextPage}`}
          className={`${linkStyle} ${!nextPage ? linkDisabledStyles : ''}`}
          prefetch='intent'
          tabIndex={!nextPage ? -1 : 0}
        >
          Next
          <ArrowNarrowRightIcon className='w-6 h-6 ml-1' />
        </Link>
      </span>
    </nav>
  );
}

export default Pagination;
