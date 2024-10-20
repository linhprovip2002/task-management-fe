import React, { useState } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

import {
  ArrowDown,
  TwoUserIcon,
  MissileIcon,
  LightningIcon,
  ListIcon,
  FilterIcon,
  ShareIconRegular,
} from "../../Components/Icons";
import ConvertHiDotsVertical from "../../Components/HiDotsVertical";
import TippyDetail from "../TippyDetail";
import RightSidebar from "../../Components/RightSidebar";

function HeaderBoard({ dataBoard, onChangeStar, isStar }) {
  const [rightSidebar, setRightSidebar] = useState(false);
  const handleChangeStar = () => {
    console.log(isStar);
    if (onChangeStar) {
      onChangeStar(isStar);
    }
  };

  const handleToggleRightSidebar = () => {
    console.log(rightSidebar);
    setRightSidebar(!rightSidebar);
  };

  return (
    <div className="relative flex items-center justify-between h-[32px] p-6 bg-gray-100">
      <div className="flex items-center">
        <div className="text-black p-2 font-bold text-[20px]">{dataBoard.title}</div>
        <TippyDetail title={"Star or unstar this tables. Starred tables will appear at the top of the tables list."}>
          <div
            onClick={handleChangeStar}
            className="cursor-pointer rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300"
          >
            {isStar ? <StarRoundedIcon size={24} /> : <StarOutlineRoundedIcon size={24} />}
          </div>
        </TippyDetail>
        <TippyDetail title={"Viewability"}>
          <div className="cursor-pointer rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
            <TwoUserIcon width={16} height={16} />
          </div>
        </TippyDetail>
        {/* button */}
        <TippyDetail title={"Board"}>
          <div className="cursor-pointer flex items-center px-3 py-1 ml-2 rounded-[4px] bg-gray-600 hover:bg-gray-700 transition-bg duration-300">
            <ListIcon width={16} height={16} className={"mr-2 text-white"} />
            <span className="text-[16px] font-medium text-white">Board</span>
          </div>
        </TippyDetail>
        <TippyDetail title={"Customize view"}>
          <div className="mr-4 p-2 ml-2 rounded-[4px] hover:bg-gray-300 bg-gray-300 cursor-pointer">
            <ArrowDown width={16} height={16} className={"text-gray-100"} />
          </div>
        </TippyDetail>
      </div>
      <div className="flex items-center">
        <TippyDetail title={"Additional utilities"}>
          <div className="cursor-pointer rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
            <MissileIcon width={16} height={16} />
          </div>
        </TippyDetail>
        <TippyDetail title={"Automation"}>
          <div className="cursor-pointer rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
            <LightningIcon width={16} height={16} />
          </div>
        </TippyDetail>
        <TippyDetail title={"Table filter tags"}>
          <div className="cursor-pointer flex items-center px-3 py-1 ml-2 rounded-[4px] hover:bg-gray-300 transition-bg duration-300">
            <FilterIcon width={16} height={16} className={"mr-2"} />
            <span className="text-[16px] font-medium">Filter</span>
          </div>
        </TippyDetail>
        <TippyDetail title={"Share Board"}>
          <div className="cursor-pointer flex items-center px-3 py-1 ml-2 rounded-[4px] bg-gray-600 hover:bg-gray-700 transition-bg duration-300">
            <ShareIconRegular width={16} height={16} className={"mr-2 text-white"} />
            <span className="text-[16px] font-medium text-white">Share</span>
          </div>
        </TippyDetail>
        <div
          onClick={handleToggleRightSidebar}
          className="cursor-pointer rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300"
        >
          <ConvertHiDotsVertical
            type={"menuHeader"}
            className={"group-hover:opacity-100 transition-opacity duration-300"}
          />
        </div>
      </div>
      <RightSidebar onClose={handleToggleRightSidebar} isOpen={rightSidebar} />
    </div>
  );
}

export default React.memo(HeaderBoard);
