import { createSlice } from '@reduxjs/toolkit';

export interface IAlert {
  type: string;
  message: string;
}

interface AlertState {
  alerts: IAlert[];
}

export const initialAlertState: AlertState = {
  alerts: []
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    createAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    deleteAlert: (state, action) => {
      state.alerts = state.alerts.filter((alert) => alert.type !== action.payload.type);
    }
  }
});

export const { createAlert, deleteAlert } = alertSlice.actions;

export default alertSlice.reducer;
