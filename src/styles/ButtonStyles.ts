import { StyleSheet, TextStyle } from 'react-native';
import { Colors } from '../utilities/colors';

const centerText: TextStyle = {
  textAlign: 'center',
};

export default StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  ligthText: {
    ...centerText,
    color: Colors.lighter,
  },
  darkText: {
    ...centerText,
    color: Colors.darker,
  },
  primaryText: {
    ...centerText,
    color: Colors.primary,
  },
  secondaryText: {
    ...centerText,
    color: Colors.secondary,
  },
  icon: {
    backgroundColor: '#61DAFB',
  },
  iconText: {
    color: 'white',
  },
});
