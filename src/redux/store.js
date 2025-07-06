// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import userReducer from '../redux/features/users/userSlice';
import turfReducer from '../redux/features/turfs/turfSlice';
import { combineReducers } from 'redux';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  turf: turfReducer,
});

// Configuration for persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only persist user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Persistor to be used in app entry
export const persistor = persistStore(store);
