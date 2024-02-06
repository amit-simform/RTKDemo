import { isEqual } from 'lodash';
import { useCallback, useMemo } from 'react';
import { useColorScheme, type ColorSchemeName } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import { MMKVKeys } from '../constants';
import { ThemeModeEnum, type ThemeMode } from '../theme';

/**
 * A theme hook that returns the current theme and whether it is dark.
 * @param {(theme: ThemeMode) => T} styleSheetFn? - A function that returns a style sheet for the theme.
 * @returns An object with the following properties:
 * - isDark: boolean - flag for whether the theme is dark or not.
 * - theme: ThemeMode - current theme mode.
 * - styles?: T - current theme mode based styles.
 * - changeTheme: (value: ThemeMode) => void - if do you want to need to change current theme mode.
 */
const useTheme = <T>(
  styleSheetFn?: (theme: ThemeMode, isDark?: boolean) => T
): {
  isDark: boolean;
  theme: ThemeMode;
  styles: T;
  changeTheme: (value: ThemeMode) => void;
} => {
  const theme: ColorSchemeName = useColorScheme();
  const [themeMode, setThemeMode] = useMMKVString(MMKVKeys.themeMode);
  const currentThemeMode = useMemo<ThemeMode>(
    () =>
      (isEqual(themeMode ?? ThemeModeEnum.system, ThemeModeEnum.system)
        ? theme ?? ThemeModeEnum.light
        : themeMode) as ThemeMode,
    [theme, themeMode]
  );
  const isDark = useMemo<boolean>(
    () => currentThemeMode === ThemeModeEnum.dark,
    [currentThemeMode]
  );
  const styles = useMemo<T>(
    () => (styleSheetFn?.(currentThemeMode, isDark) ?? {}) as T,
    [styleSheetFn, currentThemeMode, isDark]
  );
  const changeTheme = useCallback<(value: ThemeMode) => void>(
    (value: ThemeMode) => {
      setThemeMode(String(value));
    },
    [setThemeMode]
  );
  return { isDark, theme: currentThemeMode, styles, changeTheme };
};
export default useTheme;
