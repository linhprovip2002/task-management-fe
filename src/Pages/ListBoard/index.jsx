import ConvertHiDotsVertical from "../../Components/HiDotsVertical";
import { ArrowDown } from "../../Components/Icons";
import { BoardCard } from "../../Components/BoardCard";
import { EditCard } from "../../Components/EditCard";
import Sidebar from "../../Components/Sidebar";
import BoardInSidebar from "../../Components/BoardInSidebar";
import HeaderBoard from "../../Components/HeaderBoard";
import ListInBoard from "../../Components/ListInBoard";
import { useParams } from "react-router-dom";
import ListBoardProvider from "./ListBoardContext";
import { useListBoardContext } from "./ListBoardContext";

function ListBoard() {
  const { id } = useParams();

  return (
    <ListBoardProvider boardId={id}>
      <ListBoardContent />
    </ListBoardProvider>
  );
}

function ListBoardContent() {
  const { handleClosedNavBar, isShowBoardCard, isShowBoardEdit } = useListBoardContext();

  return (
    <>
      <div
        style={{
          height: "calc(100vh - 56.8px)",
        }}
        className="w-[100wh] flex"
      >
        <Sidebar>
          <>
            <div className={`pl-4 py-4 flex items-center`}>
              <div className="rounded-[4px] px-3 font-bold text-white text-[20px] bg-gradient-to-b from-green-400 to-blue-500">
                B
              </div>
              <div className="flex-1 ml-2 text-[18px] font-medium">BKDN</div>
              <div onClick={handleClosedNavBar} className="mr-4 p-2 rounded-[4px] hover:bg-gray-300 cursor-pointer">
                <ArrowDown width={16} height={16} className={"rotate-90 text-gray-100"} />
              </div>
            </div>
            <div className="group flex items-center">
              <div className="flex-1 text-[16px] font-medium py-2 pl-4 ">Your tables</div>
              <ConvertHiDotsVertical
                type={"navbarTable"}
                className={
                  "cursor-pointer p-2 mr-2 opacity-0 group-hover:opacity-100 hover:bg-gray-300 rounded-[4px] transition-opacity duration-300"
                }
              />
            </div>
            <BoardInSidebar />
          </>
        </Sidebar>
        {/* list board */}
        <div
          className="flex-grow flex flex-col overflow-x-hidden"
          style={{
            backgroundImage: `url(https://trello.com/assets/707f35bc691220846678.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <HeaderBoard />
          <ListInBoard />
        </div>
      </div>
      {isShowBoardCard && <BoardCard />}
      {isShowBoardEdit && <EditCard />}
    </>
  );
}

export default ListBoard;
