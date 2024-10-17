import React, { useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless"; // HeadlessTippy cho tùy chỉnh hoàn toàn
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetWorkspaceByUser } from "../../../Hooks";

export default function Workspaces() {
  const [isOpen, setIsOpen] = useState(false);
  const { workspaceInfo } = useGetWorkspaceByUser();

  return (
    <div className="relative inline-block">
      {/* Nút để mở menu */}
      <HeadlessTippy
        interactive={true}
        visible={isOpen}
        onClickOutside={() => setIsOpen(false)} // Đóng menu khi nhấp ra ngoài
        placement="bottom-start"
        render={(attrs) => (
          <div
          className="w-[300px] overflow-y-auto bg-white border-2 border-solid border-gray-400 rounded-md shadow-md max-h-80 "
          tabIndex="-1"
          {...attrs}
          >
            <ul className="p-1">
              {workspaceInfo?.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-slate-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm flex items-center font-semibold ml-1 text-[#44546f] hover:bg-slate-200 p-2 rounded-md"
        >
          Workspaces
          <ExpandMoreIcon sx={{ color: "#44546f" }} />
        </button>
      </HeadlessTippy>
    </div>
  );
}
