import React, { useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless"; // HeadlessTippy cho tùy chỉnh hoàn toàn
import TrelloLogoIcon from "../../TrelloLogoIcon/TrelloLogoIcon";
import { Button } from "@mui/material";
import { CreateNewBoard } from "../../Modals/CreateNewBoard/CreateNewBoard";


export default function Create() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="relative inline-block ">
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
                <li
                  className="px-4 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-hoverBackground"
                  onClick={() => setIsOpen(false)}
                >
                  <div onClick={handleOpen}>
                    <div className="flex items-center ">
                      <TrelloLogoIcon
                        style={{ color: "#172b4d" }}
                        className="w-4 h-4 mb-1 mr-1"
                      />
                      Create Board
                    </div>
                    <p className="text-xs text-gray-400">
                      A board is made up of cards ordered on lists. Use it to
                      manage projects, track information, or organize anything.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => setIsOpen(!isOpen)}
            // className="flex items-center"
          >
            Create
          </Button>
        </HeadlessTippy>
      </div>
      {open && (
        <CreateNewBoard
          open={open}
          handleGetAllBoard={() => {}}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
