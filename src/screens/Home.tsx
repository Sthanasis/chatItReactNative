import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavPropsHome, User } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../store/hooks';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getAllUsers } from '../utilities/api';

import UserCard from '../components/ui/UserCard';
import * as storage from '../utilities/asyncStorage';
import Loader from '../components/ui/Loader';

const Home = ({ navigation, route }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const token = (await storage.getItem('token')) as string;
      const response = await getAllUsers(token);
      const res = await response.json();
      setUsers(res.users);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <Loader theme={theme} />;
  }

  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.lighter,
      }}
    >
      {users.map((user) => (
        <UserCard user={user} key={user.uid} />
      ))}
    </SafeAreaView>
  );
};

export default Home;
