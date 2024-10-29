import { Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import PropTypes from "prop-types";

function UserItem({ onClick, data }) {
  const handleClick = () => {
    if (onClick) return onClick(data);
  };
  return (
    <div
      onClick={handleClick}
      className="py-2 px-1 flex gap-2 items-center hover:bg-[#091E424F] rounded-[4px] cursor-pointer"
    >
      <Avatar sx={{ bgcolor: grey[500], width: 32, height: 32 }}>{data?.name?.charAt(0)?.toUpperCase()}</Avatar>
      <div className="flex flex-col justify-center">
        <div className="text-[#172B4D] text-sm">{data?.name}</div>
        <span className="text-[#44546F] text-xs">Hasn’t logged in recently</span>
      </div>
    </div>
  );
}

UserItem.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.object,
};

export default UserItem;
