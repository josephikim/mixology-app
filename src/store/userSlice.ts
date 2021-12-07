import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: string | null;
}

const initialState: UserState = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
    }
  }
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
