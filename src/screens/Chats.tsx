import React, { useEffect, useState } from 'react';
import { Button, Text, View, TouchableNativeFeedback } from 'react-native';
import { NavPropsHome } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';
import buttonStyles from '../styles/ButtonStyles';
import { useAppSelector } from '../store/hooks';
import { Colors } from '../utilities/colors';

const Chats = ({ navigation, route }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);

  return (
    <View
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      <View>
        <Text style={theme === 'dark' && screenStyles.text}>
          This is the Chats page
        </Text>
      </View>
    </View>
  );
};

export default Chats;
