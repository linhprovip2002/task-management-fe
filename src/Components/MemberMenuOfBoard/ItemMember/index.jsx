import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../../Utils/color";

function ItemMember({ item, onHandleAddMember, isClose = false, onClose }) {
  let { sx: avatarStyles, children, title } = stringAvatar(item.user?.name);
  avatarStyles = {
    ...avatarStyles,
    width: 32,
    height: 32,
    marginRight: "8px",
  };

  return (
    <div
      onClick={() => onHandleAddMember && onHandleAddMember(item)}
      className="flex items-center justify-between cursor-pointer px-1 py-2 bg-white rounded transition duration-200 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <Avatar
          alt={item.user?.name}
          src={item.user?.avatarUrl || ""}
          sx={avatarStyles}
          children={children}
          title={title}
        />
        <div>{item?.user?.name}</div>
      </div>
      {isClose && (
        <div
          className="p-2"
          onClick={(e) => {
            e.stopPropagation();
            onClose(item);
          }}
        >
          <CloseIcon style={{ fontSize: "16px" }} />
        </div>
      )}
    </div>
  );
}

export default React.memo(ItemMember);
