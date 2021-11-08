/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Colors } from '../utilities/colors';
import { NavPropsProfile, UserDBSchema } from '../AppTypes';
import { useAppSelector } from '../store/hooks';
import screenStyles from '../styles/ScreenStyles';
import Header from '../components/Profile/Header';
import DetailItem from '../components/Profile/DetailItem';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Profile = ({ navigation, route }: NavPropsProfile): JSX.Element => {
  const user = useAppSelector((state) => state.userState.user) as UserDBSchema;
  const theme = useAppSelector((state) => state.settingsState.theme);

  return (
    <View
      style={{
        ...screenStyles.screenTop,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Header theme={theme} user={user} />
        <DetailItem theme={theme} iconName="map-marker" info={user.location} />
        <View style={{ paddingHorizontal: 5 }}>
          <Text
            style={{
              ...styles.description,
              color: theme === 'dark' ? 'white' : 'black',
            }}>
            {user.about}
          </Text>
          <View style={styles.footer}>
            <DetailItem
              theme={theme}
              iconName="heart"
              info={`${user.hobbies.join(', ')}`}
            />
          </View>
          <View style={styles.footer}>
            <DetailItem
              theme={theme}
              iconName="map"
              info="Locations Visited: 5"
            />
            <DetailItem
              theme={theme}
              iconName="group"
              info={user.connectedTo.length}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    textAlign: 'center',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Profile;
