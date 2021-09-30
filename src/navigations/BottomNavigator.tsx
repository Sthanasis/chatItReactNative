import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import Chats from '../screens/Chats';
import Notifications from '../screens/Notifications';
import { useAppSelector } from '../store/hooks';
import { Colors } from '../utilities/colors';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = (): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  let activeColor = '';
  let backgroundColor = '';
  if (theme === 'dark') {
    activeColor = Colors.secondary;
    backgroundColor = Colors.dark;
  } else {
    activeColor = Colors.primary;
    backgroundColor = Colors.light;
  }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={activeColor}
      barStyle={{ backgroundColor }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color }) => (
            <Icon name="inbox" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Icon name="bell" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
