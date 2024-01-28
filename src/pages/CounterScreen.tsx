import React from 'react';
import {useAppSelector} from '../hooks/hooks';
import {Text, View} from 'react-native';

export const CounterScreen = () => {
  const counter = useAppSelector(state => state.counter.value);
  return (
    <View style={{alignItems:'center'}}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Counter</Text>
      <Text style={{fontSize: 80, color:'green',textAlign: 'center'}}>{counter}</Text>
    </View>
  );
};
