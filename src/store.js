import { configureStore } from "@reduxjs/toolkit";
import selectedSongReducer from "./reduxSlice/selectedSongSlice";
import songsReducer from "./reduxSlice/songsSlice";

const store = configureStore({
  reducer: {
    songs: songsReducer,
    selectedSong: selectedSongReducer,
  },
});

export default store;
