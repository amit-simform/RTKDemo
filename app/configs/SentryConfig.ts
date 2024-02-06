import * as Sentry from '@sentry/react-native';
import { isEmpty, isEqual } from 'lodash';
import { AppConst } from '../constants';
import { UserResponse } from '../models';

/**
 * Initializes the Sentry client with the Sentry URL, the environment, and whether or not we're in debug mode..
 * @param {string} dsn - The DSN for the Sentry server.
 * @param {string} environment - The environment of the application.
 * @param {boolean} debug - Whether or not to enable debug mode.
 * @returns None
 */
if (!isEmpty(AppConst.sentryUrl) && !isEqual(AppConst.sentryUrl, 'NA')) {
  Sentry.init({
    dsn: AppConst.sentryUrl,
    environment: AppConst.isDevelopment ? 'development' : 'production',
    debug: AppConst.isDevelopment
  });
}

/**
 * Captures a message to Sentry.
 * It takes in an event name, a request object, and an error object, and then it sends all of that data
 * to Sentry
 * @param {string} eventName - the name of the event to capture
 * @param {object | null} request - he request object that was sent
 * @param {object | null} error - The error object that was thrown
 * @returns None
 */
export function sentryCaptureMessage(
  eventName: string,
  request: object | null,
  error: object | null
): void {
  Sentry.withScope((scope) => {
    scope.setExtra(eventName, {
      Request: JSON.stringify(request ?? {}),
      Error: JSON.stringify(error ?? {})
    });
    Sentry.captureMessage(eventName);
  });
}

/**
 * Captures an exception in Sentry.
 * If we're in development mode, log the error to the console, otherwise send it to Sentry
 * @param {Error} error - the error to capture
 * @returns None
 */
export function sentryCaptureException(error: Error): void {
  if (AppConst.isDevelopment) {
    // eslint-disable-next-line no-restricted-syntax
    console.log(error);
  } else {
    Sentry.captureException(error);
  }
}

/**
 * Sets the user information for Sentry.
 * @param {UserResponse} user - the user information to set for Sentry.
 * @returns None
 */
export function loginSentry(user: UserResponse): void {
  Sentry.setUser({
    id: String(user.id),
    displayName: user.displayName,
    realName: user.displayName,
    email: user.email,
    phone: user.phone
  });
}
