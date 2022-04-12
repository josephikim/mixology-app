import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { AuthApi } from '../api';
import { IRegistration, ILogin, TokenResult } from '../types';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}
interface AuthState {
  accessToken: string;
  refreshToken: string;
  userId: string;
  status: keyof typeof Status;
  error: string;
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  userId: '',
  status: 'idle',
  error: ''
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }: IRegistration): Promise<TokenResult> => {
    const api = new AuthApi();
    const res = await api.registerUser({ username, password });
    return res;
  }
);

export const login = createAsyncThunk('auth/login', async ({ username, password }: ILogin): Promise<TokenResult> => {
  const api = new AuthApi();
  const res = await api.loginUser({ username, password });
  return res;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const api = new AuthApi();
  await api.logoutUser();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    accessTokenUpdated: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    }
  },
  // Reducers for handling thunk-dispatched actions
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
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
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        const tokenData = action.payload.data[0];
        state.status = 'succeeded';
        state.userId = tokenData.userId;
        state.accessToken = tokenData.accessToken;
        state.refreshToken = tokenData.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state = initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  }
});

export const { accessTokenUpdated } = authSlice.actions;

export default authSlice.reducer;
