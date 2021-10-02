import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (item: string) => {
  const data = await AsyncStorage.getItem(item);
  return data;
};

export const setItem = async (item: string, value: string) => {
  await AsyncStorage.setItem(item, value);
};

export const removeItem = async (item: string) => {
  await AsyncStorage.removeItem(item);
};
