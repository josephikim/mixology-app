import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { UserApi } from '../api';
import { IDrinkDoc } from '../db/Drink';
import { IKeywordDoc } from '../db/Keyword';

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  succeeded = 'SUCCEEDED',
  failed = 'FAILED'
}

interface BaseState {
  status: keyof typeof Status;
  error?: string;
  errorType?: string;
  randomDrink: IDrinkDoc;
  keywords: IKeywordDoc[];
}

const initialState: BaseState = {
  status: 'idle',
  randomDrink: {} as IDrinkDoc,
  keywords: []
};

export const getKeywords = createAsyncThunk('base/getKeywords', async (): Promise<IKeywordDoc[]> => {
  const api = new UserApi();
  const result = await api.getKeywords();

  return result;
});

export const getRandomDrink = createAsyncThunk('base/getRandomDrink', async (): Promise<IDrinkDoc> => {
  const api = new UserApi();
  const result = await api.getRandomDrink();

  return result;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  }
});

export default baseSlice.reducer;
