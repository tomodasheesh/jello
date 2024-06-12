/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, type DependencyList } from 'react';

export const useDebounce = (fn: () => void, delay: number, deps: DependencyList) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    timeoutRef.current = setTimeout(fn, delay);

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [...deps]);
};





