import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import customButtonStyle from './CustomButtonStyle';
import type { CustomButtonPropsType } from './CustomButtonTypes';

/**
 * The custom button component.
 * @param {CustomButtonPropsType} props - the props for the button component.
 * @returns {React.ReactElement} A React Element.
 */
const CustomButton = ({
  buttonContainer,
  buttonStyle,
  disableStyle,
  disabled,
  isLoading,
  onPress,
  buttonText,
  loaderColor
}: Partial<CustomButtonPropsType>): React.ReactElement => {
  const { styles } = useTheme(customButtonStyle);
  return (
    <View style={StyleSheet.flatten([styles.container, buttonContainer])}>
      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.defaultButtonStyle,
          buttonStyle,
          disabled && disableStyle
        ])}
        disabled={disabled}
        activeOpacity={0.6}
        onPress={onPress}
      >
        {isLoading ? (
          <ActivityIndicator color={loaderColor} />
        ) : (
          <Text style={styles.defaultButtonText}>{buttonText}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
