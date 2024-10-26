import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import React from "react";

import { ImageIcon } from "../../Assets/images";
import ConvertHiDotsVertical from "../../Components/HiDotsVertical";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";

function BoardInSidebar() {
  const { activeStar, handleActiveStar, dataBoard } = useListBoardContext();

  return (
    <div className="relative flex items-center pl-4 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer group transition-all duration-200">
      <div className="rounded-[4px] font-bold text-white text-[20px]">
        <ImageIcon width={24} height={20} className={"rounded-[2px]"} />
      </div>
      <div className=" flex-1 ml-2 text-[14px] font-medium">{dataBoard.title || "No title"}</div>
      <ConvertHiDotsVertical
        type={"navbarBoard"}
        className={
          "cursor-pointer p-2 right-8 opacity-0 group-hover:opacity-100 hover:bg-gray-400 rounded-[2px] transition-opacity duration-300"
        }
      />
      <div
        onClick={handleActiveStar}
        className={`cursor-pointer right-0 top-[6px] mr-2 p-1 opacity-0 ${activeStar ? "opacity-100" : "group-hover:opacity-100"} group-hover:opacity-100 transition-opacity duration-300`}
      >
        {activeStar ? <StarRoundedIcon size={24} /> : <StarOutlineRoundedIcon size={24} />}
      </div>
    </div>
  );
}

export default React.memo(BoardInSidebar);
