/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Appearance, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';
import store from './src/store/store';
import { useAppSelector } from './src/store/hooks';
import Navigator from './src/navigations/Navigator';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);
  const isDarkMode = theme === 'dark';
  const color: string = isDarkMode ? Colors.light : Colors.dark;
  const backgroundStyle: string = isDarkMode ? Colors.darker : Colors.lighter;

  return (
    <Navigator
      backgroundStyle={backgroundStyle}
      color={color}
      isLoggedIn={isLoggedIn}
      activeColor={Colors.primary}
    />
  );
};

export default AppWrapper;
