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

export interface UserState {
  status: keyof typeof Status;
  searchPayload: SearchPayload | null;
  searchResults: IDrinkDoc[];
  collection: IUserCollectionItemDoc[];
  error: string | null;
  errorType: string | null;
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
  status: 'idle',
  searchPayload: null,
  searchResults: [],
  collection: [],
  error: null,
  errorType: null
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
        state.searchPayload = action.meta.arg;
        if (action.payload?.type) {
          state.errorType = action.payload.type;
        }
        if (action.error?.message) {
          state.error = action.error.message;
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
        if (action.payload?.type) {
          state.errorType = action.payload.type;
        }
        if (action.error?.message) {
          state.error = action.error.message;
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
        if (action.payload?.type) {
          state.errorType = action.payload.type;
        }
        if (action.error?.message) {
          state.error = action.error.message;
        }
      })
      .addCase(saveNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveNotes.fulfilled, (state: UserState, action) => {
        if (state.collection) {
          const newState = state.collection.map((item) =>
            item.idDrink === action.payload.idDrink
              ? ({ ...item, notes: action.payload.notes } as IUserCollectionItemDoc)
              : item
          );
          state.collection = [...newState];
        }
        state.status = 'succeeded';
      })
      .addCase(saveNotes.rejected, (state: UserState, action) => {
        state.status = 'failed';
        if (action.payload?.type) {
          state.errorType = action.payload.type;
        }
        if (action.error?.message) {
          state.error = action.error.message;
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
        if (action.payload?.type) {
          state.errorType = action.payload.type;
        }
        if (action.error?.message) {
          state.error = action.error.message;
        }
      });
  }
});

export const { updateCollection } = userSlice.actions;

export default userSlice.reducer;
