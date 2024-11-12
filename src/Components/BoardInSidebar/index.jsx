import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { ClickAwayListener, Popper } from "@mui/material";

import { ImageIcon } from "../../Assets/images";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import NavbarBoard from "../HiDotsVertical/NavbarBoard";

function BoardInSidebar() {
  const { activeStar, handleActiveStar, dataBoard } = useListBoardContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isChooseMoveList, setIsChooseMoveList] = useState(false);

  const styles = {
    position: "absolute",
    top: 0,
    right: 0,
    left: -10,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
  };

  const handleClickHidot = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(false);
  };

  const toggleCollape = () => {
    setIsChooseMoveList(!isChooseMoveList);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div className="relative flex items-center pl-4 py-[2px] bg-gray-200 hover:bg-gray-300 cursor-pointer group transition-all duration-200">
      <div className="rounded-[4px] font-bold text-white text-[14px]">
        <ImageIcon width={24} height={20} className={"rounded-[2px]"} />
      </div>
      <div className=" flex-1 ml-2 text-[14px] font-medium">{dataBoard.title || "No title"}</div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="relative">
          <div
            aria-describedby={id}
            className=" cursor-pointer p-[6px] opacity-0 group-hover:opacity-100 hover:bg-gray-400 rounded-[2px] transition-opacity duration-300"
            onClick={handleClickHidot}
          >
            <HiDotsVertical size={16} className="text-gray-700 rotate-90" />
          </div>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <div style={styles}>
              <NavbarBoard
                isChooseMoveList={isChooseMoveList}
                handleLeaveBoard={handleClickHidot}
                toggleCollape={toggleCollape}
              />
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
      <div
        onClick={handleActiveStar}
        className={`flex items-center justify-center cursor-pointer right-0 top-[6px] mr-2 p-1 opacity-0 ${activeStar ? "opacity-100" : "group-hover:opacity-100"} group-hover:opacity-100 transition-opacity duration-300`}
      >
        {activeStar ? (
          <StarRoundedIcon style={{ fontSize: 20 }} />
        ) : (
          <StarOutlineRoundedIcon style={{ fontSize: 20 }} />
        )}
      </div>
    </div>
  );
}

export default React.memo(BoardInSidebar);
