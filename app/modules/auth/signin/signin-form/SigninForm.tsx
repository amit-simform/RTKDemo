import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../../../components';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { AuthSelectors, useAppSelector } from '../../../../redux';
import { Colors } from '../../../../theme';
import styleSheet from './SigninFormStyles';
import { isRemainingToFillForm } from './SigninFormUtils';
import type { SigninFormPropsType } from './SigninFormTypes';

/**
 * The sign in form component.
 * @param {SigninFormPropsType} props - The props for the sign in form.
 * @returns A sign in form component.
 */
export default function SigninForm({
  handleSubmit,
  handleChange,
  values,
  errors
}: SigninFormPropsType): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const loading = useAppSelector<boolean>(AuthSelectors.getLoading);
  const inputPasswordRef: React.LegacyRef<TextInput> = React.createRef();
  const disabled: boolean = isRemainingToFillForm(values, errors);
  const fieldErrorEmail: string | undefined = values.email?.length ?? 0 ? errors.email : '';
  const fieldErrorPassword: string | undefined =
    values.password?.length ?? 0 ? errors.password : '';

  return (
    <View style={styles.formContainer}>
      <TextInput
        autoFocus
        returnKeyType="next"
        keyboardType="email-address"
        selectionColor={Colors[theme]?.white}
        placeholderTextColor={Colors[theme]?.white}
        underlineColorAndroid="transparent"
        placeholder={Strings.Auth.hintEmail}
        style={styles.textInput}
        onChangeText={handleChange('email')}
        onSubmitEditing={() => {
          inputPasswordRef.current?.focus();
        }}
      />
      <Text style={styles.errorMsg}>{fieldErrorEmail}</Text>
      <TextInput
        secureTextEntry
        ref={inputPasswordRef}
        returnKeyType="done"
        keyboardType="default"
        selectionColor={Colors[theme]?.white}
        placeholderTextColor={Colors[theme]?.white}
        underlineColorAndroid="transparent"
        placeholder={Strings.Auth.hintPassword}
        style={styles.textInput}
        onChangeText={handleChange('password')}
        onSubmitEditing={() => {
          handleSubmit();
        }}
      />
      <Text style={styles.errorMsg}>{fieldErrorPassword}</Text>
      <CustomButton
        buttonContainer={StyleSheet.flatten([styles.buttonContainer, styles.buttonTopMargin])}
        buttonStyle={StyleSheet.flatten([styles.spinnerButton, styles.button])}
        disableStyle={styles.disabledButton}
        loaderColor={Colors[theme]?.white}
        disabled={disabled}
        isLoading={loading}
        buttonText={Strings.Auth.btnSignIn}
        onPress={handleSubmit}
      />
    </View>
  );
}
