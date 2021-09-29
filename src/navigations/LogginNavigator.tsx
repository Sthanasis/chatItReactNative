import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../appTypes';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LogginNavigator = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default LogginNavigator;
