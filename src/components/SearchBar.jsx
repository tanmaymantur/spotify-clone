import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

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

function SearchBox({ value, onChange }) {
  const color = useSelector((state) => state.selectedSong?.accent);
  const lightenedColor = lightenColor(color, 20); // Lighten by 20%
  return (
    <Box sx={{ px: "10px" }}>
      <TextField
        variant="outlined"
        placeholder="Search Song, Artist"
        fullWidth
        value={value}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          // background: lightenedColor || "black",
          width: { md: "400px", xs: "290px" },
          height: "48px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            color: "white",
            background: lightenedColor || "black",
          },
          "& .MuiOutlinedInput-input": {
            paddingY: "10px",
          },
        }}
      />
    </Box>
  );
}

export default SearchBox;
