import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Style = ViewStyle | TextStyle | ImageStyle;

const flexCenter: Style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
};

const flexLeft: Style = {
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  justifyContent: 'flex-start',
  flex: 1,
};

export default StyleSheet.create({
  screen: {
    ...flexCenter,
  },
  screenLeft: {
    ...flexLeft,
  },
  screenTop: {
    ...flexLeft,
    alignItems: 'center',
    padding: 0,
  },
  text: {
    color: Colors.lighter,
  },
  textBold: {
    color: Colors.lighter,
    fontWeight: 'bold',
  },
  scrollScreen: {
    ...flexCenter,
    paddingVertical: 10,
    flex: 0,
  },
});
