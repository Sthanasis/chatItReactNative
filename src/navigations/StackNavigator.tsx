import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { StackParamList } from '../AppTypes';
import SettingsHeaderIcon from '../components/ui/SettingsHeaderIcon';

import Settings from '../screens/Settings';
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
