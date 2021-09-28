import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { InputPropsType } from '../../appTypes';

const Input = ({
  label,
  type,
  onChangeText,
  value,
  secureTextEntry,
}: InputPropsType): JSX.Element => {
  return (
    <View style={styles.inputContainer}>
      <View>
        <Text>{label}</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  inputContainer: {
    width: '80%',
    textAlign: 'left',
    marginBottom: 30,
  },
});

export default Input;
