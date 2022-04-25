import React from 'react';

const UspBar = () => {
  return (
    <div className='flex bg-blue-400 sm:justify-center overflow-hidden'>
      <div className='h-8 bg-blue-400 text-blue-50 flex items-center justify-evenly gap-12 sm:gap-8 text-xs whitespace-nowrap px-4 animate-slideLeft sm:animate-none motion-reduce:animation:none'>
        <span>✨ Best in class</span>
        <span>🚀 Fast as fuck</span>
        <span>📦 Deliveries with teleportation</span>
      </div>
      <div className='h-8 bg-blue-400 text-blue-50 flex items-center justify-evenly gap-12 sm:gap-8 text-xs whitespace-nowrap px-4 animate-slideLeft sm:hidden'>
        <span>✨ Best in class</span>
        <span>🚀 Fast as fuck</span>
        <span>📦 Deliveries with teleportation</span>
      </div>
    </div>
  );
};

export default UspBar;
