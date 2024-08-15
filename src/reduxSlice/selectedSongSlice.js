import { createSlice } from "@reduxjs/toolkit";

const selectedSongSlice = createSlice({
  name: "selectedSong",
  initialState: null,
  reducers: {
    setSelectedSong: (state, action) => {
      return action.payload;
    },
    clearSelectedSong: () => {
      return null;
    },
  },
});

export const { setSelectedSong, clearSelectedSong } = selectedSongSlice.actions;

export default selectedSongSlice.reducer;
