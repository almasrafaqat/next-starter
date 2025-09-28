// src/hooks/useBulkActions.js
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  setSelectedItems,
  setAvailableActions,
  addSelectedItem,
  removeSelectedItem,
  toggleSelectedItem,
  selectAllItems,
  clearSelectedItems,
  setProcessing,
  setLastAction,
} from '@/store/slices/bulkActionsSlice';

export const useBulkActions = () => {
  const dispatch = useDispatch();
  const bulkActions = useSelector((state) => state.bulkActions);

  // Use useCallback for all functions to prevent unnecessary re-renders
  const initializeActions = useCallback((actions) => {
    // Only update if actions are different
    if (JSON.stringify(actions) !== JSON.stringify(bulkActions.availableActions)) {
      dispatch(setAvailableActions(actions));
    }
  }, [dispatch, bulkActions.availableActions]);

  const selectItems = useCallback((itemIds) => {
    dispatch(setSelectedItems(itemIds));
  }, [dispatch]);

  const addItem = useCallback((itemId) => {
    dispatch(addSelectedItem(itemId));
  }, [dispatch]);

  const removeItem = useCallback((itemId) => {
    dispatch(removeSelectedItem(itemId));
  }, [dispatch]);

  const toggleItem = useCallback((itemId) => {
    dispatch(toggleSelectedItem(itemId));
  }, [dispatch]);

  const selectAll = useCallback((allItemIds) => {
    dispatch(selectAllItems(allItemIds));
  }, [dispatch]);

  const clearAll = useCallback(() => {
    dispatch(clearSelectedItems());
  }, [dispatch]);

  const setProcessingState = useCallback((isProcessing) => {
    dispatch(setProcessing(isProcessing));
  }, [dispatch]);

  const executeAction = useCallback(async (actionKey, onExecute) => {
    if (bulkActions.selectedItems.length === 0) return;

    dispatch(setProcessing(true));
    dispatch(setLastAction(actionKey));

    try {
      await onExecute(bulkActions.selectedItems, actionKey);
      dispatch(clearSelectedItems());
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      dispatch(setProcessing(false));
    }
  }, [dispatch, bulkActions.selectedItems]);

  return {
    ...bulkActions,
    initializeActions,
    selectItems,
    addItem,
    removeItem,
    toggleItem,
    selectAll,
    clearAll,
    setProcessingState,
    executeAction,
  };
};