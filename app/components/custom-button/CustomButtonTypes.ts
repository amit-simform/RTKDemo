import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

/**
 * A type for the props of the header component.
 * @property {StyleProp<ViewStyle>} buttonContainer - Button container style.
 * @property {StyleProp<ViewStyle>} buttonStyle - Button style.
 * @property {StyleProp<ViewStyle>} disableStyle - Disable button style.
 * @property {boolean} disabled - A button disabled or not.
 * @property {boolean} isLoading - A button loader display or not.
 * @property {function} onPress - A button onPress function.
 * @property {string} buttonText - A text for button.
 * @property {ColorValue} loaderColor - A color for loader.
 */
export interface CustomButtonPropsType {
  buttonContainer: StyleProp<ViewStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  disableStyle: StyleProp<ViewStyle>;
  disabled: boolean;
  isLoading: boolean;
  onPress: () => void;
  buttonText: string;
  loaderColor: ColorValue;
}
