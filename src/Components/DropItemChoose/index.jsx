import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function DropItemChoose({ data, info, position, titleName, isChoose, activeCollectTable, onChoose }) {
  const handleChooseMoveList = (e) => {
    if (onChoose) {
      onChoose(e);
    }
  };

  return (
    <>
      <div className="mx-2 mt-2 py-1 text-[14px]">{info}</div>
      <div
        onClick={handleChooseMoveList}
        className={`flex items-center justify-between rounded-[4px] mx-2 p-2 hover:ring-1 hover:ring-gray-500 hover:bg-gray-100 cursor-pointer  active:ring-blue-500`}
      >
        <div className="">{titleName}</div>
        <KeyboardArrowDownIcon fontSize="small" />
      </div>

      {isChoose && (
        <div
          style={{ top: position.top, left: position.left }}
          className="absolute bottom-[-14] left-2 w-[230px] bg-white rounded-[8px] py-2 font-medium text-[12px] shadow-lg z-50"
        >
          <div
            // onClick={() => handleActive(0, "Sort by alphabetical order")}
            className={`relative p-2 bg-white rounded transition duration-200 after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-blue-500 after:opacity-0 ${activeCollectTable === 0 ? "after:opacity-100 hover:bg-blue-100 bg-blue-200 active:after:opacity-100 text-blue-900" : "hover:after:opacity-100 hover:bg-gray-100 active:after:opacity-100"}`}
          >
            Sort by alphabetical order
          </div>
          <div
            // onClick={() => handleActive(1, "Sort by most recent")}
            className={`relative p-2 bg-white rounded transition duration-200 after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-blue-500 after:opacity-0 ${activeCollectTable === 1 ? "after:opacity-100 hover:bg-blue-100 bg-blue-200 active:after:opacity-100 text-blue-900" : "hover:after:opacity-100 hover:bg-gray-100 active:after:opacity-100"}`}
          >
            Sort by most recent
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(DropItemChoose);
