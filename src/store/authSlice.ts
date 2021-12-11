import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from '../api';
import { IRegistration } from '../types';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}
interface AuthState {
  accessToken: string | null;
  userId: string | null;
  status: keyof typeof Status;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  userId: null,
  status: 'idle',
  error: null
};

export const register = createAsyncThunk('auth/register', async ({ username, password }: IRegistration) => {
  const api = new AuthApi();
  const res = await api.registerUser({ username, password });
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
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.status = 'succeeded';
    },
    logoutSuccess: (state) => {
      state.userId = null;
      state.status = 'idle';
    }
  },
  // Reducers for handling thunk-dispatched actions (ie. 'auth/register')
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
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.accessToken = null;
        (state.userId = null), (state.status = 'idle');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  }
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
