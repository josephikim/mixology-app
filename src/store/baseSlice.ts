import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { UserApi } from 'api/index';
import { IDrinkDoc } from 'db/Drink';
import { IKeywordDoc } from 'db/Keyword';
import { ApiError } from 'types';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}

export interface BaseState {
  status: keyof typeof Status;
  error: string | null;
  drinks: IDrinkDoc[];
  keywords: IKeywordDoc[];
  randomDrink: IDrinkDoc;
}

export const initialState: BaseState = {
  status: 'idle',
  error: null,
  drinks: [],
  keywords: [],
  randomDrink: {} as IDrinkDoc
};

export const getKeywords = createAsyncThunk('base/getKeywords', async (): Promise<IKeywordDoc[]> => {
  const api = new UserApi();
  const result = await api.getKeywords();

  return result;
});

export const getRandomDrink = createAsyncThunk('base/getRandomDrink', async (_, thunkAPI): Promise<IDrinkDoc> => {
  const api = new UserApi();
  const result = await api.getRandomDrink();

  if (result?.idDrink) {
    thunkAPI.dispatch(getDrink(result.idDrink));
  }
  return result;
});

export const getDrink = createAsyncThunk<
  IDrinkDoc,
  string,
  {
    rejectValue: ApiError | string;
  }
>('base/getDrink', async (idDrink, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.getDrink(idDrink);

    if (response?.idDrink) {
      return response;
    } else {
      return rejectWithValue('No result available');
    }
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getDrinks = createAsyncThunk('base/getDrinks', async (): Promise<IDrinkDoc[]> => {
  const api = new UserApi();
  const result = await api.getDrinks();

  return result;
});

export const getDrinkWithVideos = createAsyncThunk<
  IDrinkDoc,
  string,
  {
    rejectValue: ApiError;
  }
>('base/getDrinkWithVideos', async (idDrink, { rejectWithValue }) => {
  const api = new UserApi();

  try {
    const response = await api.getDrinkWithVideos(idDrink);

    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {},
  // Reducers for handling thunk-dispatched actions
  extraReducers: (builder) => {
    builder
      .addCase(getKeywords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getKeywords.fulfilled, (state: BaseState, action) => {
        state.keywords = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getKeywords.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error?.message) {
          state.error = action.error.message;
        }
      })
      .addCase(getRandomDrink.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRandomDrink.fulfilled, (state: BaseState, action) => {
        state.randomDrink = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getRandomDrink.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error?.message) {
          state.error = action.error.message;
        }
      })
      .addCase(getDrink.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDrink.fulfilled, (state: BaseState, action) => {
        const newState = [...state.drinks];
        upsertDrink(newState, action.payload);
        state.drinks = newState;
        state.status = 'succeeded';
      })
      .addCase(getDrink.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error?.message) {
          state.error = action.error.message;
        }
      })
      .addCase(getDrinks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDrinks.fulfilled, (state: BaseState, action) => {
        state.drinks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getDrinks.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error?.message) {
          state.error = action.error.message;
        }
      })
      .addCase(getDrinkWithVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDrinkWithVideos.fulfilled, (state: BaseState, action) => {
        const newState = [...state.drinks];
        upsertDrink(newState, action.payload);
        state.drinks = newState;
        state.status = 'succeeded';
      })
      .addCase(getDrinkWithVideos.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error?.message) {
          state.error = action.error.message;
        }
      });
  }
});

export const upsertDrink = (array: Array<IDrinkDoc>, element: IDrinkDoc): void => {
  const i = array.findIndex((e: IDrinkDoc) => e.idDrink === element.idDrink);
  if (i > -1) {
    array[i] = element;
  } else {
    array.push(element);
  }
};

export default baseSlice.reducer;
