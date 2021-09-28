const baseUrl = 'http://192.168.1.23:3000/api';

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
