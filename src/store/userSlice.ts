import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserCollectionItemDoc } from 'src/db/UserCollectionItem';

import { UserApi } from '../api';
import { IDrinkDoc } from '../db/Drink';
import { IKeywordDoc } from '../db/Keyword';

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
  keywords: IKeywordDoc[];
  randomDrink: IDrinkDoc;
  collection?: IUserCollectionItemDoc[];
  searchPayload?: SearchPayload;
  searchResults?: IDrinkDoc[];
}

type ApiAccessError = {
  type: string;
  message: string;
};

export type NotesPayload = {
  idDrink: string;
  notes: string;
};

export type SearchPayload = {
  type: string;
  query: string;
};

export const initialState: UserState = {
  status: 'idle',
  drinks: [],
  keywords: [],
  randomDrink: {} as IDrinkDoc
};

export const getKeywords = createAsyncThunk('user/getKeywords', async (): Promise<IKeywordDoc[]> => {
  const api = new UserApi();
  const result = await api.getKeywords();

  return result;
});

export const getRandomDrink = createAsyncThunk('user/getRandomDrink', async (): Promise<IDrinkDoc> => {
  const api = new UserApi();
  const result = await api.getRandomDrink();

  return result;
});

export const getDrinks = createAsyncThunk('user/getDrinks', async (): Promise<IDrinkDoc[]> => {
  const api = new UserApi();
  const result = await api.getDrinks();

  return result;
});

export const getSearchResults = createAsyncThunk<
  IDrinkDoc[],
  SearchPayload,
  {
    rejectValue: ApiAccessError;
  }
>('user/getSearchResults', async (payload, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.getSearchResults(payload);

    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const addCollectionItem = createAsyncThunk<
  IUserCollectionItemDoc,
  string,
  {
    rejectValue: ApiAccessError;
  }
>('user/addCollectionItem', async (idDrink, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.addCollectionItem(idDrink);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteCollectionItem = createAsyncThunk<
  IUserCollectionItemDoc,
  string,
  {
    rejectValue: ApiAccessError;
  }
>('user/deleteCollectionItem', async (idDrink, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.deleteCollectionItem(idDrink);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const saveNotes = createAsyncThunk<
  IUserCollectionItemDoc,
  NotesPayload,
  {
    rejectValue: ApiAccessError;
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCollection: (state: UserState, action: PayloadAction<IUserCollectionItemDoc[]>) => {
      state.collection = action.payload;
    }
  },
  // Reducers for handling thunk-dispatched actions
  extraReducers: (builder) => {
    builder
      .addCase(getKeywords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getKeywords.fulfilled, (state: UserState, action) => {
        state.keywords = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getKeywords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getRandomDrink.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRandomDrink.fulfilled, (state: UserState, action) => {
        state.randomDrink = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getRandomDrink.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getDrinks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDrinks.fulfilled, (state: UserState, action) => {
        state.drinks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getDrinks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSearchResults.pending, (state, action) => {
        state.status = 'loading';
        state.searchPayload = action.meta.arg;
      })
      .addCase(getSearchResults.fulfilled, (state: UserState, action) => {
        const results = action.payload;
        state.status = 'succeeded';
        state.searchResults = results;
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.searchResults = [];
        state.error = action.error.message;
        if (action.payload) {
          state.errorType = action.payload.type;
        }
      })
      .addCase(addCollectionItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCollectionItem.fulfilled, (state: UserState, action) => {
        const result = action.payload;
        const newState = [...(state.collection as IUserCollectionItemDoc[]), result];
        state.status = 'succeeded';
        state.collection = newState;
      })
      .addCase(addCollectionItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        if (action.payload) {
          state.errorType = action.payload.type;
        }
      })
      .addCase(saveNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveNotes.fulfilled, (state: UserState, action) => {
        if (state.collection) {
          state.collection = state.collection.map((item) =>
            item.idDrink === action.payload.idDrink
              ? ({ ...item, notes: action.payload.notes } as IUserCollectionItemDoc)
              : item
          );
        }
        state.status = 'succeeded';
      })
      .addCase(saveNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        if (action.payload) {
          state.errorType = action.payload.type;
        }
      })
      .addCase(deleteCollectionItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCollectionItem.fulfilled, (state, action) => {
        if (state.collection) {
          state.collection = state.collection.filter((item) => item.idDrink !== action.payload.idDrink);
        }
        state.status = 'succeeded';
      })
      .addCase(deleteCollectionItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        if (action.payload) {
          state.errorType = action.payload.type;
        }
      });
  }
});

export const { updateCollection } = userSlice.actions;

export default userSlice.reducer;
