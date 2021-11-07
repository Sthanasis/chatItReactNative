import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dispatch, ReactNode, SetStateAction } from 'react';

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
  type: 'text' | 'select' | 'date';
  onChangeText?: Dispatch<SetStateAction<any>>;
  onChangeSelect?: (item: string) => void;
  onChangeDate?: (date: Date) => void;
  value: string | Date;
  secureTextEntry?: boolean;
  label?: string;
  children?: ReactNode;
  disabled?: boolean;
  name?: string;
  selectData?: string[];
  hasBorder?: boolean;
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
  firstname: string;
  gender: string;
  lastname: string;
  dateOfBirth: Date;
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
  images: string[];
  imageUrl: string;
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

export interface NavigationProps {
  backgroundStyle: string;
  color: string;
  activeColor: string;
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

export type AppTheme = 'dark' | 'light';
