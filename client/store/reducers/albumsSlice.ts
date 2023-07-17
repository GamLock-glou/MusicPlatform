import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AlbumState, IAlbum } from "@/types/album";
import { deleteAlbumThunk, getAlbumsThunk } from "../thunks/albumThunk";
import { deleteTrackThunk } from "../thunks/trackThunk";
import { RootState } from "..";

const initialState: AlbumState = {
  albums: [],
  isLoading: false,
  error: "",
};

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
    [getAlbumsThunk.fulfilled.type]: (
      state,
      action: PayloadAction<IAlbum[]>
    ) => {
      state.isLoading = false;
      state.albums = action.payload;
    },
    [getAlbumsThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAlbumsThunk.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteAlbumThunk.fulfilled.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.albums = state.albums.filter(
        (album) => album._id !== action.payload
      );
    },
    [deleteAlbumThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteAlbumThunk.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteTrackThunk.fulfilled.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      const newAlbums: IAlbum[] = state.albums.map((album) => {
        const tracks = album.tracks.filter(
          (track) => track._id !== action.payload
        );
        return { ...album, tracks };
      });
      state.albums = newAlbums;
    },
    [deleteTrackThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteTrackThunk.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const albums = (state: RootState) => state.albumReducer.albums;
export const getOneAlbumSelector = (id: string) =>
  createSelector([albums], (albums) =>
    albums.find((album) => album._id === id)
  );

export default albumSlice.reducer;
