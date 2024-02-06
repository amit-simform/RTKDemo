import { filter, has, isEmpty } from 'lodash';
import { sentryCaptureException } from '../configs';
import { DeepLink, deepLinkPrefixes } from '../constants';

/**
 * If the route name is not a meeting or a sign in with email link, then it's a toast message.
 * @param {DeepLink} routeName - DeepLink
 * @param {Record<string, any>} _params - Record<string, any>
 * @returns A boolean
 */
function isToastMessage(routeName: DeepLink | undefined, _params: Record<string, any>): boolean {
  const isMagicLink: boolean = routeName === DeepLink.MagicLink;
  const isForgotPassword: boolean = routeName === DeepLink.ForgotPassword;
  return !isMagicLink && !isForgotPassword;
}

/**
 * If the route name or params match the type, return true.
 * @param {DeepLink | undefined} routeName - The route name of the current screen.
 * @param {Record<string, any>} params - Record<string, any>
 * @param {DeepLink} type - The type of deep link you want to check for.
 * @param {boolean} onlyToast - boolean
 * @returns A boolean
 */
export function isDeepLinkType(
  routeName: DeepLink | undefined,
  params: Record<string, any>,
  type: DeepLink,
  onlyToast: boolean = false
): boolean {
  if (onlyToast) {
    return isToastMessage(routeName, params);
  }
  const isMatchRoute: boolean = routeName === type;
  const isMatchParams: boolean = has(params, type);
  return isMatchRoute || isMatchParams;
}

/**
 * If the routeName is DeepLink.MEETING, then return a deep link with the id and params.u, otherwise if
 * the routeName is DeepLink.SIGN_IN_WITH_EMAIL_LINK, then return a deep link with the params.apiKey,
 * params.lang, params.mode, and params.oobCode, otherwise return undefined.
 * @param {string} url - The url that you want to convert to a deep link.
 * @param {DeepLink | undefined} routeName - The name of the route you want to navigate to.
 * @param {Record<string, any>} params - Record<string, any>
 * @returns A string or undefined
 */
function convertUrlToDeepLink(
  url: string,
  routeName: DeepLink | undefined,
  params: Record<string, any>
): string | undefined {
  if (isDeepLinkType(routeName, params, DeepLink.MagicLink)) {
    return `rtkdemo://auth/signIn/${encodeURIComponent(url)}/${params?.tenantId}/${params?.email}`;
  } else if (isDeepLinkType(routeName, params, DeepLink.ForgotPassword)) {
    return `rtkdemo://auth/createNewPassword/${params?.oobCode}/${params?.tenantId}/${params?.email}`;
  }
  return undefined;
}

export interface CheckAndGetParamsReturnType {
  routeName?: DeepLink;
  params: Record<string, any>;
  deepLink?: string;
  branchUrl: string;
}

/**
 * It takes a URL and returns an object with the URL's parameters as key-value pairs
 * @returns An object with the key value pairs of the url parameters.
 */
function getUrlParams(branchUrl: string): Record<string, string> {
  let newParams: Record<string, string> = {};
  try {
    let params: Record<string, string> = {};
    let regex: RegExp = /[?&]([^=#]+)=([^&#]*)/g;
    let match;
    while ((match = regex.exec(branchUrl))) {
      params[match[1]] = decodeURIComponent(match[2]);
    }
    let keyIndex: number = 0;
    const keyList: string[] = Object.keys(params);
    while (keyIndex < keyList.length) {
      const keyName: string = keyList[keyIndex];
      const keyValue: string = params[keyName];

      let match1;
      while ((match1 = regex.exec(keyValue))) {
        newParams[match1[1]] = match1[2];
      }
      newParams[keyName] = params[keyName];
      keyIndex++;
    }
  } catch (e) {}
  return newParams;
}

/**
 * It takes a url, parses it, and returns an object with the route name, id, and params
 * @param {string} nonBranchUrl - The url that was passed to the app.
 * @returns An object with the following properties:
 * routeName: DeepLink
 * params: Record<string, any>
 * deepLink: string
 * branchUrl: string
 */
export function checkAndGetParams(nonBranchUrl: string): CheckAndGetParamsReturnType | undefined {
  const branchUrl: string = decodeURIComponent(nonBranchUrl);
  // if the url has no params, return just open the app
  if (filter(deepLinkPrefixes, (domain: string) => branchUrl === domain).length > 0)
    return undefined;

  try {
    const newParams: Record<string, string> = getUrlParams(branchUrl);

    let routeName: DeepLink = DeepLink.ToastMessage;
    // if there is a url in params save it for later
    if (newParams.continueUrl && !isEmpty(newParams.continueUrl)) {
      const routeArray: string[] = newParams.continueUrl
        .substring(0, newParams.continueUrl.indexOf('?'))
        .split('/');
      routeName = routeArray[routeArray.length - 1] as DeepLink;
    }
    const deepLink: string | undefined = convertUrlToDeepLink(nonBranchUrl, routeName, newParams);
    return { routeName, params: newParams, deepLink, branchUrl };
  } catch (error: any) {
    sentryCaptureException(error);
  }
  return undefined;
}
