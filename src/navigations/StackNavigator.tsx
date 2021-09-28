import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { StackParamList } from '../AppTypes';
import SettingsHeaderIcon from '../components/ui/SettingsHeaderIcon';
import LoginScreen from '../screens/Login';

import Settings from '../screens/Settings';
import SignUpScreen from '../screens/SignUpScreen';
import BottomNavigator from './BottomNavigator';

interface Props {
  backgroundStyle: string;
  color: string;
  isLoggedIn: boolean;
  activeColor: string;
}

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = ({
  backgroundStyle,
  color,
  isLoggedIn,
  activeColor,
}: Props): JSX.Element => {
  const MainScreens = () => (
    <BottomNavigator
      backgroundStyle={backgroundStyle}
      color={color}
      activeColor={activeColor}
      isLoggedIn={isLoggedIn}
    />
  );
  if (!isLoggedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{ headerTitle: 'Sign In' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerTitle: 'Sign Up' }}
        />
      </Stack.Navigator>
    );
  }

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
        component={MainScreens}
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
