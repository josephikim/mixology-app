import { createSlice } from '@reduxjs/toolkit';

export interface IAlert {
  id: string;
  type: string;
  message: string;
}

interface AlertState {
  alerts: IAlert[];
}

const initialState: AlertState = {
  alerts: []
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    deleteAlert: (state, action) => {
      state.alerts = state.alerts.filter((alert) => alert.id != action.payload.id);
    }
  }
});

export const { createAlert, deleteAlert } = alertSlice.actions;

export default alertSlice.reducer;
