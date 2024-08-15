import React, { useState, useEffect } from "react";
import LogoSvgIcon from "../images/LogoSvgIcon";
import ProfileIcon from "../images/ProfileIcon";
import { Box, IconButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import SongsList from "./SongsList";
import { MusicPlayer } from "./MusicPlayer";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function SideBar({ children }) {
  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(min-width:600px) and (max-width:900px)");

  const songs = useSelector((state) => state.songs.songs);
  const selectedSongIndex = useSelector(
    (state) => state.songs.selectedSongIndex
  );
  const selectedSong =
    selectedSongIndex !== null ? songs[selectedSongIndex] : null;
  const [mainPage, setMainPage] = useState(true);

  useEffect(() => {
    if (selectedSong) {
      setMainPage(false);
    }
  }, [selectedSong]);

  const handleGoBack = () => {
    setMainPage(true);
  };
  return (
    <Box
      style={{
        display: "flex",
        flexGrow: "1",
        height: "100%",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: "20px",
        justifyContent: "space-between",
      }}
    >
      <Box
        style={{
          width: { md: "fit-content", xs: "100%" },
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <LogoSvgIcon />
        {(isXs || isSm) && <ProfileIcon />}
        {isXs && !mainPage && (
          <IconButton onClick={handleGoBack}>
            <ArrowBackIosIcon sx={{ color: "white" }} />
          </IconButton>
        )}
      </Box>
      {isXs && mainPage && <SongsList />}
      {isXs && !mainPage && <MusicPlayer />}
      {!isXs && !isSm && (
        <div style={{ width: "fit-content" }}>
          <ProfileIcon />
        </div>
      )}
      {isSm && <SongsList />}
    </Box>
  );
}

export default SideBar;
