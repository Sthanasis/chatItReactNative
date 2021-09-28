import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavPropsProfile } from '../AppTypes';
import { useAppSelector } from '../store/hooks';
import screenStyles from '../styles/ScreenStyles';

const Profile = ({ navigation, route }: NavPropsProfile): JSX.Element => {
  // const { uid } = route.params;
  const theme = useAppSelector((state) => state.settingsState.theme);

  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.lighter,
      }}
    >
      <Text style={theme === 'dark' && screenStyles.text}>
        This is the Profile Page
      </Text>
      {/* <Text>{uid}</Text> */}
    </SafeAreaView>
  );
};

export default Profile;
