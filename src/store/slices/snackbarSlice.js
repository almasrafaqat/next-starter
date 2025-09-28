import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  open: false,
  message: "",
  severity: "info",
  progress: null, // null means no progress indicator
  showProgress: false,
  action: null,
  autoHideDuration: 6000,
  position: { vertical: "bottom", horizontal: "center" },
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.progress = action.payload.progress;
      state.showProgress = action.payload.showProgress;
      state.action = action.payload.action;
      state.autoHideDuration = action.payload.autoHideDuration;
      if (action.payload.position) {
        state.position = action.payload.position;
      }
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
    // Add this new reducer
    updateSnackbarProgress: (state, action) => {
      // If action.payload is a function, call it with the current progress
      if (typeof action.payload === 'function') {
        state.progress = action.payload(state.progress);
      } else {
        state.progress = action.payload;
      }
    },
    incrementSnackbarProgressBy: (state, action) => {
      state.progress = Math.min(state.progress + action.payload, 90);
    }
  },
});

export const {
  showSnackbar,
  hideSnackbar,
  updateSnackbarProgress,
  incrementSnackbarProgressBy
} = snackbarSlice.actions;

export default snackbarSlice.reducer;
