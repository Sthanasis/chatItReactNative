import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { ButtonPropsType } from '../../appTypes';
import { useAppSelector } from '../../store/hooks';
import ButtonStyles from '../../styles/ButtonStyles';

const Button = ({
  type,
  onPress,
  children,
  style,
  disabled,
  title,
}: ButtonPropsType): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);

  let buttonStyleBg = {};
  let buttonStyleText = {};

  if (type === 'regular') {
    if (theme === 'dark') {
      buttonStyleBg = ButtonStyles.secondary;
      buttonStyleText = ButtonStyles.darkText;
    } else {
      buttonStyleBg = ButtonStyles.primary;
      buttonStyleText = ButtonStyles.ligthText;
    }
  }

  if (type === 'transparent') {
    if (theme === 'dark') {
      buttonStyleText = ButtonStyles.secondaryText;
    } else {
      buttonStyleText = ButtonStyles.primaryText;
    }
  }

  return (
    <View
      style={{
        ...styles.button,
        ...buttonStyleBg,
        ...style,
      }}>
      <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
        {children ? (
          children
        ) : (
          <View style={{ ...ButtonStyles.button }}>
            <Text style={{ ...buttonStyleText }}>{title}</Text>
          </View>
        )}
      </TouchableNativeFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    overflow: 'hidden',
  },
});
export default React.memo(Button);
