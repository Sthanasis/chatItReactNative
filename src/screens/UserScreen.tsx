/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';

import { Colors } from '../utilities/colors';
import { NavPropsUser, UserDBSchema } from '../AppTypes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import screenStyles from '../styles/ScreenStyles';
import Header from '../components/Profile/Header';
import DetailItem from '../components/Profile/DetailItem';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { acceptConnect, connectRequest, getOneUser } from '../utilities/api';
import { socket } from '../utilities/sockets';
import { setUser } from '../store/reducers/userSlice';

const UserScreen = ({ navigation, route }: NavPropsUser): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const loggedUser = useAppSelector(
    (state) => state.userState.user,
  ) as UserDBSchema;

  const [user, setTheUser] = useState<UserDBSchema>();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const onStartConversation = () => {
    if (user) navigation.navigate('ChatRoom', { user });
  };

  const onRequestConnect = async () => {
    try {
      const result = await connectRequest(
        loggedUser?.uid as string,
        user?.uid as string,
      );

      dispatch(setUser(result.data as UserDBSchema));
      socket.emit(
        'connect-request',
        { firstname: loggedUser?.firstname, lastname: loggedUser?.lastname },
        user?.uid,
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onAccept = async () => {
    try {
      const res = await acceptConnect(
        loggedUser?.uid as string,
        user?.uid as string,
      );
      dispatch(setUser(res.data[0]));
      socket.emit('accept-connect', res.data[1]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOneUser(route.params.user.uid).then((res) => {
      setTheUser(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader theme={theme} />;
  }

  return user ? (
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
        <View>
          {loggedUser?.connectedTo.includes(user.uid) && (
            <Button
              title={`Message ${user.firstname}`}
              type="regular"
              onPress={onStartConversation}
            />
          )}
          {!loggedUser?.connectedTo.includes(user.uid) &&
            !loggedUser?.receivedRequests.includes(user.uid) &&
            !loggedUser.sendRequests.includes(user.uid) && (
              <Button
                title={`Connect with ${user.firstname}`}
                type="regular"
                onPress={onRequestConnect}
              />
            )}
          {loggedUser?.sendRequests.includes(user.uid) && (
            <Button title="Connection pending" type="regular" disabled />
          )}
          {loggedUser?.receivedRequests.includes(user.uid) && (
            <View>
              <Button title="Accept" type="regular" onPress={onAccept} />
              <Button
                title="Decline"
                type="regular"
                onPress={() => console.log('yo')}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  ) : (
    <Loader theme="light" />
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

export default UserScreen;
