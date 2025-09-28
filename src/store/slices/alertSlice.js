import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState = {
  open: false,
  message: null,
  severity: "info",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideAlert: (state) => {
      state.open = false;
    },
    resetAlert: () => {
      return initialState;
    },
  },
});

export const { showAlert, hideAlert, resetAlert } = alertSlice.actions;
export default alertSlice.reducer;

