import React from 'react';
import { Text } from 'react-native';
import { NavPropsHome } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../store/hooks';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Home = ({ navigation, route }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);

  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.lighter,
      }}
    >
      <Text style={theme === 'dark' && screenStyles.text}>
        This is the Home page
      </Text>
    </SafeAreaView>
  );
};

export default Home;
