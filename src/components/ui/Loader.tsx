import React from 'react';
import { ViewStyle } from 'react-native';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { AppTheme } from '../../appTypes';
import ScreenStyles from '../../styles/ScreenStyles';
import { Colors } from '../../utilities/colors';

interface Props {
  theme: AppTheme;
  loaderStyles?: ViewStyle;
}

const Loader = ({ theme, loaderStyles }: Props): JSX.Element => {
  return (
    <SafeAreaView
      style={{
        ...ScreenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
        ...loaderStyles,
      }}>
      <ActivityIndicator
        size="large"
        color={theme === 'dark' ? 'white' : 'black'}
      />
    </SafeAreaView>
  );
};

export default Loader;
