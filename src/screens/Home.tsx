import React from 'react';
import { Image, View } from 'react-native';

import { NavPropsHome } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';

import { useAppSelector } from '../store/hooks';
import { Colors } from '../utilities/colors';

const Home = ({ navigation }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);

  return (
    <View
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      <View>
        <Image
          source={require('../assets/img/robolo.png')}
          style={{
            tintColor: theme === 'dark' ? Colors.lighter : Colors.darker,
          }}
        />
      </View>
    </View>
  );
};

export default Home;
