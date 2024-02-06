import { createNavigationContainerRef } from '@react-navigation/core';
import { CommonActions, DrawerActions, StackActions, TabActions } from '@react-navigation/routers';
import { isEmpty } from 'lodash';
import { Linking } from 'react-native';
import { DeepLink, ROUTES, deepLinkPrefixes } from '../constants';
import {
  checkAndGetParams,
  isDeepLinkType,
  type CheckAndGetParamsReturnType
} from './DeepLinkUtils';
import type { LinkingOptions } from '@react-navigation/native';

/**
 * Creates a ref that can be used to navigate to a new screen.
 * @returns {React.RefObject<NavigationContainerRef>} - A ref that can be used to navigate to a new screen.
 */
export const navigationRef = createNavigationContainerRef();

/**
 * Checks if the navigation is not ready, wait 50 milliseconds and try again, otherwise call the callback
 * function.
 * @param {() => void} moveCallback - This is the function that will be called when the navigation is
 * ready.
 * @returns None
 */
function navigationCheck(moveCallback: () => void): void {
  if (!navigationRef.isReady()) {
    setTimeout(() => navigationCheck(moveCallback), 50);
  } else {
    moveCallback?.();
  }
}

/**
 * It pops the current screen from the navigation stack
 * @param {number} [screenCount=0] - the number of screens to pop.
 * @param {boolean} [isPopToTop=false] - If true, the navigation stack will be popped to the top.
 * @returns None
 */
export function navigatePop(screenCount: number = 0, isPopToTop: boolean = false): void {
  navigationCheck(() => {
    const popAction = isPopToTop ? StackActions.popToTop() : StackActions.pop(screenCount);
    navigationRef.dispatch(popAction);
  });
}

/**
 * Navigates back one screen in the navigation history.
 * @returns None
 */
export function navigateBack(): void {
  navigationCheck(() => {
    const backAction = CommonActions.goBack();
    navigationRef.dispatch(backAction);
  });
}

/**
 * It will replace the current screen with the screen you want to navigate to
 * @param {string} routeName - The name of the route to navigate to.
 * @param {object} [params={}] - This is an object that contains the parameters you want to pass to the next screen.
 * @returns None
 */
export function navigateWithReplace(routeName: string, params: object = {}): void {
  navigationCheck(() => {
    const replaceAction = StackActions.replace(routeName, params);
    navigationRef.dispatch(replaceAction);
  });
}

/**
 * Navigates to the given routeName with the given params.
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is the object that contains the parameters that you want to pass to the next
 * screen
 * @param {boolean} [merge=false] - whether or not to merge the params with the existing params
 * @returns None
 */
export function navigateWithParam(
  routeName: string,
  params: object = {},
  merge: boolean = false
): void {
  navigationCheck(() => {
    const navigateAction = CommonActions.navigate({
      name: routeName,
      params,
      merge
    });
    navigationRef.dispatch(navigateAction);
  });
}

/**
 * It navigates to a screen in a stack, and passes parameters to that screen
 * @param {string} stackName - The name of the stack you want to navigate to.
 * @param {string} routeName - The name of the route to navigate to.
 * @param params - {
 * @param {boolean} [merge=false] - boolean = false
 */
export function navigateStackWithParam(
  stackName: string,
  routeName: string,
  params = {},
  merge: boolean = false
): void {
  navigationCheck(() => {
    const resetAction = CommonActions.navigate({
      name: stackName,
      params: {
        screen: routeName,
        params,
        merge
      }
    });
    navigationRef.dispatch(resetAction);
  });
}

/**
 * Navigate to a new route with a push action.
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is an object that contains the parameters you want to pass to the next screen
 * @returns None
 */
export function navigateWithPush(routeName: string, params: object = {}): void {
  navigationCheck(() => {
    const pushAction = StackActions.push(routeName, params);
    navigationRef.dispatch(pushAction);
  });
}

/**
 * It resets the navigation stack to the given routeName with the given params.
 * @param {string} stackName - The name of the stack you want to navigate to
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is an object that contains the parameters that you want to pass to the next
 * screen.
 * @returns None
 */
export function navigateWithReset(stackName: string, routeName: string, params: object = {}): void {
  navigationCheck(() => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: stackName,
          state: { routes: [{ name: routeName, params }] }
        }
      ]
    });
    navigationRef.dispatch(resetAction);
  });
}

/**
 * Opens the drawer.
 * @returns None
 */
export function navigateOpenDrawer(): void {
  navigationCheck(() => {
    const openAction = DrawerActions.openDrawer();
    navigationRef.dispatch(openAction);
  });
}

/**
 * Closes the drawer if it is open.
 * @returns None
 */
export function navigateCloseDrawer(): void {
  navigationCheck(() => {
    const closeAction = DrawerActions.closeDrawer();
    navigationRef.dispatch(closeAction);
  });
}

/**
 * Toggles the drawer on the left side of the screen.
 * @returns None
 */
export function navigateToggleDrawer(): void {
  navigationCheck(() => {
    const toggleAction = DrawerActions.toggleDrawer();
    navigationRef.dispatch(toggleAction);
  });
}

/**
 * Navigates to the given route in the drawer.
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - the params to pass to the route
 * @returns None
 */
export function navigateJumpToDrawer(routeName: string, params: object = {}): void {
  navigationCheck(() => {
    const jumpToAction = DrawerActions.jumpTo(routeName, params);
    navigationRef.dispatch(jumpToAction);
  });
}

/**
 * Navigates to the given tab.
 * @param {string} routeName - the name of the tab to navigate to
 * @param {object} [params={}] - the params to pass to the tab
 * @returns None
 */
export function navigateJumpToTab(routeName: string, params: object = {}): void {
  navigationCheck(() => {
    const jumpToAction = TabActions.jumpTo(routeName, params);
    navigationRef.dispatch(jumpToAction);
  });
}

/**
 * It checks if the url is a deep link, and if it is, it checks if it's a toast message, and if it is,
 * it shows the toast message, and if it's not, it returns the deep link
 * @param {string} nonBranchUrl - The url that was passed to the app.
 * @returns a string or undefined.
 */
function handleUrlLink(nonBranchUrl: string): string | undefined {
  const details: CheckAndGetParamsReturnType | undefined = checkAndGetParams(nonBranchUrl);
  if (details !== undefined) {
    const isToastMessage = isDeepLinkType(
      details.routeName,
      details.params,
      DeepLink.ToastMessage,
      true
    );
    if (
      isDeepLinkType(details.routeName, details.params, DeepLink.ToastMessage) &&
      !isEmpty(details.params.toastMessage)
    ) {
      // Here add your notification message component
      //ToastHolder.toastMessage(ToastType.custom, decodeURIComponent(details.params.toastMessage));
    }

    if (!isToastMessage) {
      return details.deepLink;
    }
  }
  return undefined;
}

/**
 * It returns a deep linking configuration object that tells the app how to handle deep links
 * @returns A function that returns an object.
 */
export function getLinkConfiguration(): LinkingOptions<ReactNavigation.RootParamList> | undefined {
  const linking = {
    enabled: true,
    prefixes: deepLinkPrefixes,

    /**
     * Custom function to get the URL which was used to open the app
     */
    async getInitialURL() {
      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();
      return url && !isEmpty(url) ? handleUrlLink(url) : url;
    },

    subscribe: (listener: (url: string) => void) => {
      /**
       * It takes an object with a url property and returns a function that takes a url and calls the
       * listener function with the url.
       * @param  - `url` - The URL that was received.
       */
      const onReceiveURL = ({ url }: { url: string }) => {
        listener((url && !isEmpty(url) ? handleUrlLink(url) : url) ?? '');
      };

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
      return () => {
        // Clean up the event listeners
        linkingSubscription.remove();
      };
    },

    config: {
      // Deep link configuration
      screens: {
        [ROUTES.Home]: {
          path: 'home'
        },
        [ROUTES.SignIn]: {
          path: 'signIn'
        },
        [ROUTES.Details]: {
          path: 'details'
        },
        // Used as catch-all - there is a "Home" in signed-in and signed-out stacks!
        [ROUTES.NotFound]: '*'
        // Below a sample of deep link configuration
        /*[ROUTES.Launch]: {
          path: 'launch',
          initialRouteName: ROUTES.Welcome,
          screens: {
            [ROUTES.Welcome]: 'welcome'
          }
        },
        [ROUTES.Auth]: {
          path: 'auth',
          initialRouteName: ROUTES.SignIn,
          screens: {
            [ROUTES.SignIn]: 'signIn/:link?/:tenantId?/:email?',
            [ROUTES.ForgotPassword]: 'forgotPassword',
            [ROUTES.OpenEmail]: 'openEmail',
            [ROUTES.CreateNewPassword]: 'createNewPassword/:code?/:tenantId?/:email?'
          }
        },
        [ROUTES.Home]: {
          path: 'home',
          initialRouteName: ROUTES.Dashboard,
          screens: {
            [ROUTES.Dashboard]: {
              path: 'dashboard',
              initialRouteName: ROUTES.BrowseBottomTab,
              screens: {
                [ROUTES.BrowseBottomTab]: 'browseBottomTab',
                [ROUTES.StatusBottomTab]: {
                  path: 'statusBottomTab',
                  initialRouteName: ROUTES.AllTopTab,
                  screens: {
                    [ROUTES.AllTopTab]: 'allTopTab',
                    [ROUTES.ReceivedTopTab]: 'receivedTopTab'
                  }
                },
                [ROUTES.CartBottomTab]: 'cartBottomTab',
                [ROUTES.TemplateBottomTab]: 'templateBottomTab',
                [ROUTES.SettingBottomTab]: 'settingBottomTab'
              }
            },
            [ROUTES.OrderDetail]: 'orderDetail',
            [ROUTES.OrderItemIssue]: 'orderItemIssue',
            [ROUTES.TemplateDetail]: 'templateDetail',
            [ROUTES.CreateTemplate]: 'createTemplate',
            [ROUTES.CreateTemplateName]: 'createTemplateName'
          }
        },
        [ROUTES.Setting]: {
          path: 'setting',
          initialRouteName: ROUTES.Webview,
          screens: {
            [ROUTES.Webview]: 'webview',
            [ROUTES.ChangePassword]: 'changePassword',
            [ROUTES.Profile]: 'profile'
          }
        }*/
      }
    }
  };

  return linking;
}
