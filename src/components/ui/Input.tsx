import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
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
  hasBorder = true,
  onChangeDate,
}: InputPropsType): JSX.Element => {
  const textColor = useTextColor();
  const [open, setOpen] = useState(false);
  if (type === 'select') {
    return (
      <View style={styles.inputContainer}>
        <View>
          <Text style={{ color: textColor }}>{label}</Text>
        </View>
        <View style={styles.input}>
          <Picker
            selectedValue={value}
            onValueChange={
              onChangeSelect !== undefined
                ? (itemValue, itemIndex) => onChangeSelect(itemValue as string)
                : () => {}
            }
            style={{ color: textColor }}
            dropdownIconColor={textColor}
          >
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
          style={{ ...styles.input, paddingHorizontal: 5, paddingVertical: 5 }}
        >
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
      <View style={{ ...styles.input, paddingHorizontal: 10 }}>
        <TextInput
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          onChangeText={onChangeText}
          value={value as string}
          style={{ color: textColor }}
          selectionColor={textColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  inputContainer: {
    width: '80%',
    textAlign: 'left',
    marginBottom: 30,
  },
});

export default React.memo(Input);
