import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatchType, RootStateType } from './Store';

/**
 * It returns the dispatch function from the Redux store, but with a type that's specific to the app.
 * @returns {AppDispatchType} The dispatch function for the app.
 */
export const useAppDispatch = (): AppDispatchType => useDispatch<AppDispatchType>();

/**
 * It's a type assertion. It's saying that the `useSelector` function is of type
 * `TypedUseSelectorHook<RootStateType>`
 * @returns {TypedUseSelectorHook<RootStateType>} The current state of the application.
 */
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
