import { Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Board } from "../../../Components/Board/Board";
import { CreateNewBoard } from "../../../Components/Modals/CreateNewBoard/CreateNewBoard";
import { useEffect, useState } from "react";
import { getBoard } from "../../../Services/API/ApiBoard/apiBoard";
import { BoardInformation } from "../../../Components/BoardInformation/BoardInformation";
import Stack from "@mui/material/Stack";
import CustomIcons from "../../../Components/Pagination/Pagination";

const DashBoard = () => {
  const [listBoard, setListBoard] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentpage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const countCurr = 10;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getBoard(countCurr, currentpage)
      .then((res) => {
        setListBoard(res.data);
        setTotalPage(Math.ceil(res.total / countCurr));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentpage, countCurr]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
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
          {listBoard.map((board, index) => {
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
        <div className="flex justify-center my-6">
          <Stack spacing={2}>
            <CustomIcons currentpage={currentpage} handlePageChange={handlePageChange} count={totalPage} size="large" />
          </Stack>
        </div>
        <div className="mt-2 mb-6">
          <button className="p-2 text-sm font-semibold rounded-md bg-hoverBackground text-textColor">
            View close the boards
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
