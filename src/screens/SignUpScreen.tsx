import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextStyle, View } from 'react-native';
import { Colors } from '../utilities/colors';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAppSelector } from '../store/hooks';
import screenStyles from '../styles/ScreenStyles';
import { NavPropsAuth } from '../appTypes';
import { useTextColor } from '../utilities/hooks';
import { isEmail } from '../utilities/utils';

const SignUpScreen = ({ navigation, route }: NavPropsAuth): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [gender, setGender] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date('1/1/2000'));

  const color = useTextColor();

  const textStyle: TextStyle = {
    color,
    fontWeight: 'bold',
    fontSize: 17,
  };

  const onGenderChange = (v: string) => {
    setGender(v);
  };

  const onDateOfBirthChange = (date: Date) => {
    setDateOfBirth(date);
  };

  const validateData = () => {
    if (email.trim() === '') return false;
    if (!isEmail(email)) return false;
    if (password === '') return false;
    if (verifyPassword === '') return false;
    if (password !== verifyPassword) return false;
    if (gender.trim() === '') return false;
    if (firstname.trim() === '') return false;
    if (lastname.trim() === '') return false;
    return true;
  };

  const onSignUp = () => {
    if (!validateData()) {
      Alert.alert('Error', 'Please check the data you provided');
    } else {
      Alert.alert('Success', 'Everything is in order');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...screenStyles.scrollScreen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}
    >
      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <Text style={{ ...textStyle, fontSize: 24 }}>Create Account</Text>
      </View>

      <View
        style={{
          marginBottom: 50,
        }}
      >
        <Text style={{ ...textStyle, fontSize: 18, fontWeight: 'normal' }}>
          Account Information
        </Text>
      </View>
      <Input label="Email" onChangeText={setEmail} type="text" value={email} />
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
      <View
        style={{
          marginBottom: 50,
        }}
      >
        <Text style={{ ...textStyle, fontSize: 18, fontWeight: 'normal' }}>
          Personal Information
        </Text>
      </View>
      <Input
        label="First Name"
        onChangeText={setFirstname}
        type="text"
        value={firstname}
      />
      <Input
        label="Last Name"
        onChangeText={setLastname}
        type="text"
        value={lastname}
      />
      <Input
        label="Gender"
        onChangeSelect={onGenderChange}
        type="select"
        value={gender}
        selectData={['male', 'female', 'other']}
      />

      <Input
        label="Date of Birth"
        onChangeDate={onDateOfBirthChange}
        type="date"
        value={dateOfBirth}
      />

      <View
        style={{
          justifyContent: 'center',
          width: '80%',
        }}
      >
        <Button
          title="Submit"
          type="regular"
          onPress={onSignUp}
          style={{ marginBottom: 20 }}
        />
        <Button
          title="Sign In"
          type="transparent"
          onPress={() => {
            navigation.navigate('SignIn');
          }}
          style={{ marginBottom: 10 }}
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
