import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface AppState {
  errorMsg: string | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: AppState = {
  errorMsg: null,
  loading: true,
};

export const appSlice = createSlice({
  name: 'application',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setError: (state, action: PayloadAction<string | null>) => {
      state.errorMsg = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setError, setLoading } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectState = (state: RootState) => state;

export default appSlice.reducer;
