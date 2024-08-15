import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

function SearchBox({ lightenedColor, value, onChange }) {
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
          width: { md: "325px", xs: "290px", lg: "390px" },
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
