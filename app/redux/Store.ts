import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { AppConst } from '../constants';
import { reduxStorage } from '../services';
import { AuthReducer } from './auth';
import { CounterReducer } from './counter';
import { UserReducer } from './user';
/**
 * The Configuring persistConfig object for ReduxStorage.
 * @type {object}
 * @property {string} key - The key to use for persisting the state.
 * @property {number} version - The version of the state to persist.
 * @property {object} storage - The storage object to use for persisting the state.
 * @property {string[]} whitelist - The list of reducers to persist.
 * @property {string[]} blacklist - The list of reducers to not persist.
 */
const persistConfig = {
  key: '@RTKDemoToolkitCachePersist',
  version: 1,
  storage: reduxStorage,
  whitelist: ['auth'], // Whitelist (Save Specific Reducers)
  blacklist: ['nav', 'navigation'] // Blacklist (Don't Save Specific Reducers)
};

/**
 * Combining all the reducers into one reducer.
 * @returns {Object} The new reducers of the application.
 */
const rootReducer = combineReducers({
  auth: AuthReducer,
  users: UserReducer,
  counter: CounterReducer
});

/**
 * Creates a persisted reducer that can be used in a Redux store.
 * @param {PersistConfig} persistConfig - The configuration object for the persisted reducer.
 * @param {Reducer} rootReducer - The reducer to be persisted.
 * @returns {Reducer} - The persisted reducer.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareList: Array<any> = [];
if (AppConst.isDevelopment) {
  /* Adding the redux-flipper middleware to the middleware list. */
  const createDebugger = require('redux-flipper').default;
  middlewareList.push(createDebugger());
}
/* Creating a store with the persisted reducer. */
/**
 * Configure the redux store.
 * This is a function that takes in the default redux store and returns a new store.
 * It is used to configure the store with middleware and reducer.
 * The default store is configured with thunk, which allows for asynchronous actions.
 * The default store is configured with the serializableCheck middleware,
 * which allows for actions to be serialized and deserialized.
 */
const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false
    }).concat(middlewareList)
});

/**
 * Persists the store to local storage.
 * @param {Store} store - The redux store.
 * @returns None
 */
export const persistor = persistStore(store);
console.log(store.getState().users, 'usersinstore');

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;

// Enable persistence
export default store;
