/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Colors } from '../utilities/colors';
import { NavPropsProfile, User } from '../AppTypes';
import { useAppSelector } from '../store/hooks';
import screenStyles from '../styles/ScreenStyles';
import Header from '../components/Profile/Header';
import DetailItem from '../components/Profile/DetailItem';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Profile = ({ navigation, route }: NavPropsProfile): JSX.Element => {
  const user = useAppSelector((state) => state.userState.user) as User;
  const theme = useAppSelector((state) => state.settingsState.theme);

  return (
    <View
      style={{
        ...screenStyles.screenTop,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Header theme={theme} user={user} />
        <DetailItem
          theme={theme}
          iconName="map-marker"
          info="Grevena, Greece"
        />
        <View style={{ paddingHorizontal: 5 }}>
          <Text
            style={{
              ...styles.description,
              color: theme === 'dark' ? 'white' : 'black',
            }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, ut
            quia nulla quaerat, officia architecto esse laudantium praesentium
            veritatis corporis saepe adipisci delectus quas et laborum aliquid
            ab sit eos? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsa, ut quia nulla quaerat, officia architecto esse laudantium
            praesentium veritatis corporis saepe adipisci delectus quas et
            laborum aliquid ab sit eos? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ipsa, ut quia nulla quaerat, officia architecto
            esse laudantium praesentium veritatis corporis saepe adipisci
            delectus quas et laborum aliquid ab sit eos? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ipsa, ut quia nulla quaerat,
            officia architecto esse laudantium praesentium veritatis corporis
            saepe adipisci delectus quas et laborum aliquid ab sit eos?
          </Text>
          <View style={styles.footer}>
            <DetailItem theme={theme} iconName="heart" info="Music, Hiking" />
          </View>
          <View style={styles.footer}>
            <DetailItem
              theme={theme}
              iconName="map"
              info="Locations Visited: 5"
            />
            <DetailItem theme={theme} iconName="group" info="Connections: 20" />
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
