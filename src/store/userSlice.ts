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
  userId: string | null;
  status: keyof typeof Status;
  error: string | null;
}

const initialState: UserState = {
  userId: null,
  status: 'idle',
  error: null
};

export const register = createAsyncThunk('user/register', async ({ username, password }: IRegistration) => {
  const api = new AuthApi();
  const res = await api.registerUser({ username, password });
  console.log('res', res);
  return res.data;
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
        state.status = 'succeeded';
        // update state.userId
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  }
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
