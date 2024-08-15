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
import { useDispatch } from "react-redux";
import SongListItem from "./smallComponents/SongListItem";

const SongsList = () => {
  const [value, setValue] = useState(0);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

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

  const selectSong = (song) => {
    console.log(song);
    dispatch(setSelectedSong(song));
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
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
      </div>
      <TabPanel value={value} index={0}>
        <SongListItem songs={filteredSongs} selectSong={selectSong} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SongListItem
          songs={filteredSongs.filter((song) => song.top_track)}
          selectSong={selectSong}
        />
      </TabPanel>
    </Box>
  );
};

export default SongsList;
