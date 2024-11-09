import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { memo } from "react";
import PropTypes from "prop-types";

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0).toUpperCase()}`,
    title: name,
  };
}
function GroupAvatars({ users = [] }) {
  return (
    <AvatarGroup
      max={5}
      sx={{
        "& .MuiAvatar-root": {
          width: 28,
          height: 28,
          cursor: "pointer",
          "&:hover": {
            opacity: 0.9,
          },
        },
      }}
    >
      <Avatar
        {...stringAvatar("Remy Sharp")}
        alt="Remy Sharp"
        src="https://trello-members.s3.amazonaws.com/6411cb0b756e170127733b34/3cb3638a4c4bac4f4213caa087029bb6/50.png"
      />
      <Avatar {...stringAvatar("Travis Howard")} alt="Travis Howard" />
      <Avatar {...stringAvatar("Cindy Baker")} alt="Cindy Baker" />
      <Avatar {...stringAvatar("Agnes Walker")} alt="Agnes Walker" />
      <Avatar {...stringAvatar("Trevor Henderson")} alt="Trevor Henderson" />
    </AvatarGroup>
  );
}

GroupAvatars.propTypes = {
  users: PropTypes.array,
};
export default memo(GroupAvatars);
