import React, { useState } from 'react';
import { ScrollView, Text, TextStyle, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../utilities/colors';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAppSelector } from '../store/hooks';
import screenStyles from '../styles/ScreenStyles';

const SignUpScreen = (): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [gender, setGender] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  return (
    <ScrollView
      contentContainerStyle={{
        ...screenStyles.scrollScreen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}
    >
      <SafeAreaView
        style={{
          ...screenStyles.screen,
        }}
      >
        <View>
          <Text>Register</Text>
        </View>
        <Input
          label="Email"
          onChangeText={setEmail}
          type="text"
          value={email}
        />
        <Input
          label="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          type="text"
          value={password}
        />
        <Input
          label="Verify Password"
          secureTextEntry={true}
          onChangeText={setVerifyPassword}
          type="text"
          value={verifyPassword}
        />
        <Input
          label="First Name"
          secureTextEntry={true}
          onChangeText={setFirstname}
          type="text"
          value={firstname}
        />
        <Input
          label="Last Name"
          secureTextEntry={true}
          onChangeText={setLastname}
          type="text"
          value={lastname}
        />
        <Input
          label="Gender"
          secureTextEntry={true}
          onChangeSelect={setGender}
          type="select"
          value={gender}
          selectData={['male', 'female', 'other']}
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
    </ScrollView>
  );
};

export default SignUpScreen;
