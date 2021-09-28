import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavPropsHome, NavPropsProfile } from '../AppTypes';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/reducers/userSlice';
import screenStyles from '../styles/ScreenStyles';
import { signIn } from '../utilities/api';
import * as storage from '../utilities/asyncStorage';
const LoginScreen = ({ navigation, route }: NavPropsHome): JSX.Element => {
  // const { uid } = route.params;
  const theme = useAppSelector((state) => state.settingsState.theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const submitHandler = async () => {
    const response = await signIn(email, password);
    const result = await response.json();
    const promises = [
      storage.setItem('token', result.result.token),
      storage.setItem('expires', result.result.expires),
      storage.setItem('user', JSON.stringify(result.result.user)),
    ];
    await Promise.all(promises);
    dispatch(setUser(result.result.user));
  };

  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.lighter,
      }}
    >
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
        }}
      >
        <Button
          title="Sign Up"
          type=""
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
