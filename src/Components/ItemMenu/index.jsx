import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import React from "react";

const defFunc = () => {};
const ItemMenu = ({
  title,
  description,
  nameBtn,
  onLeaveBoard,
  onToggleCollape,
  onHandleCopyList,
  children,
  onClick = defFunc,
}) => {
  const handleClick = (e) => {
    return onClick(e);
  };
  return (
    <div
      onClick={handleClick}
      className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50 shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
    >
      <div className="text-center p-2 mx-8">{title}</div>
      {description && <div className="mx-4">{description}</div>}
      {children}
      {nameBtn && (
        <div
          onClick={onHandleCopyList}
          className="cursor-pointer text-center m-2 px-3 py-1 rounded-[4px] bg-gray-600 hover:bg-gray-700 transition-bg duration-300"
        >
          <span className="font-medium text-white">{nameBtn}</span>
        </div>
      )}
      <KeyboardArrowLeftIcon
        onClick={onToggleCollape}
        fontSize="medium"
        className="absolute left-3 top-3 rounded-[4px] hover:bg-gray-100"
      />
      <CloseIcon
        onClick={onLeaveBoard}
        className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
      />
    </div>
  );
};

export default React.memo(ItemMenu);
