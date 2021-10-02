import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  error: string;
}

const Error = ({ error }: Props): JSX.Element => {
  return (
    <SafeAreaView>
      <Text>{error}</Text>
    </SafeAreaView>
  );
};

export default Error;
