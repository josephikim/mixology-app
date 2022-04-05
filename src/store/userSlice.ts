import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IDrink } from '../db/drink';
import { UserApi } from '../api';
import { SearchResult } from '../types';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}

interface UserState {
  status: keyof typeof Status;
  error: string | null;
  drinks: IDrink[];
  searchResults: SearchResult[];
}

const initialState: UserState = {
  status: 'idle',
  error: null,
  drinks: [],
  searchResults: []
};

export const getSearchResults = createAsyncThunk('user/getSearchResults', async (query: string) => {
  const api = new UserApi();
  const results = await api.getSearchResults(query);

  return results;
});

export const addDrink = createAsyncThunk('user/addDrink', async (drinkId: string) => {
  const api = new UserApi();
  const result = await api.addDrink(drinkId);

  return result;
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
      })
      .addCase(addDrink.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addDrink.fulfilled, (state, action) => {
        const result = action.payload;
        const newState = [...state.drinks, result];
        state.status = 'succeeded';
        state.drinks = newState;
      })
      .addCase(addDrink.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  }
});

export default userSlice.reducer;
