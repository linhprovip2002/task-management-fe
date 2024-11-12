import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function ItemMember({ item, onHandleAddMember, isClose = false, onClose }) {
  const getInitials = (name) => {
    if (!name) return "P";
    const nameParts = name.split(" ");
    const initials = nameParts.slice(0, 2).map((word) => word.charAt(0).toUpperCase());
    return initials.join("");
  };

  return (
    <div
      onClick={() => onHandleAddMember(item)}
      className="flex items-center justify-between cursor-pointer px-1 py-2 bg-white rounded transition duration-200 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mr-1 font-bold text-white text-[12px] bg-gradient-to-b from-green-400 to-blue-500">
          {getInitials(item?.user?.name)}
        </div>
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
