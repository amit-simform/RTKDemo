/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable require-jsdoc */

// With Immer
import { produce } from 'immer';

const initialState = {
  user: {
    name: 'John',
    age: 30,
    address: {
      city: 'New York',
      country: 'USA'
    }
  }
};

console.time('With Immer');
const withImmerReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'CHANGE_USER_NAME':
        draft.user.name = action.payload;
        break;
      case 'CHANGE_USER_AGE':
        draft.user.age = action.payload;
        break;
      case 'CHANGE_USER_ADDRESS':
        draft.user.address = { ...draft.user.address, ...action.payload };
        break;
      default:
        break;
    }
  });
};
console.timeEnd('With Immer');

// Without Immer
console.time('Without Immer');
const withoutImmerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_USER_NAME':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload
        }
      };
    case 'CHANGE_USER_AGE':
      return {
        ...state,
        user: {
          ...state.user,
          age: action.payload
        }
      };
    case 'CHANGE_USER_ADDRESS':
      return {
        ...state,
        user: {
          ...state.user,
          address: {
            ...state.user.address,
            ...action.payload
          }
        }
      };
    default:
      return state;
  }
};
console.timeEnd('Without Immer');

// calling the function
console.log('Initial State:', initialState);

// With Immer
console.time('With Immer Update');
const stateWithImmer = withImmerReducer(initialState, {
  type: 'CHANGE_USER_ADDRESS',
  payload: { city: 'Los Angeles' }
});
console.timeEnd('With Immer Update');
console.log('State with Immer:', stateWithImmer);

// Without Immer
console.time('Without Immer Update');
const stateWithoutImmer = withoutImmerReducer(initialState, {
  type: 'CHANGE_USER_ADDRESS',
  payload: { city: 'Los Angeles' }
});
console.timeEnd('Without Immer Update');
console.log('State without Immer:', stateWithoutImmer);
