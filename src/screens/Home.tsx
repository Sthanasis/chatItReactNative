import React, { useEffect, useState } from 'react';

import { NavPropsHome, User } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Colors } from '../utilities/colors';
import { getAllUsers } from '../utilities/api';

import UserCard from '../components/ui/UserCard';
import * as storage from '../utilities/asyncStorage';
import Loader from '../components/ui/Loader';
import { setError } from '../store/reducers/appSlice';

const Home = ({ navigation, route }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const getData = async () => {
    try {
      setLoading(true);
      const token = (await storage.getItem('token')) as string;
      const response = await getAllUsers(token);
      const res = await response.json();
      setUsers(res.users);
      setLoading(false);
    } catch (err: any) {
      dispatch(setError(`${err}`));
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loader theme={theme} />;
  }

  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      {users.map((user) => (
        <UserCard user={user} key={user.uid} theme={theme} />
      ))}
    </SafeAreaView>
  );
};

export default Home;
