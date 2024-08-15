import { configureStore } from "@reduxjs/toolkit";
import selectedSongReducer from "./reduxSlice/selectedSongSlice";

const store = configureStore({
  reducer: {
    selectedSong: selectedSongReducer,
  },
});

export default store;
