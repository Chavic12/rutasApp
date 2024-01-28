import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface Props {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  rules?: any;
}

export const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}: Props) => {
  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <>
          <View
            style={[styles.container, {borderColor: error ? 'red' : 'red'}]}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {/* Que aparezca un error debajo del input  con estilos con color rojo  */}
          {error && <Text style={styles.error}>{error.message}</Text>}
          
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 22,
    borderColor: 'red',
  },
  input: {
    flex: 1,
    paddingLeft: 22,
  },
  // Dame el diseno1 de error que aparezaa
  error: {
    color: 'red',
  },
});
