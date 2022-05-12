import { NProgress } from '@tanem/react-nprogress';
import React from 'react';
import ReactDOM from 'react-dom';
import { useTransition } from 'remix';
import { useHydrated } from 'remix-utils';

interface BarProps {
  progress: number;
  isFinished: boolean;
}

const Bar = ({ progress, isFinished }: BarProps) => {
  return (
    <div
      className={`duration-400 fixed top-0 left-0 z-50 w-full transition-opacity ease-out overflow-hidden ${
        isFinished ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className='bg-blue-200 transition duration-300 h-[3px]'
        style={{
          transform: `translateX(-${100 - progress * 100}%)`,
        }}
      />
    </div>
  );
};

const NProgressBar = ({ loading }: { loading: boolean }) => (
  <NProgress isAnimating={loading}>
    {({ isFinished, progress }) => (
      <Bar progress={progress} isFinished={isFinished} />
    )}
  </NProgress>
);

const MemoizedNProgress = React.memo(NProgressBar);

const ProgressBar = (): React.ReactPortal | null => {
  const transition = useTransition();
  const isHydrated = useHydrated();

  return isHydrated
    ? ReactDOM.createPortal(
        <MemoizedNProgress loading={transition.state !== 'idle'} />,
        document.body
      )
    : null;
};

export default ProgressBar;
