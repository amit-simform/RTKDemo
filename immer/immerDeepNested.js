/* eslint-disable no-restricted-syntax */

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
      },
      orders: [
        { id: 1, product: 'Phone', quantity: 1 },
        { id: 2, product: 'Laptop', quantity: 2 }
      ]
    },
    user2: {
      name: 'Alice',
      age: 25,
      address: {
        city: 'Los Angeles',
        country: 'USA'
      },
      orders: [{ id: 3, product: 'Tablet', quantity: 1 }]
    }
  }
};

console.time('With Immer');
const withImmerReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'ADD_ORDER':
        draft.users[action.payload.userId].orders.push(action.payload.order);
        break;
      case 'INCREMENT_ORDER_QUANTITY':
        draft.users[action.payload.userId].orders.forEach((order) => {
          if (order.id === action.payload.orderId) {
            order.quantity++;
          }
        });
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
    case 'ADD_ORDER':
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.userId]: {
            ...state.users[action.payload.userId],
            orders: [...state.users[action.payload.userId].orders, action.payload.order]
          }
        }
      };
    case 'INCREMENT_ORDER_QUANTITY':
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.userId]: {
            ...state.users[action.payload.userId],
            orders: state.users[action.payload.userId].orders.map((order) =>
              order.id === action.payload.orderId
                ? { ...order, quantity: order.quantity + 1 }
                : order
            )
          }
        }
      };
    default:
      return state;
  }
};
console.timeEnd('Without Immer');

// calliing function
console.log('Initial State:', initialState);

// With Immer
console.time('With Immer Update');
const stateWithImmer = withImmerReducer(initialState, {
  type: 'INCREMENT_ORDER_QUANTITY',
  payload: { userId: 'user1', orderId: 2 }
});
console.timeEnd('With Immer Update');
console.log('State with Immer:', stateWithImmer);

// Without Immer
console.time('Without Immer Update');
const stateWithoutImmer = withoutImmerReducer(initialState, {
  type: 'INCREMENT_ORDER_QUANTITY',
  payload: { userId: 'user1', orderId: 2 }
});
console.timeEnd('Without Immer Update');
console.log('State without Immer:', stateWithoutImmer);
