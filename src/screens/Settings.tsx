import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavPropsHome } from '../AppTypes';
import screenStyles from '../styles/ScreenStyles';
import buttonStyles from '../styles/ButtonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { setTheme } from '../store/reducers/settingsSlice';

const Settings = ({ navigation, route }: NavPropsHome): JSX.Element => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const isSwitchOn = theme === 'dark';
  console.log(theme);
  const dispatch = useAppDispatch();
  const onToggleSwitch = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };
  return (
    <SafeAreaView
      style={{
        ...screenStyles.screen,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.lighter,
      }}
    >
      <View>
        <View style={styles.option}>
          <Text style={theme === 'dark' && screenStyles.text}>
            Set Dark Mode {isSwitchOn ? 'Off ' : 'On '}
          </Text>
          <Switch
            color={isSwitchOn && Colors.primary}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
        </View>
        <Text style={theme === 'dark' && screenStyles.text}>
          This is the Settings page
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Settings;
