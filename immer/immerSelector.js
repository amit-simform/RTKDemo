/* eslint-disable require-jsdoc */

/* eslint-disable no-restricted-syntax */

import { createDraftSafeSelector, createSelector } from '@reduxjs/toolkit';
import { produce } from 'immer';

const selectSelf = (state) => state;

const createSelectorValue = createSelector(selectSelf, (state) => state.value);
const draftSafeSelectorValue = createDraftSafeSelector(selectSelf, (state) => state.value);

//Handling Normal Value Correctly

let normalState = { value: 1 };
console.log('unsafeSelctor1', createSelectorValue(normalState));
console.log('draftSafeSelector1', draftSafeSelectorValue(normalState));

normalState.value = 2;
console.log('unsafeSelctor2', createSelectorValue(normalState));
console.log('draftSafeSelector2', draftSafeSelectorValue(normalState));

// Example of in case Immer - Draft Safe Selector

const immerCreateSelectorValue = createSelector(selectSelf, (state) => state.value);
const immerDraftSafeSelectorValue = createDraftSafeSelector(selectSelf, (state) => state.value);

produce({ value: 1 }, (state) => {
  console.log('immerCreateSelectorValue', immerCreateSelectorValue(state));
  console.log('immerDraftSafeSelectorValue', immerDraftSafeSelectorValue(state));

  state.value = 2;
  console.log('immerCreateSelectorValue', immerCreateSelectorValue(state));
  console.log('immerDraftSafeSelectorValue', immerDraftSafeSelectorValue(state));
});

// Explanation

// state.value = 2;
// modifies the existing object in place, adding or updating a property.

// state = { value: 2 };
// replaces the entire object referenced by state with a new object containing
// the specified property.

//logical explanation

//both createSelector and createDraftSafeSelector are used to create selectors that extract the value property from the state.
//However, the behavior observed is the same for both selectors, even though the state is updated in between.

// This occurs because both selectors are based on the selectSelf selector,
//which simply returns the state object itself. When using createSelector or createDraftSafeSelector,
//the memoized selector will only recompute its value if its input selectors produce new results.
//Since selectSelf always returns the same state object (the reference remains unchanged),
//the memoized selectors (createSelectorValue and draftSafeSelectorValue) do not recalculate their values,
//even when the value property of the state object changes.
