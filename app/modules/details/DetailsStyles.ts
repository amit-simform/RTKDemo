/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';
import { Colors, type ThemeMode } from '../../theme';

/**
 * A StyleSheet object that contains all of the home screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the home screen styles.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    addButton: {
      backgroundColor: '#2ecc71'
    },
    asyncButton: {
      marginLeft: 8,
      position: 'relative'
    },
    asyncButtonAfter: {
      backgroundColor: 'rgba(52, 152, 219, 0.15)',
      height: '100%',
      left: 0,
      opacity: 0,
      position: 'absolute',
      top: 0,
      transition: 'width 1s linear, opacity 0.5s ease 1s',
      width: '100%'
    },
    button: {
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      borderColor: 'transparent',
      borderRadius: 8,
      borderWidth: 1,
      color: '#3498db',
      cursor: 'pointer',
      fontSize: 24,
      paddingBottom: 4,
      paddingLeft: 12,
      paddingRight: 12,
      transition: 'all 0.15s'
    },
    mainView: { flex: 1, justifyContent: 'center', marginHorizontal: 16 },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    textbox: {
      alignSelf: 'center',
      borderWidth: 1,
      fontSize: 30,
      padding: 15,
      textAlign: 'center',
      width: '50%'
    },
    value: {
      fontFamily: 'Courier New',
      fontSize: 56,
      marginTop: 2,
      paddingLeft: 16,
      paddingRight: 16
    }
  });

export default styles;
