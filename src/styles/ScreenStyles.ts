import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Style = ViewStyle | TextStyle | ImageStyle;

const flexCenter: Style = {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
};

const flexLeft: Style = {
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
