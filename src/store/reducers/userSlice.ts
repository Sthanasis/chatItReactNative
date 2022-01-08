import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDBSchema } from '../../AppTypes';
import type { RootState } from '../store';

interface UserState {
  isLoggedIn: boolean;
  user: UserDBSchema | null;
  token: string | null;
  connections: UserDBSchema[] | [];
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  token: null,
  connections: [],
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<UserDBSchema | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setConnections: (state, action: PayloadAction<UserDBSchema[] | []>) => {
      state.connections = action.payload;
    },
  },
});

export const { setIsAuth, setUser, setToken, setConnections } =
  UserSlice.actions;
export const selectState = (state: RootState) => state;

export default UserSlice.reducer;
