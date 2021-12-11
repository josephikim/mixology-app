import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from '../api';
import { IRegistration } from '../types';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}
interface UserState {
  accessToken: string | null;
  userId: string | null;
  status: keyof typeof Status;
  error: string | null;
}

const initialState: UserState = {
  accessToken: null,
  userId: null,
  status: 'idle',
  error: null
};

export const register = createAsyncThunk('user/register', async ({ username, password }: IRegistration) => {
  const api = new AuthApi();
  const res = await api.registerUser({ username, password });
  return res;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.status = 'succeeded';
    },
    logoutSuccess: (state) => {
      state.userId = null;
      state.status = 'idle';
    }
  },
  // Reducers for handling thunk-dispatched actions (ie. 'user/register')
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        const tokenData = action.payload.data[0];
        state.status = 'succeeded';
        state.userId = tokenData.userId;
        state.accessToken = tokenData.accessToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  }
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
