import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserApi } from '../api';
import { SearchResult } from '../types';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}

interface UserState {
  searchResults: [SearchResult] | null;
  status: keyof typeof Status;
  error: string | null;
}

const initialState: UserState = {
  searchResults: null,
  status: 'idle',
  error: null
};

export const getSearchResults = createAsyncThunk('user/getSearchResults', async (query: string) => {
  const api = new UserApi();
  const results = await api.getSearchResults(query);

  return results;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // Reducers for handling thunk-dispatched actions
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        const results = action.payload;
        state.status = 'succeeded';
        state.searchResults = results;
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  }
});

export default userSlice.reducer;
