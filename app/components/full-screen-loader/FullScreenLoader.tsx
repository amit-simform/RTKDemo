import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './FullScreenLoaderStyles';

/**
 * It returns a View component with an ActivityIndicator component inside it
 */
const FullScreenLoader = (): React.ReactElement => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

export default FullScreenLoader;
