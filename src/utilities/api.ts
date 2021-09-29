//const baseUrl = 'http://192.168.1.23:3000/api';//home
const baseUrl = 'http://172.16.201.73:3000/api'; //work
import * as storage from '../utilities/asyncStorage';
export const appUrl = 'http://172.16.201.73:3000';

const postOptions = (data: any) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

export const signIn = async (email: string, password: string) => {
  const data = { email, password };
  return await fetch(`${baseUrl}/login`, postOptions(data));
};

export const getAllUsers = async (token: string) => {
  return await fetch(`${baseUrl}/users/all?token=${token}`);
};

export const signOut = async () => {
  const promises = [
    await storage.removeItem('token'),
    await storage.removeItem('user'),
    await storage.removeItem('expires'),
  ];
  return Promise.all(promises);
};
