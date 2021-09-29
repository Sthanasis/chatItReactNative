import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import ScreenStyles from '../../styles/ScreenStyles';

interface Props {
  theme: string;
}

const Loader = ({ theme }: Props): JSX.Element => {
  return (
    <SafeAreaView style={ScreenStyles.screen}>
      <ActivityIndicator
        size="large"
        color={theme === 'dark' ? 'white' : 'black'}
      />
    </SafeAreaView>
  );
};

export default Loader;
