import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import SongsList from "./components/SongsList";
import { MusicPlayer } from "./components/MusicPlayer";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

// Function to lighten a color
function lightenColor(color, percent) {
  if (!color) return;
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

// Function to darken a color
function darkenColor(color, percent) {
  if (!color) return;
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt;

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

function App() {
  const [value, setValue] = useState(0);
  const songs = useSelector((state) => state.songs.songs);
  const selectedSongIndex = useSelector(
    (state) => state.songs.selectedSongIndex
  );
  const selectedSong =
    selectedSongIndex !== null ? songs[selectedSongIndex] : null;
  const color = selectedSong?.accent;
  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(min-width:600px) and (max-width:900px)");

  // Create the gradient from light to dark of the same color
  const gradient = `linear-gradient(to right, ${color}, ${darkenColor(
    color,
    30
  )})`;

  console.log(gradient);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        // boxSizing: "border-box",
        background: color ? gradient : "black",
      }}
    >
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item md={6} sm={6} xs={12}>
          <div
            style={{ display: "flex", flexDirection: "row", height: "100%" }}
          >
            {isXs || isSm ? (
              <SideBar />
            ) : (
              <>
                <SideBar />
                <SongsList />
              </>
            )}
          </div>
        </Grid>
        {!isXs && (
          <Grid item md={6} sm={6}>
            <MusicPlayer />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default App;
