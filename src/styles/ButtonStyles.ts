import { StyleSheet } from 'react-native';
import { Colors } from '../utilities/colors';

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
    color: Colors.lighter,
  },
  darkText: {
    color: Colors.darker,
  },
  primaryText: {
    color: Colors.primary,
  },
  secondaryText: {
    color: Colors.secondary,
  },
  icon: {
    backgroundColor: '#61DAFB',
  },
  iconText: {
    color: 'white',
  },
});
