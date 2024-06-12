/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type DependencyList } from 'react';
import { useTimeout } from './useTimeout';

export const useDebounce = (fn: () => void, delay: number, deps: DependencyList) => {
  const { reset, clear } = useTimeout(fn, delay);

  useEffect(() => {
    return reset();
  }, [...deps, reset]);

  useEffect(() => {
    return clear;
  }, []);
};





