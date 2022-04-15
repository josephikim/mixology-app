import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
  error?: string;
  drinks: IDrinkDoc[];
  searchResults: ISearchResult[];
}

export interface NotesPayload {
  idDrink: string;
  notes: string;
}

export const initialUserState: UserState = {
  status: 'idle',
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

export const saveNotes = createAsyncThunk('user/saveNotes', async (payload: NotesPayload): Promise<IDrinkDoc> => {
  const api = new UserApi();
  const result = await api.saveNotes(payload);
  return result;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    drinksUpdated: (state, action: PayloadAction<IDrinkDoc[]>) => {
      state.drinks = action.payload;
    }
  },
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
      })
      .addCase(saveNotes.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(saveNotes.fulfilled, (state, action) => {
        state.drinks = state.drinks.map((drink) =>
          drink._id === action.payload._id ? { ...drink, notes: action.payload.notes } : drink
        );
        state.status = 'succeeded';
      })
      .addCase(saveNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  }
});

export const { drinksUpdated } = userSlice.actions;

export default userSlice.reducer;
