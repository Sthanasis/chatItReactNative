import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface AppState {
  errorMsg: string | null;
}

// Define the initial state using that type
const initialState: AppState = {
  errorMsg: null,
};

export const appSlice = createSlice({
  name: 'application',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTheme: (state, action: PayloadAction<string | null>) => {
      state.errorMsg = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectState = (state: RootState) => state;

export default appSlice.reducer;
