import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer,   FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import snackbarReducer from "./slices/snackbarSlice";
import alertReducer from "./slices/alertSlice";
import currencyReducer from "./slices/currencySlice";
import bulkActionsReducer from "./slices/bulkActionsSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  alert: alertReducer,
  currency: currencyReducer,
  bulkActions: bulkActionsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [], // state slices to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
