import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { AuthApi } from 'api/index';
import { IRegistration, ILogin, IAuthToken } from 'types';
import { updateCollection } from './userSlice';

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
  error?: string;
}

export const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  userId: '',
  status: 'idle'
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }: IRegistration, { dispatch }): Promise<IAuthToken> => {
    const api = new AuthApi();
    const res = await api.registerUser({ username, password });

    const { token, collection } = res;

    dispatch(updateCollection(collection));

    return token;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: ILogin, { dispatch }): Promise<IAuthToken> => {
    const api = new AuthApi();
    const res = await api.loginUser({ username, password });
    const { token, collection } = res;

    dispatch(updateCollection(collection));

    return token;
  }
);

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
        const tokenData = action.payload;
        state.status = 'succeeded';
        state.userId = tokenData.userId;
        state.accessToken = tokenData.accessToken;
        state.refreshToken = tokenData.refreshToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        const tokenData = action.payload;
        state.status = 'succeeded';
        state.userId = tokenData.userId;
        state.accessToken = tokenData.accessToken;
        state.refreshToken = tokenData.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { accessTokenUpdated } = authSlice.actions;

export default authSlice.reducer;
