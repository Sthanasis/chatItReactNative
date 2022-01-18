/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { UserDBSchema } from '../../appTypes';
import { appUrl } from '../../utilities/api';
import { Colors } from '../../utilities/colors';

interface Props {
  user: UserDBSchema;
  theme: 'dark' | 'light';
  onUserCardPress: () => void;
}

const FONT_SIZE = 18;

const UserCard = ({ user, theme, onUserCardPress }: Props): JSX.Element => {
  const color = theme === 'dark' ? Colors.light : Colors.dark;

  return (
    <TouchableOpacity onPress={onUserCardPress}>
      <View style={{ ...styles.card }}>
        <View>
          <Icon
            name="dot-single"
            size={FONT_SIZE * 2}
            style={{ color: user.active ? 'green' : 'grey' }}
          />
        </View>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: `${appUrl}${user.imageUrl}?time=${new Date()}`,
            }}
          />
        </View>
        <Text style={{ color, fontSize: FONT_SIZE }}>{user.firstname} </Text>
        <Text style={{ color, fontSize: FONT_SIZE }}>{user.lastname}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default UserCard;
