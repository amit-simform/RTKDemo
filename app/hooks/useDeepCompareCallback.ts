import React, { useCallback } from 'react';
import { AppConst } from '../constants';
import { checkDeps, useDeepCompareMemoize } from './hooks-utils';

/**
 * A React hook that it returns a memoized callback that only changes if one of the dependencies has changed.
 * @param {T} callback - The callback function that you want to be memoized.
 * @param {React.DependencyList} dependencies - the dependencies of the callback function
 * @returns {Function} A callback function that is memoized using useDeepCompareMemoize
 */
export default function useDeepCompareCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
) {
  if (AppConst.isDevelopment) {
    checkDeps(dependencies, 'useDeepCompareCallback');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, useDeepCompareMemoize(dependencies));
}
