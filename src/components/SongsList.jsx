import React from "react";
import {
  Box,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
// import ProfileIcon from "./images/ProfileIcon";
import ProfileIcon from "../images/ProfileIcon";
import SearchBox from "../components/SearchBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useState, useEffect } from "react";
import TabPanel from "../components/TabPanel";
import { setSelectedSong } from "../reduxSlice/selectedSongSlice";
import "./SongsList.css";
import { useDispatch, useSelector } from "react-redux";
import { setSongsData } from "../reduxSlice/songsSlice";
import { selectSong } from "../reduxSlice/songsSlice";
import SongListItem from "./smallComponents/SongListItem";

const SongsList = () => {
  const [value, setValue] = useState(0);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const songsList = useSelector((state) => state.songs.songs);
  const selectedSongIndex = useSelector(
    (state) => state.songs.selectedSongIndex
  );
  const selectedSong =
    selectedSongIndex !== null ? songsList[selectedSongIndex] : null;
  const color = selectedSong?.accent;
  const lightenedColor = lightenColor(color, 20); // Lighten by 20%

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("https://cms.samespace.com/items/songs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("data", data.data);
        setSongs(data?.data);
        dispatch(setSongsData(data?.data));
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectSong = (index) => {
    // console.log(song);
    // dispatch(setSelectedSong(song));
    dispatch(selectSong(index));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: { md: "20px", lg: "20px", xs: "unset" },
      }}
    >
      <div style={{ alignSelf: "self-start", paddingLeft: "15px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ gap: "40px" }}
          aria-label="Tab"
          indicatorColor="none"
        >
          <Tab
            sx={{
              fontFamily: "Inter",
              textTransform: "none",
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "32px",
              color: "#8b8b8b",
              transition: "none", // Removes animation
              "&.Mui-selected": {
                color: "white !important",
              },
            }}
            label="For You"
            {...a11yProps(0)}
          />
          <Tab
            label="Top Tracks"
            sx={{
              fontFamily: "Inter",
              textTransform: "none",
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "32px",
              color: "#8b8b8b",
              transition: "none", // Removes animation
              "&.Mui-selected": {
                color: "white !important",
              },
            }}
            {...a11yProps(1)}
          />
        </Tabs>
      </div>
      <div style={{ marginTop: "10px" }}>
        <SearchBox
          lightenedColor={lightenedColor}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <TabPanel sx={{ width: "100%" }} value={value} index={0}>
        <SongListItem
          songs={filteredSongs}
          handleSelectSong={handleSelectSong}
          lightenedColor={lightenedColor}
        />
      </TabPanel>
      <TabPanel sx={{ width: "100%" }} value={value} index={1}>
        <SongListItem
          songs={filteredSongs.filter((song) => song.top_track)}
          handleSelectSong={handleSelectSong}
          lightenedColor={lightenedColor}
        />
      </TabPanel>
    </Box>
  );
};

const lightenColor = (color, percentage) => {
  if (!color) return;
  const amount = Math.round(2.55 * percentage);
  const R = parseInt(color.substring(1, 3), 16) + amount;
  const G = parseInt(color.substring(3, 5), 16) + amount;
  const B = parseInt(color.substring(5, 7), 16) + amount;

  const newColor = `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;

  return newColor;
};

export default SongsList;
