import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { UserApi } from '../api';
import { IDrinkDoc } from '../db/Drink';
import { ISearchResult } from '../types';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}

interface UserState {
  status: keyof typeof Status;
  error: string | undefined;
  drinks: IDrinkDoc[];
  searchResults: ISearchResult[];
}

const initialState: UserState = {
  status: 'idle',
  error: undefined,
  drinks: [],
  searchResults: []
};

export const addDrink = createAsyncThunk('user/addDrink', async (idDrink: string): Promise<IDrinkDoc> => {
  const api = new UserApi();
  const result = await api.addDrink(idDrink);

  return result;
});

export const getSearchResults = createAsyncThunk(
  'user/getSearchResults',
  async (query: string): Promise<ISearchResult[]> => {
    const api = new UserApi();
    const results = await api.getSearchResults(query);

    return results;
  }
);

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
