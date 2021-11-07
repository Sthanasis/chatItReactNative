import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackParamList, NavigationProps } from '../appTypes';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LogginNavigator = ({ backgroundStyle, color }: NavigationProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{
            headerTitle: 'Sign In',
            headerStyle: {
              backgroundColor: backgroundStyle,
            },
            headerTintColor: color,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerTitle: 'Sign Up',
            headerStyle: {
              backgroundColor: backgroundStyle,
            },
            headerTintColor: color,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LogginNavigator;
