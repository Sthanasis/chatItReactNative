import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavPropsHome } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Colors } from '../utilities/colors';
import { setTheme } from '../store/reducers/settingsSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../components/ui/Button';
import { signOut } from '../utilities/api';
import { setUser } from '../store/reducers/userSlice';
import { setError } from '../store/reducers/appSlice';

const Settings = ({ navigation, route }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const isSwitchOn = theme === 'dark';
  const dispatch = useAppDispatch();

  const onToggleSwitch = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  const signOutHanlder = async () => {
    try {
      await signOut();
      dispatch(setUser(null));
    } catch (err) {
      dispatch(setError(`${err}`));
    }
  };

  return (
    <SafeAreaView
      style={{
        ...screenStyles.screenLeft,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      <View>
        <View
          style={{
            ...styles.option,
            borderColor: theme === 'dark' ? Colors.primary : Colors.primary,
          }}>
          <Text style={theme === 'dark' && screenStyles.text}>
            Set Dark Mode {isSwitchOn ? 'Off ' : 'On '}
          </Text>
          <Switch
            color={isSwitchOn ? Colors.primary : Colors.primary}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
        </View>
        <View
          style={{
            ...styles.option,
            borderColor: theme === 'dark' ? Colors.primary : Colors.primary,
          }}>
          <Text style={theme === 'dark' && screenStyles.text}>Sign out</Text>
          <Button onPress={signOutHanlder} title="" type="transparent">
            <Icon
              style={{ padding: 10 }}
              color={theme === 'dark' ? Colors.primary : Colors.primary}
              name="skull"
              size={20}
            />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
});

export default Settings;
