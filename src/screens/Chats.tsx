import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { NavPropsHome, UserDBSchema } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Colors } from '../utilities/colors';
import { getActiveConnections } from '../utilities/api';
import { setError } from '../store/reducers/appSlice';
import Loader from '../components/ui/Loader';
import UserCard from '../components/ui/UserCard';

const Chats = ({ navigation, route }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);

  const [users, setUsers] = useState<UserDBSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const loggedUser = useAppSelector((state) => state.userState.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await getActiveConnections(
          loggedUser?.connectedTo as string[],
        );
        const res = await response.json();
        setUsers(res.users);
        setLoading(false);
      } catch (err: any) {
        dispatch(setError(`${err}`));
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handlePress = (user: UserDBSchema) => {
    navigation.navigate('ChatRoom', { user });
  };

  if (loading) {
    return <Loader theme={theme} />;
  }
  return (
    <View
      style={{
        ...screenStyles.screenTop,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      <ScrollView>
        {users.map((user) => (
          <UserCard
            user={user}
            key={user.uid}
            theme={theme}
            onUserCardPress={() => handlePress(user)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Chats;
