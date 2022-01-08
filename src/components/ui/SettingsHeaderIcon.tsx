/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavPropsHome } from '../../appTypes';

interface Props {
  navigation: NavPropsHome['navigation'];
  color: string;
}

const SettingsHeaderIcon = ({ navigation, color }: Props) => {
  return (
    <TouchableNativeFeedback onPress={() => navigation.navigate('Settings')}>
      <View
        style={{
          height: '100%',
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}>
        <Icon name="gear" color={color} size={26} />
      </View>
    </TouchableNativeFeedback>
  );
};

export default SettingsHeaderIcon;
