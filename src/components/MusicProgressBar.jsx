import React, { useState, useEffect } from "react";
import { Slider, Box } from "@mui/material";

const MusicProgressBar = ({ duration, currentTime, audioRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  const handleChange = (event, newValue) => {
    // Set the current time of the audio when the slider is changed
    const newTime = (newValue / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        value={progress}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        min={0}
        max={100}
        valueLabelDisplay="auto"
        sx={{
          color: "white",
          "& .MuiSlider-thumb": {
            display: "none",
          },
        }}
      />
    </Box>
  );
};

export default MusicProgressBar;
