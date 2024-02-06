/* eslint-disable require-jsdoc */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../hooks';
import {
  decrement,
  incrementAsync,
  selectCount,
  manualIncrement
} from '../../redux/counter/CounterSlice';
import styleSheet from './DetailsStyles';

/**
 * A functional component that renders the Counter screen.
 * @returns {React.ReactElement} A function component that returns a component element.
 */

const Counter: React.FC = () => {
  const { styles } = useTheme(styleSheet);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState<string>('2');

  return (
    <View style={{ marginHorizontal: 16 }}>
      <View style={styles.row}>
        <Button
          title="+"
          accessibilityLabel="Increment value"
          onPress={() => dispatch(manualIncrement(1))}
        />
        <Text style={styles.value}>{count}</Text>
        <Button
          title="-"
          accessibilityLabel="Decrement value"
          onPress={() => dispatch(decrement())}
        />
      </View>

      <TextInput
        style={styles.textbox}
        value={incrementAmount}
        keyboardType="numeric"
        placeholder="Set increment amount"
        onChangeText={(text) => setIncrementAmount(text)}
      />
      <View style={styles.row}>
        <Button
          title="Add Amount"
          // style={styles.button}
          onPress={() => dispatch(manualIncrement(Number(incrementAmount) || 0))}
        />
        <Button
          title="Add Async"
          // style={styles.asyncButton}
          onPress={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        />
      </View>
    </View>
  );
};

export default Counter;
