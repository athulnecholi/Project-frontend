// src/features/turf/turfSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  newTurf: null,
};

const turfSlice = createSlice({
  name: "turf",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setNewTurf: (state, action) => {
      state.newTurf = action.payload;
    },
    resetTurfState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.newTurf = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setSuccess,
  setNewTurf,
  resetTurfState,
} = turfSlice.actions;

export default turfSlice.reducer;
