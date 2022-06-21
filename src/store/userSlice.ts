import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { UserApi } from 'api/index';
import { IDrinkDoc } from 'db/Drink';
import { IUserCollectionItemDoc } from 'db/UserCollectionItem';
import { ApiError } from 'types';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}

interface UserState {
  status: keyof typeof Status;
  searchPayload?: SearchPayload;
  searchResults?: IDrinkDoc[];
  collection?: IUserCollectionItemDoc[];
  error?: string;
  errorType?: string;
}

export type RatingPayload = {
  idDrink: string;
  rating: number;
};

export type NotesPayload = {
  idDrink: string;
  notes: string;
};

export type SearchPayload = {
  type: string;
  query: string;
};

export type AddCollectionItemPayload = {
  user: string;
  idDrink: string;
};

export const initialState: UserState = {
  status: 'idle'
};

export const getSearchResults = createAsyncThunk<
  IDrinkDoc[],
  SearchPayload,
  {
    rejectValue: ApiError;
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
  AddCollectionItemPayload,
  {
    rejectValue: ApiError;
  }
>('user/addCollectionItem', async (payload, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.addCollectionItem(payload);

    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteCollectionItem = createAsyncThunk<
  IUserCollectionItemDoc,
  string,
  {
    rejectValue: ApiError;
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

export const setRating = createAsyncThunk<
  IUserCollectionItemDoc,
  RatingPayload,
  {
    rejectValue: ApiError;
  }
>('user/setRating', async (payload, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.setRating(payload);

    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const saveNotes = createAsyncThunk<
  IUserCollectionItemDoc,
  NotesPayload,
  {
    rejectValue: ApiError;
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
      .addCase(getSearchResults.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSearchResults.fulfilled, (state: UserState, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
        state.searchPayload = action.meta.arg;
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.searchPayload = action.meta.arg;
        if (action.payload?.type) {
          state.errorType = action.payload.type;
        }
      })
      .addCase(addCollectionItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCollectionItem.fulfilled, (state: UserState, action) => {
        const result = action.payload;
        const newState = state.collection ? [...state.collection, result] : [result];
        state.status = 'succeeded';
        state.collection = newState;
      })
      .addCase(addCollectionItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        if (action.payload?.type) {
          state.errorType = action.payload.type;
        }
      })
      .addCase(setRating.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setRating.fulfilled, (state: UserState, action) => {
        if (state.collection) {
          state.collection = state.collection.map((item) =>
            item.idDrink === action.payload.idDrink
              ? ({ ...item, rating: action.payload.rating } as IUserCollectionItemDoc)
              : item
          );
        }
        state.status = 'succeeded';
      })
      .addCase(setRating.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        if (action.payload?.type) {
          state.errorType = action.payload.type;
        }
      })
      .addCase(saveNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveNotes.fulfilled, (state: UserState, action) => {
        if (state.collection) {
          const newItem = state.collection.map((item) =>
            item.idDrink === action.payload.idDrink
              ? ({ ...item, notes: action.payload.notes } as IUserCollectionItemDoc)
              : item
          );
          state.collection = [...state.collection, ...newItem];
        }
        state.status = 'succeeded';
      })
      .addCase(saveNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        if (action.payload?.type) {
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
        if (action.payload?.type) {
          state.errorType = action.payload.type;
        }
      });
  }
});

export const { updateCollection } = userSlice.actions;

export default userSlice.reducer;
