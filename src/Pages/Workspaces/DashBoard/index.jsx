import { Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Board } from "../../../Components/Board/Board";
import { CreateNewBoard } from "../../../Components/CreateNewBoard/CreateNewBoard";
import { useEffect, useState } from "react";
import { getBoard } from "../../../Services/API/ApiBoard/apiBoard";
import { BoardInformation } from "../../../Components/BoardInformation/BoardInformation";

const DashBoard = () => {
  const [listBoard, setListBoard] = useState([]);
  const [open, setOpen] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchBoardData = async () => {
    try {
      const data = await getBoard({ limit: 10, page: 1 });

      setListBoard(data);
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
        {/* grid grid-cols-3 mt-4 gap-y-6 */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {listBoard.map((board, index) => {
            return <Board key={index} board={board}/>;
          })}
          <CreateNewBoard
           open={open}
           handleOpen={handleOpen}
           handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
