import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import Chats from '../screens/Chats';
import Notifications from '../screens/Notifications';

const Tab = createMaterialBottomTabNavigator();

interface Props {
  backgroundStyle: string;
  color: string;
  isLoggedIn: boolean;
  activeColor: string;
}

const BottomNavigator = ({
  backgroundStyle,
  color,
  activeColor,
  isLoggedIn,
}: Props): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={activeColor}
      barStyle={{ backgroundColor: backgroundStyle }}
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
