import { Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Board } from "../../../Components/Board/Board";
import { CreateNewBoard } from "../../../Components/CreateNewBoard/CreateNewBoard";
import { useEffect, useState } from "react";
import { getBoard } from "../../../Services/API/ApiBoard/apiBoard";
import { BoardInformation } from "../../../Components/BoardInformation/BoardInformation";

const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const [boardData, setBoardData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchBoardData = async () => {
    try {
      const data = await getBoard({ limit: 10, page: 1 });

      setBoardData(data);
    } catch (error) {
      console.error("Failed to fetch board data:", error);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, []);

  return (
    <div>
      <BoardInformation />
      <div className="my-8">
        <Divider />
      </div>
      <div>
        <div>
          <PersonIcon />
          <span className="ml-2 text-xl font-bold">Your Boards</span>
        </div>
        <div className="grid grid-cols-3 mt-4 gap-y-6">
          {boardData.map((board, index) => {
            return <Board key={index} />;
          })}
          <CreateNewBoard
            onClick={handleClickOpen}
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
