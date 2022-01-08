import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { User } from '../../appTypes';
import { Colors } from '../../utilities/colors';

interface Props {
  user: User;
  theme: 'dark' | 'light';
  onUserCardPress: () => void;
}

const UserCard = ({ user, theme, onUserCardPress }: Props): JSX.Element => {
  return (
    <TouchableOpacity onPress={onUserCardPress}>
      <View style={styles(theme).card}>
        <View>
          <Text>{user.firstname}</Text>
        </View>
        <View>
          <Text>{user.lastname}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme: 'dark' | 'light') => {
  return {
    card: {
      backgroundColor: theme === 'dark' ? 'white' : Colors.light,
      width: '90%',
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
  };
});

export default UserCard;
