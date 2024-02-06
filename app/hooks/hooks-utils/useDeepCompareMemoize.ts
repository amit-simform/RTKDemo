import isEqual from 'lodash/isEqual';
import React, { useRef } from 'react';

/**
 * Checks if the user passes in an empty dependency list, then throw an error.
 * @param {React.DependencyList} deps - The dependencies array passed to the hook
 * @param {string} name - the name of the hook that is being used
 * @returns None
 */
export function checkDeps(deps: React.DependencyList, name: string) {
  const reactHookName: string = `React.${name.replace(/DeepCompare/, '')}`;

  if (!deps || deps.length === 0) {
    throw new Error(
      `${name} should not be used with no dependencies. Use ${reactHookName} instead.`
    );
  }
}

/**
 * A React hook that returns a memoized version of the given dependency list.
 * @param {React.DependencyList} value - the dependency list to memoize
 * @returns {React.DependencyList} - the memoized version of the dependency list
 */
export default function useDeepCompareMemoize(value: React.DependencyList): React.DependencyList {
  const ref = useRef<React.DependencyList>([]);

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
