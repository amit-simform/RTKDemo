import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppConst, ROUTES } from '../constants';
import { useTheme } from '../hooks';
import { DetailsScreen, HomeScreen, SigninScreen } from '../modules';
import { Colors } from '../theme';
import { getLinkConfiguration, navigationRef } from '../utils';

/**
 * The type of the navigation prop for the RootStack.
 * @typedef {object} RootStackParamList is an object type with keys that are the route names
 * and values that are the route params
 * @property {undefined} [Home] - The Home screen.
 * @property {undefined} [Details] - The Details screen.
 * @property {undefined} [SignIn] - The SignIn screen.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RootStackParamList = {
  // add types for route params here e.g. -
  // [ROUTES.Profile]: { id: string };
  [ROUTES.Home]: undefined;
  [ROUTES.Details]: undefined;
  [ROUTES.SignIn]: undefined;
};

/**
 * Creating a stack navigator with the type of RootStackParamList.
 * @returns {StackNavigator} - The root stack navigator.
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * Initializes the React Navigation DevTools.
 * @returns None
 */
function InitializeReactNavigationDevTools(): void {
  const { useFlipper, useReduxDevToolsExtension } = require('@react-navigation/devtools');
  useFlipper(navigationRef);
  useReduxDevToolsExtension(navigationRef);
}

/**
 * The main App container.
 * @returns {React.ReactNode} The main App container.
 */
const AppContainer = () => {
  const { theme, isDark } = useTheme();
  if (AppConst.isDevelopment) {
    InitializeReactNavigationDevTools();
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={getLinkConfiguration()}
      theme={{
        dark: isDark,
        colors: {
          primary: Colors[theme]?.black,
          background: Colors[theme]?.white,
          card: Colors[theme]?.white,
          text: Colors[theme]?.black,
          border: Colors[theme]?.black,
          notification: Colors[theme]?.white
        }
      }}
    >
      <RootStack.Navigator>
        <RootStack.Screen name={ROUTES.Home} component={HomeScreen} />
        {/* <RootStack.Screen name={ROUTES.Details} component={DetailsScreen} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
