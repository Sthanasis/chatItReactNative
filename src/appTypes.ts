import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface MessageType {
  messages: string[] | [];
  userId: string;
  username: string;
  isTyping: boolean;
  date: string;
}

export interface ButtonPropsType {
  type?: string;
  onPress?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  style?: any;
  title?: string;
}

export interface InputPropsType {
  inputType?: string;
  type: string;
  onChangeText: Dispatch<SetStateAction<any>>;
  value: string;
  secureTextEntry?: boolean;
  label?: string;
  children?: ReactNode;
  disabled?: boolean;
  name?: string;
}

export interface User {
  username: string;
  firstname: string;
  gender: string;
  lastname: string;
  age: string;
  email: string;
  uid: string;
  connectedTo: string[];
}

export interface UserInputData {
  username: string;
  firstname: string;
  gender: string;
  lastname: string;
  age: string;
  email: string;
  password: string;
  uid: string;
}

export interface UserDBSchema {
  username: string;
  firstname: string;
  gender: string;
  lastname: string;
  age: string;
  email: string;
  password: string;
  uid: string;
  active: boolean;
  connectedTo: string[];
}

export interface UserStatus {
  uid: string;
  active: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface Room {
  id: string;
  name: string;
  senderName: string;
  receiverName: string;
  senderUid: string;
  receiverUid: string;
  collapsed: boolean;
  messages: Message[];
  index: number;
}

export interface Message {
  senderUid: string;
  receiverUid: string;
  message: string;
  date: Date;
  senderName: string;
  receiverName: string;
}

export interface ChatRoomDbSchema {
  roomId: string;
  chats: Message[];
}

export type StackParamList = {
  Home: undefined;
  Profile: { uid: string };
  Settings: undefined;
  BottomNav: undefined;
};

export type LoginStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type NavPropsHome = NativeStackScreenProps<
  StackParamList,
  'Home' | 'Profile' | 'Settings'
>;
export type NavPropsProfile = NativeStackScreenProps<StackParamList, 'Profile'>;
export type NavPropsAuth = NativeStackScreenProps<
  LoginStackParamList,
  'SignIn' | 'SignUp'
>;
