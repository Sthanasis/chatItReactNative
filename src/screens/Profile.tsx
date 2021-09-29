import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavPropsProfile, User } from '../AppTypes';
import { useAppSelector } from '../store/hooks';
import screenStyles from '../styles/ScreenStyles';
import Header from '../components/Profile/Header';

const Profile = ({ navigation, route }: NavPropsProfile): JSX.Element => {
  const user = useAppSelector((state) => state.userState.user) as User;
  const theme = useAppSelector((state) => state.settingsState.theme);

  return (
    <SafeAreaView
      style={{
        ...screenStyles.screenTop,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.lighter,
      }}
    >
      <Header theme={theme} user={user} />
    </SafeAreaView>
  );
};

export default Profile;
