import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  error: string;
}

const Error = ({ error }: Props): JSX.Element => {
  return (
    <View>
      <Text>{error}</Text>
    </View>
  );
};

export default Error;
