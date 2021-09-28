import React from 'react';
import { Text, View } from 'react-native';
import { User } from '../../appTypes';

interface Props {
  user: User;
}

const UserCard = ({ user }: Props): JSX.Element => {
  return (
    <View
      style={{
        backgroundColor: 'grey',
        width: '90%',
        marginBottom: 10,
        padding: 10,
      }}
    >
      <View>
        <Text>{user.firstname}</Text>
      </View>
      <View>
        <Text>{user.lastname}</Text>
      </View>
    </View>
  );
};

export default UserCard;
