import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';

import { NavigationProps } from '../appTypes';

const Navigator = ({
  backgroundStyle,
  color,
  activeColor,
}: NavigationProps) => {
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
