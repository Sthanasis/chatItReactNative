import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (item: string) => {
  try {
    const data = await AsyncStorage.getItem(item);
    return data;
  } catch (err) {
    console.log({ err });
  }
};

export const setItem = async (item: string, value: string) => {
  try {
    await AsyncStorage.setItem(item, value);
  } catch (err) {
    console.log({ err });
  }
};

export const removeItem = async (item: string) => {
  try {
    await AsyncStorage.removeItem(item);
  } catch (err) {
    console.log({ err });
  }
};
