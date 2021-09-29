import React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { ButtonPropsType } from '../../appTypes';
import ButtonStyles from '../../styles/ButtonStyles';

const Button = ({
  type,
  onPress,
  children,
  style,
  disabled,
  title,
}: ButtonPropsType): JSX.Element => {
  let buttonStyleBg = {};
  let buttonStyleText = {};
  if (type === 'regular') {
    buttonStyleBg = ButtonStyles.primary;
    buttonStyleText = ButtonStyles.primaryText;
  }
  if (type === 'icon') {
  }
  return (
    <View
      style={{
        ...buttonStyleBg,
        borderRadius: 5,
        overflow: 'hidden',
      }}
    >
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

export default Button;
