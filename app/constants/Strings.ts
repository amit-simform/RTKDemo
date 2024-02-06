import { I18n } from '../translations';

/**
 * An object that contains all of the possible error messages that can be returned by the API.
 * @readonly
 * @enum {string}
 */
const APIError: Record<string, string> = Object.freeze({
  somethingWentWrong: I18n.t('apiError:somethingWentWrong'),
  networkError: I18n.t('apiError:networkError'),
  serverError: I18n.t('apiError:serverError'),
  timeoutError: I18n.t('apiError:timeoutError'),
  clientError: I18n.t('apiError:clientError'),
  cancelError: I18n.t('apiError:cancelError'),
  connectionError: I18n.t('apiError:connectionError'),
  unexpectedError: I18n.t('apiError:unexpectedError'),
  cancelSagaError: I18n.t('apiError:cancelSagaError')
});

/**
 * A collection of error messages for the Yup validation schema.
 * @type {Object}
 */
const YupError: Record<string, string> = Object.freeze({
  requireEmailError: I18n.t('yupError:requireEmailError'),
  invalidEmailError: I18n.t('yupError:invalidEmailError'),
  requirePasswordError: I18n.t('yupError:requirePasswordError'),
  lengthPasswordError: I18n.t('yupError:lengthPasswordError'),
  lowercasePasswordError: I18n.t('yupError:lowercasePasswordError'),
  uppercasePasswordError: I18n.t('yupError:uppercasePasswordError'),
  specialPasswordError: I18n.t('yupError:specialPasswordError'),
  digitPasswordError: I18n.t('yupError:digitPasswordError')
});

const Home: Record<string, string> = Object.freeze({
  homeScreenTitle: I18n.t('home:title'),
  details: I18n.t('home:details'),
  signIn: I18n.t('home:signIn'),
  lightTheme: I18n.t('home:lightTheme'),
  darkTheme: I18n.t('home:darkTheme')
});

const Details: Record<string, string> = Object.freeze({
  detailsScreenTitle: I18n.t('details:title')
});

const Auth: Record<string, string> = Object.freeze({
  hintEmail: I18n.t('auth:hintEmail'),
  hintPassword: I18n.t('auth:hintPassword'),
  btnSignIn: I18n.t('auth:btnSignIn')
});

/**
 * Exporting all the strings in one object..
 * Separate string object like Home, Details & Auth etc...
 * base on your modules dir structure
 * @type {Object.<string, Record<string, string>>}
 */
export default Object.freeze({
  APIError,
  YupError,
  Home,
  Details,
  Auth
});
