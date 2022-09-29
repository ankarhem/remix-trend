import { useMemo } from 'react';
import { useLocation, useTransition } from '@remix-run/react';

export function useTransitionalParams() {
  const transition = useTransition();
  const location = useLocation();
  const searchString =
    transition.state === 'loading' &&
    transition.location.pathname === location.pathname
      ? transition.location.search
      : location.search;
  const params = useMemo(
    () => new URLSearchParams(searchString),
    [searchString]
  );
  return params;
}
