/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text, TextStyle, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../utilities/colors';
import { NavPropsAuth } from '../AppTypes';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/reducers/userSlice';
import screenStyles from '../styles/ScreenStyles';
import { signIn, updateUserStatus } from '../utilities/api';
import * as storage from '../utilities/asyncStorage';
import { useTextColor } from '../utilities/hooks';
import { setError, setLoading } from '../store/reducers/appSlice';
import { socket } from '../utilities/sockets';

const LoginScreen = ({ navigation }: NavPropsAuth): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('test');

  const color = useTextColor();

  const dispatch = useAppDispatch();

  const submitHandler = async () => {
    dispatch(setLoading(true));
    try {
      const response = await signIn(email, password);
      const result = await response.json();
      const user = result.result.user;
      const promises = [
        storage.setItem('token', result.result.token),
        storage.setItem('expires', result.result.expires),
        storage.setItem('user', JSON.stringify(user)),
      ];
      await Promise.all(promises);
      await updateUserStatus(user.uid, true);
      socket.emit('user-status', { uid: user.uid, active: true });
      dispatch(setUser(user));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      dispatch(setError(`${err}`));
    }
  };

  const textStyle: TextStyle = {
    color,
    fontWeight: 'bold',
    fontSize: 17,
  };

  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 50 }}>
        <Text style={{ ...textStyle, fontSize: 20 }}>Sign In</Text>
      </View>
      <Input label="Email" onChangeText={setEmail} type="text" value={email} />

      <Input
        label="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        type="text"
        value={password}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
        }}>
        <Button
          title="Register"
          type="transparent"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
        <Button title="Submit" type="regular" onPress={submitHandler} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
