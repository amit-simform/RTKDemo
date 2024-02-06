import React, { useEffect } from 'react';
import { AppConst } from '../constants';
import { checkDeps, useDeepCompareMemoize } from './hooks-utils';

/**
 * A React hook that it's a wrapper around React's useEffect hook that uses a
 * deep comparison of the dependencies array to determine if the effect should be run.
 * @param {React.EffectCallback} effect - The effect function to call.
 * @param {React.DependencyList} dependencies - The dependencies to check for changes.
 * @returns None
 */
export default function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies: React.DependencyList
) {
  if (AppConst.isDevelopment) {
    checkDeps(dependencies, 'useDeepCompareEffect');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareMemoize(dependencies));
}
