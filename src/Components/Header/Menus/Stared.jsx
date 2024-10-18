import React, { useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless"; // HeadlessTippy cho tùy chỉnh hoàn toàn
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Stared() {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (event) => {
    event.stopPropagation();
    // Xử lý logic khi click vào item ở đây
  };

  const menuItems = [
    { label: "Khong gian hien tai" },
    { label: "Cut" },
    { label: "Copy" },
    { label: "Paste" },
    { label: "Copy" },
    { label: "Paste" },
    { label: "Copy" },
    { label: "Paste" },
    { label: "Paste" },
    { label: "Copy" },
    { label: "Paste" },
  ];

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
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-slate-200"
                  onClick={handleItemClick}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm flex items-center font-semibold mx-1 text-[#44546f] hover:bg-slate-200 px-2 py-1 rounded-[4px] active:bg-slate-200"
        >
          Stared
          <ExpandMoreIcon sx={{ color: "#44546f" }} />
        </button>
      </HeadlessTippy>
    </div>
  );
}
