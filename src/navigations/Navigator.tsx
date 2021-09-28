import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './BottomNavigator';
import StackNavigator from './StackNavigator';

interface Props {
  backgroundStyle: string;
  color: string;
  isLoggedIn: boolean;
  activeColor: string;
}

const Navigator = ({
  backgroundStyle,
  color,
  isLoggedIn,
  activeColor,
}: Props) => {
  return (
    <NavigationContainer>
      <StackNavigator
        backgroundStyle={backgroundStyle}
        color={color}
        isLoggedIn={isLoggedIn}
        activeColor={activeColor}
      />
    </NavigationContainer>
  );
};

export default Navigator;
