import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavPropsProfile } from '../AppTypes';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAppSelector } from '../store/hooks';
import screenStyles from '../styles/ScreenStyles';

const SignUpScreen = (): JSX.Element => {
  // const { uid } = route.params;
  const theme = useAppSelector((state) => state.settingsState.theme);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.lighter,
      }}
    >
      <Input
        label="Username"
        onChangeText={setUsername}
        type="text"
        value={username}
      />

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
        <Button title="Sign Up" type="" onPress={() => {}} />
        <Button title="Submit" type="regular" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
