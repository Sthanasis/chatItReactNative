/* IP MAY CHANGE IF ROUTER USES DYNAMIC IPS. IPCONFIG TO GET MACHINE IP ADDRESS*/

const baseUrl = 'http://192.168.1.2:3000/api'; //home
import { Message, UserInputData } from '../appTypes';
// const baseUrl = 'http://172.16.201.73:3000/api'; //work
import * as storage from '../utilities/asyncStorage';
// export const appUrl = 'http://172.16.201.73:3000'; //work
export const appUrl = 'http://192.168.1.2:3000'; // home

const getOptions = async () => {
  const token = await storage.getItem('token');
  return {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  };
};

const postOptions = (data: any) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

const postOptionsWithToken = async (data: any) => {
  const token = await storage.getItem('token');

  return {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(data),
  };
};

const patchOptions = async (data: any) => {
  const token = await storage.getItem('token');
  return {
    method: 'PATCH',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(data),
  };
};

export const register = async (data: UserInputData) => {
  return await fetch(`${baseUrl}/register`, postOptions(data));
};

export const signIn = async (email: string, password: string) => {
  const data = { email, password };
  return await fetch(`${baseUrl}/login`, postOptions(data));
};

export const signOut = async () => {
  const promises = [
    await storage.removeItem('token'),
    await storage.removeItem('user'),
    await storage.removeItem('expires'),
  ];
  return Promise.all(promises);
};

export const getActiveConnections = async (uids: string[]) => {
  return await fetch(
    `${baseUrl}/users/activeConnections?uids=${uids}`,
    await getOptions(),
  );
};

export const getOneUser = async (uid: string) => {
  const res = await fetch(`${baseUrl}/users/user/${uid}`, await getOptions());
  return await res.json();
};

export const getChat = async (roomId: string, limit: Number) => {
  const res = await fetch(
    `${baseUrl}/chats?roomId=${roomId}&limit=${limit}`,
    await getOptions(),
  );
  return await res.json();
};

export const sendMessage = async (roomId: string, message: Message) => {
  const res = await fetch(
    `${baseUrl}/chats`,
    await postOptionsWithToken({ roomId, message }),
  );
  return await res.json();
};

export const connectRequest = async (
  senderUid: string,
  receiverUid: string,
) => {
  const res = await fetch(
    `${baseUrl}/users/connection-request`,
    await patchOptions({ senderUid, receiverUid }),
  );

  return await res.json();
};

export const acceptConnect = async (senderUid: string, receiverUid: string) => {
  const res = await fetch(
    `${baseUrl}/users/connect`,
    await patchOptions({ senderUid, receiverUid }),
  );

  return await res.json();
};
