import React, { useEffect, useState } from 'react';

import { NavPropsHome, UserDBSchema } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Colors } from '../utilities/colors';
import { getAllUsers } from '../utilities/api';

import UserCard from '../components/ui/UserCard';

import Loader from '../components/ui/Loader';
import { setError } from '../store/reducers/appSlice';

const Home = ({ navigation }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const [users, setUsers] = useState<UserDBSchema[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
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
  const handlePress = (user: UserDBSchema) => {
    navigation.navigate('User', { user });
  };
  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      {users.map((user) => (
        <UserCard
          user={user}
          key={user.uid}
          theme={theme}
          onUserCardPress={() => handlePress(user)}
        />
      ))}
    </SafeAreaView>
  );
};

export default Home;
