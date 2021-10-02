import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { InputPropsType } from '../../appTypes';
import { useAppSelector } from '../../store/hooks';
import { Colors } from '../../utilities/colors';
import { Picker } from '@react-native-picker/picker';

const Input = ({
  label,
  type,
  onChangeText,
  onChangeSelect,
  value,
  secureTextEntry,
  selectData,
}: InputPropsType): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  let color = '';

  if (theme === 'dark') {
    color = Colors.secondary;
  } else {
    color = Colors.primary;
  }

  if (type === 'select') {
    return (
      <View style={styles.inputContainer}>
        <View>
          <Text
            style={{ color: theme === 'dark' ? Colors.light : Colors.dark }}
          >
            {label}
          </Text>
        </View>
        <View style={{ ...styles.input, borderBottomColor: color }}>
          <Picker
            selectedValue={value}
            onValueChange={
              onChangeSelect !== undefined
                ? (itemValue, itemIndex) => onChangeSelect(itemValue)
                : () => {}
            }
          >
            {selectData?.map((item) => (
              <Picker.Item key={item} label={item} value={item} enabled />
            ))}
          </Picker>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.inputContainer}>
      <View>
        <Text style={{ color: theme === 'dark' ? Colors.light : Colors.dark }}>
          {label}
        </Text>
      </View>
      <View style={{ ...styles.input, borderBottomColor: color }}>
        <TextInput
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          onChangeText={onChangeText}
          value={value}
          style={{ color: color }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
  },
  inputContainer: {
    width: '80%',
    textAlign: 'left',
    marginBottom: 30,
  },
});

export default React.memo(Input);
