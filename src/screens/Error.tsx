import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppTheme } from '../appTypes';
import Icon from 'react-native-vector-icons/FontAwesome5';

import screenStyles from '../styles/ScreenStyles';
import { useAppDispatch } from '../store/hooks';
import { setError } from '../store/reducers/appSlice';
import { Colors } from '../utilities/colors';
import Button from '../components/ui/Button';

interface Props {
  error: string;
  theme: AppTheme;
}

const Error = ({ error, theme }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const onDismissError = () => {
    dispatch(setError(null));
  };
  return (
    <View
      style={{
        ...screenStyles.scrollScreen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      <ScrollView contentContainerStyle={styles.error}>
        <View style={{ alignItems: 'center' }}>
          <Text style={textStyles(theme).capitalText}>
            Woops! We found an Error!
          </Text>
          <Text style={textStyles(theme).text}>{error}</Text>
        </View>
        <Button onPress={onDismissError}>
          <View style={styles.container}>
            <Text style={textStyles(theme).text}>Dismiss Error</Text>
            <Icon
              name="hand-middle-finger"
              color={theme === 'dark' ? 'white' : 'black'}
              size={25}
            />
          </View>
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    alignItems: 'center',
    height: '100%',
  },
  container: {
    flexDirection: 'row',
  },
});
const textStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    text: {
      color: theme === 'dark' ? 'white' : 'black',
    },
    capitalText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme === 'dark' ? 'white' : 'black',
    },
  });
};
export default Error;
