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
    container: {
      backgroundColor: '#f0f0f0',
      flex: 1,
      padding: 16
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16
    },
    itemView: { flexDirection: 'row' },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4
    },
    text: {
      fontSize: 16,
      marginBottom: 8,
      marginHorizontal: 10
    },
    userContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 4,
      marginBottom: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4
    }
  });

export default styles;
