
import { PlayerState } from "@/types/player";
import { ITrack, TrackState } from "@/types/track";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import { deleteTrackThunk, getTracksThunk, searchTracksThunk } from "../thunks/trackThunk";

const initialState: TrackState = {
  tracks: [],
  isLoading: false,
  error: '',
};

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user
      };
    },
    [searchTracksThunk.fulfilled.type]: (state, action: PayloadAction<ITrack[]>) => {
      state.isLoading = false;
      state.tracks = action.payload;
    },
    [searchTracksThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [searchTracksThunk.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getTracksThunk.fulfilled.type]: (state, action: PayloadAction<ITrack[]>) => {
      state.isLoading = false;
      state.tracks = action.payload;
    },
    [getTracksThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTracksThunk.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteTrackThunk.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.tracks = state.tracks.filter(track => track._id !== action.payload);
    },
    [deleteTrackThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteTrackThunk.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default trackSlice.reducer;
