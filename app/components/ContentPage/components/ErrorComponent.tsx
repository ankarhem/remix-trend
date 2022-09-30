import React from 'react';
import type { ErrorBoundary } from '~/lib/components/ContentRenderer';

const ErrorComponent: ErrorBoundary = ({ error }) => {
  return (
    <div className="my-6 flex flex-col items-start justify-center rounded bg-chestnut-200 text-chestnut-500">
      <div className="p-4">
        <h2 className="mb-8 text-3xl font-bold">{error.name}</h2>
        <pre>{error.message}</pre>
      </div>
    </div>
  );
};
export default ErrorComponent;
