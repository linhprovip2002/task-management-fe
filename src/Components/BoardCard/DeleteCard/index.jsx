import React from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import ClickAway from "../ClickAway";

function DeleteCard({ position, title, description, nameBtn, onClickConfirm, loading, onClose }) {
  const handleClickAway = () => {
    onClose();
  };

  return (
    <ClickAway onClickAway={handleClickAway}>
      <div
        style={{ top: position.top - 100, left: position.left }}
        className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50 shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
      >
        <div className="p-2 mx-8 text-center">{title}</div>
        {description && <div className="mx-4">{description}</div>}
        {nameBtn && (
          <div
            onClick={onClickConfirm}
            className="cursor-pointer text-center m-2 px-3 py-1 rounded-[4px] bg-red-600 hover:bg-red-700 transition-bg duration-300 flex justify-center gap-3"
          >
            <span className="font-medium text-white">{nameBtn}</span>
            {loading && (
              <div className="flex">
                <CircularProgress size={18} />
              </div>
            )}
          </div>
        )}
        <CloseIcon
          onClick={onClose}
          className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
        />
      </div>
    </ClickAway>
  );
}

export default React.memo(DeleteCard);
