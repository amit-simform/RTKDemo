/* eslint-disable require-jsdoc */

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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
    <View style={styles.mainView}>
      <View style={styles.row}>
        <Button
          title="-"
          accessibilityLabel="Decrement value"
          onPress={() => dispatch(decrement())}
        />
        <Text style={styles.value}>{count}</Text>
        <Button
          title="+"
          accessibilityLabel="Increment value"
          onPress={() => dispatch(manualIncrement(1))}
        />
      </View>

      <TextInput
        style={styles.textbox}
        value={incrementAmount}
        keyboardType="numeric"
        placeholder="Set Amount"
        onChangeText={(text) => setIncrementAmount(text)}
      />
      <View style={styles.row}>
        <Button
          title="Add Amount"
          onPress={() => dispatch(manualIncrement(Number(incrementAmount) || 0))}
        />
        <Button
          title="Add Default"
          onPress={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        />
      </View>
    </View>
  );
};

export default Counter;
