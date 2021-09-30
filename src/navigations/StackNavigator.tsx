import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { StackParamList } from '../AppTypes';
import SettingsHeaderIcon from '../components/ui/SettingsHeaderIcon';
import LoginScreen from '../screens/Login';

import Settings from '../screens/Settings';
import SignUpScreen from '../screens/SignUpScreen';
import { useAppSelector } from '../store/hooks';
import BottomNavigator from './BottomNavigator';

interface Props {
  backgroundStyle: string;
  color: string;

  activeColor: string;
}

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = ({
  backgroundStyle,
  color,

  activeColor,
}: Props): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: backgroundStyle,
        },
        headerTitle: 'Chat It',
        headerTintColor: color,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen
        name="BottomNav"
        component={BottomNavigator}
        options={({ navigation, route }) => ({
          headerRight: (props) => (
            <SettingsHeaderIcon navigation={navigation} color={color} />
          ),
        })}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
