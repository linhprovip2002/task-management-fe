import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";

function Sidebar({ children }) {
  const { isClosedNavBar, handleChangeSidebar } = useListBoardContext();

  return (
    <div
      onClick={isClosedNavBar ? () => handleChangeSidebar(isClosedNavBar) : undefined}
      className={`${isClosedNavBar ? "max-w-[20px] w-full relative hover:bg-gray-200" : "max-w-[260px] w-full"} border-r-[1px] border-gray-300 bg-gray-100 shadow-[0_3px_10px_rgba(0,0,0,0.3)] z-100`}
    >
      {isClosedNavBar ? (
        <div
          onClick={() => handleChangeSidebar(isClosedNavBar)}
          className="absolute top-3 left-2 p-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-200 cursor-pointer z-50"
        >
          <ChevronRightIcon />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}

export default React.memo(Sidebar);
