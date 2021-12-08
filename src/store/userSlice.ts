import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userId: null,
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    }
  }
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
