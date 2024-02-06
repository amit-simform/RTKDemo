/* eslint-disable no-restricted-syntax */
/* eslint-disable require-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */

// With Immer
import { createSelector, createDraftSafeSelector } from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState = {
  counter: 0
};

const withImmerReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'INCREMENT':
        draft.counter += 1;
        break;
      case 'DECREMENT':
        draft.counter -= 1;
        break;
      default:
        break;
    }
  });
};

const withImmerSelector = (state) => state.withImmerReducer;

const withImmerCounterSelector = createSelector(
  [withImmerSelector],
  (withImmerState) => withImmerState.counter
);

const withImmerDraftSafeSelector = createDraftSafeSelector(
  [withImmerSelector],
  (withImmerState) => withImmerState.counter
);

// Without Immer
const withoutImmerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

const withoutImmerSelector = (state) => state.withoutImmerReducer;

const withoutImmerCounterSelector = createSelector(
  [withoutImmerSelector],
  (withoutImmerState) => withoutImmerState.counter
);

const withoutImmerDraftSafeSelector = createDraftSafeSelector(
  [withoutImmerSelector],
  (withoutImmerState) => withoutImmerState.counter
);

// calling functions
const stateWithImmer = withImmerReducer(undefined, { type: 'INCREMENT' });
const stateWithoutImmer = withoutImmerReducer(undefined, { type: 'INCREMENT' });

console.log('State with Immer:', stateWithImmer);
console.log('State without Immer:', stateWithoutImmer);

console.log(
  'Counter with Immer Selector:',
  withImmerCounterSelector({ withImmerReducer: stateWithImmer })
);
console.log(
  'Counter without Immer Selector:',
  withoutImmerCounterSelector({ withoutImmerReducer: stateWithoutImmer })
);

console.log(
  'Draft Safe Counter with Immer Selector:',
  withImmerDraftSafeSelector({ withImmerReducer: stateWithImmer })
);
console.log(
  'Draft Safe Counter without Immer Selector:',
  withoutImmerDraftSafeSelector({ withoutImmerReducer: stateWithoutImmer })
);
