import { Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

function UserItem() {
  return (
    <div className="py-2 px-1 flex gap-2 items-center hover:bg-[#091E424F] rounded-[4px] cursor-pointer">
      <Avatar sx={{ bgcolor: grey[500], width: 32, height: 32 }}>NB</Avatar>
      <div className="flex flex-col justify-center">
        <div className="text-[#172B4D] text-sm">Bui Thien Nhan</div>
        <span className="text-[#44546F] text-xs">Hasn’t logged in recently</span>
      </div>
    </div>
  );
}

UserItem.propTypes = {};

export default UserItem;
