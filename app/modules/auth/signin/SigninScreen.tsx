import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../hooks';
import { SigninForm } from './signin-form';
import styleSheet from './SigninStyles';
import useSignin from './useSignin';
import type { SigninHookReturnType } from './SigninTypes';

/**
 * The SigninScreen component. It renders a Formik form that renders a SigninForm component
 * @returns A ReactElement.
 */
export default function SigninScreen(): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const formik: SigninHookReturnType = useSignin();

  return (
    <View style={StyleSheet.flatten([styles.screen, styles.screenView])}>
      <SigninForm {...formik} />
    </View>
  );
}
