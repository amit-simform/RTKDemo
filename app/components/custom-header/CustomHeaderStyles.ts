import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, moderateScale, type ThemeMode } from '../../theme';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} theme - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      backgroundColor: Colors[theme]?.white,
      width: '100%'
    },
    rightAndLeftView: {
      flexDirection: 'row'
    },
    subContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textTitle: {
      color: Colors[theme]?.black,
      fontSize: moderateScale(16),
      left: 0,
      position: 'absolute',
      right: 0,
      textAlign: 'center'
    }
  });

export default styles;
