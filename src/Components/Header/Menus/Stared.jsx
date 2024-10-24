import React, { useState, useMemo } from "react";
import HeadlessTippy from "@tippyjs/react/headless"; // HeadlessTippy cho tùy chỉnh hoàn toàn
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetWorkspaceByUser } from "../../../Hooks";
import Loading from "../../Loading";
import { Avatar } from "@mui/material";

export default function Stared() {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (event) => {
    event.stopPropagation();
  };

  const { workspaceInfo, isLoading, isFetching } = useGetWorkspaceByUser();

  const starredWorkspace = useMemo(
    () => workspaceInfo?.filter((workspace) => workspace.isStarred),
    [workspaceInfo]
  );

  return (
    <div className="relative inline-block">
      <HeadlessTippy
        interactive={true}
        visible={isOpen}
        onClickOutside={() => setIsOpen(false)}
        placement="bottom-start"
        render={(attrs) => (
          <>
            {isLoading || isFetching ? (
              <Loading />
            ) : (
              <div
                className="w-[300px] bg-white border border-solid border-gray-500 rounded-md shadow-md max-h-80 p-3 flex flex-col gap-2"
                tabIndex="-1"
                {...attrs}
              >
                {starredWorkspace.length ? (
                  starredWorkspace.map((workspace, index) => (
                    <div
                      key={index}
                      className="px-2 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-slate-200"
                      onClick={handleItemClick}
                    >
                      <div className="flex items-center gap-2 text-base">
                        <Avatar sx={{ width: 28, height: 28, borderRadius: 1 }}>
                          {workspace.title[0]}
                        </Avatar>
                        <div className="text-sm font-bold">
                          {workspace.title}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col gap-3 p-2">
                    <img src="/NoStarredBoardImg.svg" alt="No starred Boards" />
                    <div className="text-center text-sm">
                      Star important boards to access them quickly and easily.
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm flex items-center font-semibold mx-1 text-[#44546f] hover:bg-slate-200 px-2 py-1 rounded-[4px] active:bg-slate-200"
        >
          Starred
          <ExpandMoreIcon sx={{ color: "#44546f" }} />
        </button>
      </HeadlessTippy>
    </div>
  );
}
