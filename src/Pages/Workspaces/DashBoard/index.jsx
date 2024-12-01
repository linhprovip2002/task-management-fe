import { Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Board } from "../../../Components/Board/Board";
import { CreateNewBoard } from "../../../Components/Modals/CreateNewBoard/CreateNewBoard";
import { useEffect, useState } from "react";
import { BoardInformation } from "../../../Components/BoardInformation/BoardInformation";
import { useParams } from "react-router-dom";
import { useGetWorkspaceByUser, useGetWorkspaceById } from "../../../Hooks";
import Loading from "../../../Components/Loading";
import ClosedBoarDialog from "./ClosedBoard";
import { getArchivedBoards } from "../../../Services/API/ApiBoard/apiBoard";

const DashBoard = () => {
  const [listBoard, setListBoard] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { workspaceDetails, isLoading: isLoadingCurrentWorkspace } = useGetWorkspaceById(id);
  const { workspaceInfo, isLoading: isLoadingWorkspace } = useGetWorkspaceByUser();
  const [openClosedBoard, setOpenClosedBoard] = useState(false);
  const [archivedBoards, setArchivedBoards] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const role = workspaceInfo?.find((item) => item.id === Number(id))?.role;

  const handleOpenClosedBoard = () => setOpenClosedBoard(!openClosedBoard);
  useEffect(() => {
    getArchivedBoards(id)
      .then((res) => {
        setArchivedBoards(res);
      })
      .catch((err) => {
        console.error(err);
      });

    if (Array.isArray(workspaceDetails?.boards)) setListBoard(workspaceDetails?.boards);
  }, [workspaceDetails?.boards, id]);

  useEffect(() => {
    document.title = "Workspace | Kanban";
    return () => {
      document.title = "Kanban";
    };
  }, []);

  if (!workspaceInfo?.length) {
    return <div className="text-xl font-semibold">LOOK LIKE YOU DON'T HAVE ANY WORKSPACE YET!</div>;
  }

  return (
    <div>
      {(isLoadingWorkspace || isLoadingCurrentWorkspace) && <Loading />}
      <BoardInformation />
      <div className="my-6">
        <Divider />
      </div>
      <div>
        <div className="flex items-center mb-2 text-textColor">
          <PersonIcon />
          <span className="ml-2 text-xl font-bold">Your Boards</span>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listBoard?.map((board) => (
            <Board key={board.id} board={board} />
          ))}
          <button
            onClick={handleOpen}
            className="flex items-center justify-center w-[12rem] h-[110px] rounded-lg bg-slate-200 hover:brightness-95 hover:cursor-pointer"
          >
            <p className="text-sm text-textColor">Create new board</p>
          </button>
          <CreateNewBoard open={open} handleClose={handleClose} />
        </div>
        {archivedBoards.length > 0 && role === "owner" && (
          <div className="my-12">
            <button
              onClick={handleOpenClosedBoard}
              className="p-2 text-sm font-semibold rounded-md bg-hoverBackground text-textColor"
            >
              View closed boards
            </button>
          </div>
        )}

        <ClosedBoarDialog
          open={openClosedBoard}
          onClose={handleOpenClosedBoard}
          boards={archivedBoards}
          workspaceName={workspaceDetails?.title}
          setArchivedBoards={setArchivedBoards}
        />
      </div>
    </div>
  );
};

export default DashBoard;
