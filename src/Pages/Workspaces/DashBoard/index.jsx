import { Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Board } from '../../../Components/Board/Board';
import { CreateNewBoard } from '../../../Components/Modals/CreateNewBoard/CreateNewBoard';
import { useEffect, useState } from 'react';
import { getBoard } from '../../../Services/API/ApiBoard/apiBoard';
import { BoardInformation } from '../../../Components/BoardInformation/BoardInformation';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const DashBoard = () => {
  const [listBoard, setListBoard] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const countCurr = 10;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log('total pages: ' + totalPage);
  

  // const handleGetBoard = () => {
  //   getBoard(currentPage, count)
  //     .then((res) => {
  //       setListBoard(res);
  //       setTotalPage(Math.ceil(res.count / count));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    getBoard(countCurr, currentPage)
      .then((res) => {
        console.log('res', res);
        
        setListBoard(res);
        setTotalPage(Math.ceil(res.total / countCurr));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, countCurr]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <BoardInformation />
      <div className="my-8">
        <Divider />
      </div>
      <div>
        <div className="flex items-center my-2 text-textColor">
          <PersonIcon />
          <span className="ml-2 text-xl font-bold">Your Boards</span>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listBoard.map((board, index) => {
            return <Board key={index} board={board} />;
          })}
          <CreateNewBoard open={open} handleOpen={handleOpen} handleClose={handleClose} />
        </div>
        <div className="flex justify-center my-6">
          <Stack spacing={2}>
            <Pagination currentPage={currentPage} handlePageChange={handlePageChange} count={totalPage} size="large" />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
