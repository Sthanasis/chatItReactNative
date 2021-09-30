/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';
import store from './src/store/store';
import { useAppDispatch, useAppSelector } from './src/store/hooks';
import Navigator from './src/navigations/Navigator';
import * as storage from './src/utilities/asyncStorage';
import { setUser } from './src/store/reducers/userSlice';
import Loader from './src/components/ui/Loader';
import LogginNavigator from './src/navigations/LogginNavigator';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const isLoggedIn = useAppSelector((state) => state.userState.user !== null);
  const [loading, setLoading] = useState(true);
  const isDarkMode = theme === 'dark';
  const color: string = isDarkMode ? Colors.light : Colors.dark;
  const backgroundStyle: string = isDarkMode ? Colors.darker : Colors.lighter;

  const dispatch = useAppDispatch();

  const checkIfUserAuth = async () => {
    const token = await storage.getItem('token');
    if (token) {
      const expires = await storage.getItem('expires');
      if (expires)
        if (new Date() > new Date(expires)) {
          const promises = [
            await storage.removeItem('token'),
            await storage.removeItem('expires'),
            await storage.removeItem('user'),
          ];
          const result = await Promise.all(promises);
          setLoading(false);
        } else {
          const user = await storage.getItem('user');
          if (user) {
            dispatch(setUser(JSON.parse(user)));
            setLoading(false);
          }
        }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkIfUserAuth();
    if (theme === 'dark') {
      changeNavigationBarColor('black', false, true);
    } else {
      changeNavigationBarColor(Colors.lighter, true, true);
    }
  }, [theme]);

  if (loading) {
    return <Loader theme={theme} />;
  }

  if (!isLoggedIn) {
    return <LogginNavigator />;
  }

  return (
    <Navigator
      backgroundStyle={backgroundStyle}
      color={color}
      activeColor={Colors.primary}
    />
  );
};

export default AppWrapper;
