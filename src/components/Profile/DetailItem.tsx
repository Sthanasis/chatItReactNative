import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppTheme } from '../../appTypes';
import { Colors } from '../../utilities/colors';

interface Props {
  theme: AppTheme;
  iconName: string;
  info: string;
}

const Details = ({ theme, iconName, info }: Props) => {
  return (
    <View style={containerStyles.container}>
      <View style={containerStyles.iconContainer}>
        <Icon name={iconName} size={20} color={Colors.primary} />
      </View>

      <Text style={{ ...styles(theme).text }}>{info}</Text>
    </View>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 5,
    width: 35,
    alignItems: 'center',
  },
});

const styles = StyleSheet.create((theme?: AppTheme) => {
  return {
    text: {
      color: theme === 'dark' ? 'white' : 'black',
      fontSize: 13,
      fontWeight: 'bold',
    } as TextStyle,
  };
});

export default Details;
