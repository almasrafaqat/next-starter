// src/store/slices/bulkActionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const bulkActionsSlice = createSlice({
  name: 'bulkActions',
  initialState: {
    selectedItems: [],
    availableActions: [],
    isProcessing: false,
    lastAction: null,
  },
  reducers: {
    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
    setAvailableActions: (state, action) => {
      state.availableActions = action.payload;
    },
    addSelectedItem: (state, action) => {
      if (!state.selectedItems.includes(action.payload)) {
        state.selectedItems.push(action.payload);
      }
    },
    removeSelectedItem: (state, action) => {
      state.selectedItems = state.selectedItems.filter(id => id !== action.payload);
    },
    toggleSelectedItem: (state, action) => {
      const itemId = action.payload;
      if (state.selectedItems.includes(itemId)) {
        state.selectedItems = state.selectedItems.filter(id => id !== itemId);
      } else {
        state.selectedItems.push(itemId);
      }
    },
    selectAllItems: (state, action) => {
      state.selectedItems = action.payload;
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setLastAction: (state, action) => {
      state.lastAction = action.payload;
    },
  },
});

export const {
  setSelectedItems,
  setAvailableActions,
  addSelectedItem,
  removeSelectedItem,
  toggleSelectedItem,
  selectAllItems,
  clearSelectedItems,
  setProcessing,
  setLastAction,
} = bulkActionsSlice.actions;

export default bulkActionsSlice.reducer;