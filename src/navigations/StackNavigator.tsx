import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { NavigationProps, StackParamList } from '../AppTypes';
import SettingsHeaderIcon from '../components/ui/SettingsHeaderIcon';

import Settings from '../screens/Settings';

import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = ({
  backgroundStyle,
  color,
}: NavigationProps): JSX.Element => {
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
      }}>
      <Stack.Screen
        name="BottomNav"
        component={BottomNavigator}
        options={({ navigation }) => ({
          headerRight: () => (
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
