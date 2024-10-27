import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import { sortActive } from "../constans";

function NavbarTable({
  titleName,
  isChooseMoveList,
  toggleCollape,
  handleLeaveBoard,
  handleActive,
  activeCollectTable,
}) {
  return (
    <div className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50 shadow-[0_3px_10px_rgba(0,0,0,0.3)]">
      <div className="text-center p-2 mx-8">Your tables</div>
      <div className="mx-2 py-1">Arrange</div>
      <div
        onClick={toggleCollape}
        className={`flex items-center justify-between rounded-[4px] mx-2 p-2 hover:ring-1 hover:ring-gray-500 hover:bg-gray-100 cursor-pointer  active:ring-blue-500`}
      >
        <div className="">{titleName}</div>
        <KeyboardArrowDownIcon fontSize="small" />
      </div>
      <CloseIcon
        onClick={handleLeaveBoard}
        className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
      />
      {isChooseMoveList && (
        <div className="absolute bottom-[-14] left-2 w-[230px] bg-white rounded-[8px] py-2 font-medium text-[12px] shadow-lg z-50">
          {sortActive.map((item, index) => (
            <div
              key={index}
              onClick={() => handleActive(item.id, item.title)}
              className={`relative p-2 bg-white rounded transition duration-200 after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-blue-500 after:opacity-0 ${activeCollectTable === item.id ? "after:opacity-100 hover:bg-blue-100 bg-blue-200 active:after:opacity-100 text-blue-900" : "hover:after:opacity-100 hover:bg-gray-100 active:after:opacity-100"}`}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavbarTable;
