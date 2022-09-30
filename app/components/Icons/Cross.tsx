import React from 'react';

const Cross = ({ className }: { className: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      className={className}
    >
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default Cross;
