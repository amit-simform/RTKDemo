import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
  type ThemeMode
} from '../../../../theme';

/**
 * A StyleSheet object that contains all of the sign in form styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the sign in form styles.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    button: {
      backgroundColor: Colors[theme]?.secondary
    },
    buttonText: {
      color: Colors[theme]?.white
    },
    disabledButton: {
      backgroundColor: Colors[theme]?.gray
    },
    errorMsg: {
      color: Colors[theme]?.red,
      fontSize: moderateScale(14),
      marginBottom: verticalScale(20)
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: horizontalScale(20),
      paddingTop: verticalScale(50)
    },
    textInput: {
      backgroundColor: Colors[theme]?.black,
      borderRadius: horizontalScale(5),
      color: Colors[theme]?.white,
      fontSize: moderateScale(16),
      paddingHorizontal: horizontalScale(10),
      paddingVertical: verticalScale(10)
    }
  });

export default styles;
