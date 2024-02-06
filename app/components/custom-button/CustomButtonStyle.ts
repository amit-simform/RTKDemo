import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  moderateScale,
  verticalScale,
  type ThemeMode
} from '../../theme';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} theme - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    },
    defaultButtonStyle: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.black,
      height: verticalScale(34),
      justifyContent: 'center',
      width: '100%'
    },
    defaultButtonText: {
      color: Colors[theme]?.white,
      fontSize: moderateScale(14)
    }
  });

export default styles;
