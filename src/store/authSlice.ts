import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch } from '.';
import { AuthApi } from 'api/index';
import { updateCollection } from './userSlice';
import { IRegistration, ILogin, IAuthToken, ApiError } from 'types';

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

export const register = createAsyncThunk<
  IAuthToken,
  IRegistration,
  {
    dispatch: AppDispatch;
    rejectValue: ApiError;
  }
>('auth/register', async ({ username, password }, { dispatch, rejectWithValue }) => {
  const api = new AuthApi();

  try {
    const response = await api.registerUser({ username, password });
    const { token, collection } = response;

    dispatch(updateCollection(collection));

    return token;
  } catch (err) {
    if (err.response?.data) {
      return rejectWithValue(err.response.data);
    }
    return rejectWithValue(err);
  }
});

export const login = createAsyncThunk<
  IAuthToken,
  ILogin,
  {
    dispatch: AppDispatch;
    rejectValue: ApiError;
  }
>('auth/login', async ({ username, password }, { dispatch, rejectWithValue }) => {
  const api = new AuthApi();

  try {
    const response = await api.loginUser({ username, password });
    const { token, collection } = response;

    dispatch(updateCollection(collection));

    return token;
  } catch (err) {
    if (err.response?.data) {
      return rejectWithValue(err.response.data);
    }
    return rejectWithValue(err);
  }
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
