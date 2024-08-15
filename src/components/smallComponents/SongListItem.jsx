import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import ProfileIcon from "../../images/ProfileIcon";

const SongListItem = ({ songs, selectSong }) => {
  return (
    <List
      className="songs-list"
      sx={{
        height: { md: "400px", lg: "520px", xs: "435px" },
        width: { md: "340px", lg: "unset", xs: "325px" },
        overflowY: "scroll",
      }}
    >
      {songs.map((song) => (
        <ListItem key={song.id}>
          <ListItemButton
            onClick={() => selectSong(song)}
            sx={{ width: "432px", height: "80px", padding: "16px" }}
          >
            <ListItemAvatar>
              <ProfileIcon />
            </ListItemAvatar>
            <ListItemText
              sx={{
                "& .MuiListItemText-primary": {
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "24px",
                  color: "white",
                },
                "& .MuiListItemText-secondary": {
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#c5c5c5",
                },
              }}
              primary={song.name}
              secondary={song.artist}
            />
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: "400",
                fontSize: "18px",
                lineHeight: "24px",
                color: "white",
              }}
            >
              4:16
            </span>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SongListItem;
