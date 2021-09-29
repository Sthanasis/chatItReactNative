import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { User } from '../../appTypes';
import { appUrl } from '../../utilities/api';
import screenStyles from '../../styles/ScreenStyles';

interface Props {
  user: User;
  theme: string;
}
const Header = ({ theme, user }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
              tintColor: 'grey',
              borderColor: 'grey',
              backgroundColor: 'white',
              borderWidth: 2,
              zIndex: 3,
              borderRadius: 50,
            }}
            source={{
              uri: `${appUrl}/assets/common/${user?.gender.toLowerCase()}.png?time=${new Date()}`,
            }}
          />
        </View>

        <View style={styles.name}>
          <Text
            style={
              theme === 'dark'
                ? { ...screenStyles.text, ...styles.text }
                : { ...styles.text }
            }
          >
            {user.firstname}
          </Text>
          <Text
            style={
              theme === 'dark'
                ? { ...screenStyles.text, ...styles.text }
                : { ...styles.text }
            }
          >
            {user.lastname}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    width: 100,
    marginVertical: 10,
  },
  name: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Header;
