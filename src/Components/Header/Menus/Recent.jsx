import React, { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless'; // HeadlessTippy cho tùy chỉnh hoàn toàn
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Recent() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Khong gian hien tai' },
    { label: 'Cut' },
    { label: 'Copy' },
    { label: 'Paste' },
    { label: 'Copy' },
    { label: 'Paste' },
    { label: 'Copy' },
    { label: 'Paste' },
  ];

  return (
    <div className="relative inline-block">
      {/* Nút để mở menu */}
      <HeadlessTippy
        interactive={true}
        visible={isOpen}
        onClickOutside={() => setIsOpen(false)} // Đóng menu khi nhấp ra ngoài
        placement="bottom-start"
        sx={{border: '1px solid gray'}}
        render={(attrs) => (
          <div
            className="w-[300px] bg-white border-solid border-b-2 border-gray-400 rounded-md shadow-lg max-h-60 "
            tabIndex="-1"
            {...attrs}
          >
            <ul className="p-2 ">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-slate-200"
                  onClick={() => setIsOpen(false)}
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
          className="text-sm flex items-center font-semibold mx-1 text-[#44546f] hover:bg-slate-200 p-2 rounded-md active:bg-slate-200"
        >
          Recent
          <ExpandMoreIcon sx={{ color: '#44546f' }} />
        </button>
      </HeadlessTippy>
    </div>
  );
}
