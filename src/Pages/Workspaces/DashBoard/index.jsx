import { Avatar, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { Board } from "../../../Components/Board/Board";

const DashBoard = () => {
  const tempBoards = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className="flex gap-4 items-center text-sm">
        <Avatar />
        <div>
          <div className="flex gap-2 items-center text-xl font-bold">
            <div>Dashboard name</div>
            <EditIcon
              fontSize="10"
              className="hover:bg-gray-200 hover:cursor-pointer p-1"
            />
          </div>
          <div>Privacy</div>
        </div>
      </div>
      <div className="my-8">
        <Divider />
      </div>
      <div>
        <div>
          <PersonIcon />
          <span className="ml-2 font-bold text-xl">Your Boards</span>
        </div>
        <div className="grid grid-cols-3 mt-4 gap-y-6">
          {tempBoards.map((board, index) => {
            return <Board key={index} />;
          })}
          <Board />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
