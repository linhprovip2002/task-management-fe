import React from "react";
import { ArrowDown } from "../Icons";

function Sidebar({ position, isClosedNavBar, onChange, children }) {
  const handleChange = () => {
    if (onChange) {
      return onChange(isClosedNavBar);
    }
  };
  return (
    <div
      onClick={isClosedNavBar ? handleChange : undefined}
      className={`${isClosedNavBar ? "max-w-[20px] w-full relative hover:bg-gray-200" : "max-w-[260px] w-full"} border-r-[1px] border-gray-300 bg-gray-100 shadow-[0_3px_10px_rgba(0,0,0,0.3)]`}
    >
      {isClosedNavBar ? (
        <div
          onClick={handleChange}
          className="absolute top-3 left-2 p-1 rounded-[50%] bg-gray-300 hover:bg-gray-200 cursor-pointer"
        >
          <ArrowDown width={16} height={16} className={"rotate-90 text-gray-100"} />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}

export default React.memo(Sidebar);
