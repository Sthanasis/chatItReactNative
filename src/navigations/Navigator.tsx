import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import BottomNavigator from './BottomNavigator';

interface Props {
  backgroundStyle: string;
  color: string;

  activeColor: string;
}

const Navigator = ({
  backgroundStyle,
  color,

  activeColor,
}: Props) => {
  return (
    <NavigationContainer>
      <StackNavigator
        backgroundStyle={backgroundStyle}
        color={color}
        activeColor={activeColor}
      />
    </NavigationContainer>
  );
};

export default Navigator;
