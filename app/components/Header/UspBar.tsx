import React from 'react';

const UspBar = () => {
  return (
    <div className="flex overflow-hidden bg-blue-400 sm:justify-center">
      <div className="motion-reduce:animation:none flex h-8 animate-slideLeft items-center justify-evenly gap-12 whitespace-nowrap bg-blue-400 px-4 text-xs text-blue-50 sm:animate-none sm:gap-8">
        <span>✨ Best in class</span>
        <span>🚀 Fast as fuck</span>
        <span>📦 Deliveries with teleportation</span>
      </div>
      <div className="flex h-8 animate-slideLeft items-center justify-evenly gap-12 whitespace-nowrap bg-blue-400 px-4 text-xs text-blue-50 sm:hidden sm:gap-8">
        <span>✨ Best in class</span>
        <span>🚀 Fast as fuck</span>
        <span>📦 Deliveries with teleportation</span>
      </div>
    </div>
  );
};

export default UspBar;
