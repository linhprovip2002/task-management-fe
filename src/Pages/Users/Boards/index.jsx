import { useGetWorkspaceById, useGetWorkspaceByUser } from "../../../Hooks";
import Loading from "../../../Components/Loading";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Board } from "../../../Components/Board/Board";
import { useState } from "react";
import { CreateNewBoard } from "../../../Components/Modals/CreateNewBoard/CreateNewBoard";

const UserBoards = () => {
  const [open, setOpen] = useState(false);
  const { workspaceInfo, isLoading: isLoadingWorkspace } = useGetWorkspaceByUser();

  const { workspaceDetails } = useGetWorkspaceById(workspaceInfo[0].id);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {isLoadingWorkspace && <Loading />}
      <div>
        <div className="flex items-center mb-2 text-textColor">
          <AccessTimeIcon />
          <span className="ml-2 text-xl font-bold">YOUR WORKSPACES</span>
        </div>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center bg-orange-400 rounded-md w-9 h-9">
            <p>{workspaceDetails?.title[0]}</p>
          </div>
          <p className="ml-2 font-medium">{workspaceDetails?.title}</p>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workspaceDetails?.boards?.map((board, index) => {
            return <Board key={index} board={board} />;
          })}
          <button
            onClick={handleOpen}
            className="flex items-center justify-center w-[12rem] h-[110px] rounded-lg bg-slate-200 hover:brightness-95 hover:cursor-pointer"
          >
            <p className="text-sm text-textColor">Create new board</p>
          </button>
          <CreateNewBoard open={open} handleClose={handleClose} />
        </div>
      </div>
    </>
  );
};

export default UserBoards;
