import React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState, useRef } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MusicProgressBar from "../components/MusicProgressBar";
import { useSelector } from "react-redux";
import { IconButton, Slide, Slider } from "@mui/material";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

export const MusicPlayer = () => {
  const [currentTime, setCurrentTime] = useState(55000);
  const [duration, setDuration] = useState(70000); // Example duration in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const selectedSong = useSelector((state) => state.selectedSong);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Update the duration when the audio metadata is loaded
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Update the currentTime state as the audio plays
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [selectedSong]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    console.log("selectedSong", selectedSong);
    if (selectedSong && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [selectedSong]);

  useEffect(() => {
    if (audioRef.current && typeof volume === "number" && !isNaN(volume)) {
      audioRef.current.volume = Math.min(Math.max(volume, 0), 1);
    }
  }, [volume]);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selectedSong && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "self-start",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  lineHeight: "36px",
                  fontSize: "32px",
                  color: "white",
                }}
              >
                {selectedSong.name}
              </span>
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: "24px",
                  fontSize: "16px",
                  color: "#c5c5c5",
                }}
              >
                {selectedSong.artist}
              </span>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: { md: "275px", lg: "480px", xs: "300px" },
                  height: { md: "260px", lg: "410px", xs: "250px" },
                }}
                src={`https://cms.samespace.com/assets/${selectedSong.cover}`}
                alt="Album Cover"
              />
              <audio ref={audioRef} src={selectedSong.url} />
              <MusicProgressBar
                duration={duration}
                currentTime={currentTime}
                audioRef={audioRef}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span
                style={{
                  background: "#292929",
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  height: "48px",
                  width: "48px",
                }}
              >
                <MoreHorizIcon sx={{ color: "white" }} />
              </span>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FastRewindIcon sx={{ color: "white", fontSize: "2.40rem" }} />
                <span style={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={togglePlayPause}>
                    {!isPlaying ? (
                      <PlayCircleIcon
                        sx={{ color: "white", fontSize: "3.60rem" }}
                      />
                    ) : (
                      <PauseCircleIcon
                        sx={{ color: "white", fontSize: "3.60rem" }}
                      />
                    )}
                  </IconButton>
                </span>
                <FastForwardIcon sx={{ color: "white", fontSize: "2.40rem" }} />
              </Box>

              <span
                style={{
                  position: "relative",
                  background: "#292929",
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  height: "48px",
                  width: "48px",
                }}
              >
                {showVolumeSlider && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "57px", // Adjust this value based on the height of the slider
                      zIndex: "1000",
                      height: "100px",
                    }}
                  >
                    <Slider
                      sx={{ color: "white" }}
                      orientation="vertical"
                      value={volume}
                      onChange={handleVolumeChange}
                      min={0}
                      max={1}
                      step={0.01}
                      aria-labelledby="vertical-slider"
                    />
                  </Box>
                )}
                <IconButton onClick={toggleVolumeSlider}>
                  <VolumeUpIcon sx={{ color: "white" }} />
                </IconButton>
              </span>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
