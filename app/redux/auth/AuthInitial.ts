import { ErrorResponse, UserResponse } from '../../models';

/**
 * The state of the authentication process.
 * @typedef {Object} AuthStateType
 * @property {UserResponse | undefined} user - The user object if the user is authenticated.
 * @property {boolean} isLoading - Whether the authentication process is in progress.
 * @property {ErrorResponse | undefined} error - The error object if there was an error.
 */
export interface AuthStateType {
  user?: UserResponse;
  isLoading: boolean;
  error?: ErrorResponse;
}

/**
 * Defining the initial state of the auth reducer.
 * @returns {AuthStateType} The initial state of the auth reducer.
 */
const INITIAL_STATE: AuthStateType = {
  user: undefined,
  isLoading: false,
  error: undefined
};

export default INITIAL_STATE;
