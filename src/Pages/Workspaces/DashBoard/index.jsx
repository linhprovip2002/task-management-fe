import { Avatar, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { Board } from '../../../Components/Board/Board';
import { CreateNewBoard } from '../../../Components/CreateNewBoard/CreateNewBoard';
import { useEffect, useState } from 'react';
import { getBoard } from '../../../Services/API/ApiBoard/apiBoard';

const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const [boardData, setBoardData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  // const tempBoards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const fetchBoardData = async () => {
    try {
      const data = await getBoard({ limit: 10, page: 1 });
      console.log('Fetching board data:', data);
      
      setBoardData(data);
    } catch (error) {
      console.error('Failed to fetch board data:', error);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [])
  
  return (
    <div>
      <div className="flex items-center gap-4 text-sm">
        <Avatar />
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <div>Dashboard name</div>
            <EditIcon fontSize="10" className="p-1 hover:bg-gray-200 hover:cursor-pointer" />
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
          <span className="ml-2 text-xl font-bold">Your Boards</span>
        </div>
        <div className="grid grid-cols-3 mt-4 gap-y-6">
          {boardData.map((board, index) => {
            return <Board key={index} />;
          })}
          <CreateNewBoard onClick={handleClickOpen} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
