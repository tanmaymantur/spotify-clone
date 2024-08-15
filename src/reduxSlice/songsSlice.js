import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [], // Array of songs
    selectedSongIndex: null, // The index of the currently selected song
  },
  reducers: {
    setSongsData: (state, action) => {
      state.songs = action.payload;
    },
    selectSong: (state, action) => {
      state.selectedSongIndex = action.payload;
    },
    nextSong: (state) => {
      if (
        state.selectedSongIndex !== null &&
        state.selectedSongIndex < state.songs.length - 1
      ) {
        state.selectedSongIndex += 1;
      }
    },
    previousSong: (state) => {
      if (state.selectedSongIndex !== null && state.selectedSongIndex > 0) {
        state.selectedSongIndex -= 1;
      }
    },
  },
});

export const { setSongsData, selectSong, nextSong, previousSong } =
  songsSlice.actions;

export default songsSlice.reducer;
