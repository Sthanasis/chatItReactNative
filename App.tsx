/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Colors } from './src/utilities/colors';
import * as storage from './src/utilities/asyncStorage';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import store from './src/store/store';
import { useAppDispatch, useAppSelector } from './src/store/hooks';
import Navigator from './src/navigations/Navigator';
import Loader from './src/components/ui/Loader';
import LogginNavigator from './src/navigations/LogginNavigator';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { socket } from './src/utilities/sockets';
import Error from './src/screens/Error';
import { setLoading } from './src/store/reducers/appSlice';
import { setUser } from './src/store/reducers/userSlice';

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
  const user = useAppSelector((state) => state.userState.user);
  const errorMsg = useAppSelector((state) => state.appState.errorMsg);

  const loading = useAppSelector((state) => state.appState.loading);

  const isDarkMode = theme === 'dark';
  const color: string = isDarkMode ? Colors.light : Colors.dark;
  const backgroundStyle: string = isDarkMode ? Colors.darker : Colors.lighter;

  const dispatch = useAppDispatch();

  useEffect(() => {
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
            await Promise.all(promises);
            dispatch(setLoading(false));
          } else {
            const userCredentials = await storage.getItem('user');
            if (userCredentials) {
              dispatch(setUser(JSON.parse(userCredentials)));
              dispatch(setLoading(false));
            }
          }
      }
      dispatch(setLoading(false));
    };
    checkIfUserAuth();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      changeNavigationBarColor('black', false, true);
    } else {
      changeNavigationBarColor(Colors.lighter, true, true);
    }
  }, [theme]);

  useEffect(() => {
    if (isLoggedIn) {
      if (socket.disconnected) {
        socket.connect();
        socket.emit('reconnect', user);
      }
    }
  }, [isLoggedIn]);

  if (loading) {
    return <Loader theme={theme} />;
  }

  if (errorMsg) {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor={theme === 'dark' ? 'black' : Colors.lighter}
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Error error={errorMsg} theme={theme} />
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor={theme === 'dark' ? 'black' : Colors.lighter}
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <LogginNavigator
          backgroundStyle={backgroundStyle}
          color={color}
          activeColor={Colors.primary}
        />
      </>
    );
  }

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={theme === 'dark' ? 'black' : Colors.lighter}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Navigator
        backgroundStyle={backgroundStyle}
        color={color}
        activeColor={Colors.primary}
      />
    </>
  );
};

export default AppWrapper;
