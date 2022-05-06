import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { UserApi } from '../api';
import { IDrinkDoc } from '../db/Drink';
import { IGetVideosResult, ISearchResult } from '../types';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}

interface UserState {
  status: keyof typeof Status;
  error?: string;
  errorType?: string;
  drinks: IDrinkDoc[];
  searchResults: ISearchResult[];
}

interface IApiAccessError {
  type: string;
  message: string;
}

export interface NotesPayload {
  idDrink: string;
  notes: string;
}

const initialState: UserState = {
  status: 'idle',
  drinks: [],
  searchResults: []
};

export const addDrink = createAsyncThunk('user/addDrink', async (idDrink: string): Promise<IDrinkDoc> => {
  const api = new UserApi();
  const result = await api.addDrink(idDrink);

  return result;
});

export const getSearchResults = createAsyncThunk<
  ISearchResult[],
  string,
  {
    rejectValue: IApiAccessError;
  }
>('user/getSearchResults', async (query, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.getSearchResults(query);

    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const saveNotes = createAsyncThunk<
  IDrinkDoc,
  NotesPayload,
  {
    rejectValue: IApiAccessError;
  }
>('user/saveNotes', async (payload, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.saveNotes(payload);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteDrink = createAsyncThunk<
  IDrinkDoc,
  string,
  {
    rejectValue: IApiAccessError;
  }
>('user/deleteDrink', async (idDrink, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.deleteDrink(idDrink);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getVideos = createAsyncThunk('user/getVideos', async (drinkId: string): Promise<IGetVideosResult> => {
  const api = new UserApi();
  const result = await api.getVideos(drinkId);

  return result;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    drinksUpdated: (state: UserState, action: PayloadAction<IDrinkDoc[]>) => {
      state.drinks = action.payload;
    }
  },
  // Reducers for handling thunk-dispatched actions
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        const results = action.payload;
        state.status = 'succeeded';
        state.searchResults = results;
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        if (action.payload) {
          state.errorType = action.payload.type;
        }
      })
      .addCase(addDrink.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addDrink.fulfilled, (state: UserState, action) => {
        const result = action.payload;
        const newState = [...state.drinks, result];
        state.status = 'succeeded';
        state.drinks = newState;
      })
      .addCase(addDrink.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveNotes.pending, (state) => {
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
        state.error = action.error.message;
        if (action.payload) {
          state.errorType = action.payload.type;
        }
      })
      .addCase(deleteDrink.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDrink.fulfilled, (state, action) => {
        state.drinks = state.drinks.filter((drink) => drink._id !== action.payload._id);
        state.status = 'succeeded';
      })
      .addCase(deleteDrink.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        if (action.payload) {
          state.errorType = action.payload.type;
        }
      })
      .addCase(getVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.drinks = state.drinks.map((drink) =>
          drink._id === action.payload.drinkId ? { ...drink, youtubeVideos: action.payload.videos } : drink
        );
        state.status = 'succeeded';
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { drinksUpdated } = userSlice.actions;

export default userSlice.reducer;
