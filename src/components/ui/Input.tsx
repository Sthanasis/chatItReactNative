import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';
import { InputPropsType } from '../../appTypes';
import DatePicker from 'react-native-date-picker';
import { Colors } from '../../utilities/colors';
import { Picker } from '@react-native-picker/picker';
import { useTextColor } from '../../utilities/hooks';
import Button from './Button';

const Input = ({
  label,
  type,
  onChangeText,
  onChangeSelect,
  value,
  secureTextEntry,
  selectData,
  onChangeDate,
}: InputPropsType): JSX.Element => {
  const textColor = useTextColor();
  const [open, setOpen] = useState(false);

  if (type === 'select') {
    let inputStyles: ViewStyle = styles.input;
    if (Platform.OS === 'ios')
      inputStyles = {
        ...inputStyles,
        maxHeight: 80,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0)',
      };
    return (
      <View style={styles.inputContainer}>
        <View>
          <Text style={{ color: textColor }}>{label}</Text>
        </View>
        <View style={inputStyles}>
          <Picker
            itemStyle={Platform.OS === 'ios' ? { maxHeight: 80 } : {}}
            selectedValue={value}
            onValueChange={
              onChangeSelect !== undefined
                ? (itemValue) => onChangeSelect(itemValue as string)
                : () => {}
            }
            style={{ color: textColor }}
            dropdownIconColor={textColor}>
            {selectData?.map((item) => (
              <Picker.Item key={item} label={item} value={item} enabled />
            ))}
          </Picker>
        </View>
      </View>
    );
  }

  if (type === 'date') {
    return (
      <View style={styles.inputContainer}>
        <View>
          <Text style={{ color: textColor }}>{label}</Text>
        </View>
        <View
          style={{ ...styles.input, paddingHorizontal: 5, paddingVertical: 5 }}>
          <Button
            onPress={() => setOpen(true)}
            title={new Date(value).toDateString()}
          />
          <DatePicker
            modal
            open={open}
            date={new Date(value as Date)}
            onDateChange={onChangeDate as (date: Date) => void}
            onConfirm={(date) => {
              setOpen(false);
              if (onChangeDate) onChangeDate(date);
            }}
            mode="date"
            onCancel={() => setOpen(false)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.inputContainer}>
      <View>
        <Text style={{ color: textColor }}>{label}</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          onChangeText={onChangeText}
          value={value as string}
          style={{ color: textColor }}
          selectionColor={textColor}
          multiline={type === 'textarea'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.primary,
    borderRadius: 3,
    padding: 10,
  },
  inputContainer: {
    width: '80%',
    textAlign: 'left',
    marginBottom: 30,
  },
});

export default React.memo(Input);
