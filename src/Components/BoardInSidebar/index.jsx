import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import React from "react";

import { ImageIcon } from "../../Assets/images";
import ConvertHiDotsVertical from "../../Components/HiDotsVertical";

function BoardInSidebar({ dataBoard, isStar, onChange }) {
  const handleChange = () => {
    if (onChange) {
      onChange(isStar);
    }
  };
  return (
    <div className="relative flex items-center pl-4 py-2 bg-gray-200 cursor-pointer group">
      <div className="rounded-[4px] font-bold text-white text-[20px]">
        <ImageIcon width={24} height={20} className={"rounded-[2px]"} />
      </div>
      <div className=" flex-1 ml-2 text-[18px] font-medium">{dataBoard.title}</div>
      <ConvertHiDotsVertical
        type={"navbarBoard"}
        className={
          "cursor-pointer p-2 right-8 opacity-0 group-hover:opacity-100 hover:bg-gray-300 rounded-[2px] transition-opacity duration-300"
        }
      />
      <div
        onClick={handleChange}
        className={`cursor-pointer right-0 top-[6px] mr-2 p-1 opacity-0 ${isStar ? "opacity-100" : "group-hover:opacity-100"} group-hover:opacity-100 transition-opacity duration-300`}
      >
        {isStar ? <StarRoundedIcon size={24} /> : <StarOutlineRoundedIcon size={24} />}
      </div>
    </div>
  );
}

export default React.memo(BoardInSidebar);
