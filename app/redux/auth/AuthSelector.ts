import { ErrorResponse, UserResponse } from '../../models';
import type { AuthStateType } from './AuthInitial';
import type { RootStateType } from '../Store';

/**
 * A type that contains all the selectors for the auth state.
 * @typedef {Object} AuthSelectorsType
 * @property {(state: RootStateType) => AuthStateType} getAuth - The selector for the auth state.
 * @property {(state: RootStateType) => boolean} getLoading - The selector for the loading state.
 * @property {(state: RootStateType) => UserResponse | undefined} getUser - The selector for the user.
 * @property {(state: RootStateType) => ErrorResponse | undefined} getError - The selector for the error.
 */
interface AuthSelectorsType {
  getAuth: (state: RootStateType) => AuthStateType;
  getLoading: (state: RootStateType) => boolean;
  getUser: (state: RootStateType) => UserResponse | undefined;
  getError: (state: RootStateType) => ErrorResponse | undefined;
}

/**
 * A type containing the selectors for the auth state.
 * @type {AuthSelectorsType}
 */
const AuthSelectors: AuthSelectorsType = {
  getAuth: (state: RootStateType): AuthStateType => state.auth,
  getLoading: (state: RootStateType): boolean => state.auth.isLoading,
  getUser: (state: RootStateType): UserResponse | undefined => state.auth.user,
  getError: (state: RootStateType): ErrorResponse | undefined => state.auth.error
};

export default AuthSelectors;
