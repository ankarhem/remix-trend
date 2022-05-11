import React from 'react';
import type { ErrorBoundary } from '~/lib/components/ContentRenderer';

const ErrorComponent: ErrorBoundary = ({ error }) => {
  return (
    <div className='flex flex-col items-start justify-center bg-chestnut-200 text-chestnut-500 rounded my-6'>
      <div className='p-4'>
        <h2 className='text-3xl font-bold mb-8'>{error.name}</h2>
        <pre>{error.message}</pre>
      </div>
    </div>
  );
};
export default ErrorComponent;
