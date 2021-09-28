import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';

interface Props {
  theme: string;
}

const Loader = ({ theme }: Props): JSX.Element => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ActivityIndicator
        size="large"
        color={theme === 'dark' ? 'white' : 'black'}
      />
    </SafeAreaView>
  );
};

export default Loader;
