/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable require-jsdoc */

// With Immer
import { produce } from 'immer';

const initialState = {
  users: {
    user1: {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA'
      }
    },
    user2: {
      name: 'Alice',
      age: 25,
      address: {
        city: 'Los Angeles',
        country: 'USA'
      }
    }
  }
};

console.time('With Immer');
const withImmerReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'CHANGE_USER_ADDRESS':
        draft.users[action.payload.userId].address.city = action.payload.city;
        break;
      case 'INCREMENT_USER_AGE':
        draft.users[action.payload.userId].age++;
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
    case 'CHANGE_USER_ADDRESS':
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.userId]: {
            ...state.users[action.payload.userId],
            address: {
              ...state.users[action.payload.userId].address,
              city: action.payload.city
            }
          }
        }
      };
    case 'INCREMENT_USER_AGE':
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.userId]: {
            ...state.users[action.payload.userId],
            age: state.users[action.payload.userId].age + 1
          }
        }
      };
    default:
      return state;
  }
};
console.timeEnd('Without Immer');

// Example usage
console.log('Initial State:', initialState);

// With Immer
console.time('With Immer Update');
const stateWithImmer = withImmerReducer(initialState, {
  type: 'CHANGE_USER_ADDRESS',
  payload: { userId: 'user1', city: 'San Francisco' }
});
console.timeEnd('With Immer Update');
console.log('State with Immer:', stateWithImmer);

// Without Immer
console.time('Without Immer Update');
const stateWithoutImmer = withoutImmerReducer(initialState, {
  type: 'CHANGE_USER_ADDRESS',
  payload: { userId: 'user1', city: 'San Francisco' }
});
console.timeEnd('Without Immer Update');
console.log('State without Immer:', stateWithoutImmer);
