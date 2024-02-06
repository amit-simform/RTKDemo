import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native';
import { useHeaderHeight, useStatusBarHeight, useTheme } from '../../hooks';
import styleSheet from './CustomHeaderStyles';
import { defaultProps, type CustomHeaderPropsType } from './CustomHeaderTypes';

/**
 * The custom header component.
 * @param {HeaderPropsType} props - the props for the header component.
 * @returns {React.ReactElement} A React Element.
 */
export default function CustomHeader({
  customLeftView,
  customRightView,
  title,
  titleStyle,
  isBottomLine
}: Partial<CustomHeaderPropsType>): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const [widthLeft, setWidthLeft] = useState<number>(0);
  const [widthRight, setWidthRight] = useState<number>(0);
  const statusBarHeight: number = useStatusBarHeight();
  const headerHeight: number = useHeaderHeight();

  const handleLeftLayout = useCallback<(event: LayoutChangeEvent) => void>(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setWidthLeft(width);
    },
    []
  );

  const handleRightLayout = useCallback<(event: LayoutChangeEvent) => void>(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setWidthRight(width);
    },
    []
  );

  return (
    <View
      style={StyleSheet.flatten([
        isBottomLine && styles.bottomLine,
        { height: headerHeight },
        styles.container
      ])}
    >
      <View pointerEvents="none" style={{ height: statusBarHeight }} />
      <View pointerEvents="box-none" style={styles.subContainer}>
        <Text
          style={StyleSheet.flatten([
            styles.textTitle,
            titleStyle,
            { left: widthLeft, right: widthRight }
          ])}
        >
          {title}
        </Text>
        <View style={styles.rightAndLeftView} onLayout={handleLeftLayout}>
          {customLeftView && customLeftView}
        </View>
        <View style={styles.rightAndLeftView} onLayout={handleRightLayout}>
          {customRightView && customRightView}
        </View>
      </View>
    </View>
  );
}

CustomHeader.defaultProps = defaultProps;
