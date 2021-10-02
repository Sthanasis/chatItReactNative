import React from 'react';
import { Text, View } from 'react-native';
import { NavPropsHome } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../store/hooks';
import { Colors } from '../utilities/colors';

const Notifications = ({ navigation, route }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);

  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}
    >
      <View>
        <Text style={theme === 'dark' && screenStyles.text}>
          This is the Notifications page
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
