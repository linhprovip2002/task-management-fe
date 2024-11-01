import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ItemMenu from "../../ItemMenu";
import { useState } from "react";
import BoardMemberModal from "../../Modals/BoardMemberModal";
import { useListBoardContext } from "../../../Pages/ListBoard/ListBoardContext";

function NavbarBoard({ isChooseMoveList, handleLeaveBoard, toggleCollape }) {
  const [memberPopup, setMemberPopup] = useState(false);
  const { dataBoard } = useListBoardContext();
  return (
    <>
      <div className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50 shadow-[0_3px_10px_rgba(0,0,0,0.3)]">
        <div className="text-center p-2 mx-8">{dataBoard.title}</div>
        <div
          onClick={toggleCollape}
          className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <div className="">Leave the board</div>
          <ChevronRightIcon fontSize="small" />
        </div>
        <div
          onClick={() => setMemberPopup(true)}
          className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <div className="">Members manager</div>
        </div>
        <CloseIcon
          onClick={handleLeaveBoard}
          className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
        />
      </div>
      {isChooseMoveList && (
        <ItemMenu
          title={"Do you want to leave the board?"}
          description={"You will be removed from all cards in this table"}
          nameBtn={"Leave"}
          onLeaveBoard={handleLeaveBoard}
          onToggleCollape={toggleCollape}
        />
      )}

      <BoardMemberModal
        onClose={() => {
          setMemberPopup(false);
        }}
        open={memberPopup}
      />
    </>
  );
}

export default NavbarBoard;
