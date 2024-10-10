import AppsIcon from '@mui/icons-material/Apps';
import TrelloLogoIcon from '../TrelloLogoIcon/TrelloLogoIcon';
import WorkSpaces from './Menus/WorkSpaces';
import Recent from './Menus/Recent';
import Template from './Menus/Template';
import Stared from './Menus/Stared';
import { Button, TextField } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountMenu from './Menus/AccountMenu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Header = () => {
  return (
    <>
      {/* shadow-md #0c66e4 */}
      <header className="flex flex-col items-center justify-between w-full px-4 py-2 border-b-[1px] border-[#44546f] bg-white md:flex-row">
        {/* Left Section: Logo and Menu */}
        <div className="flex items-center space-x-4">
          <AppsIcon style={{ color: '#44546f' }} className="cursor-pointer" />
          <div className="flex items-center space-x-2 cursor-pointer">
            <TrelloLogoIcon style={{ color: '#44546f' }} className="w-4 h-4" />
            <span style={{ color: '#44546f' }} className="text-lg font-bold">
              Trello
            </span>
          </div>
          <div className="items-center hidden space-x-4 xl:flex">
            <WorkSpaces />
            <Recent />
            <Stared />
            <Template />
            <Button variant="contained" size="small" className="hidden text-white md:block">
              Create
            </Button>
          </div>
        </div>
        {/* Right Section: Search and Account */}
        <div className="flex items-center mt-4 space-x-4 md:mt-0">
          <div className="flex items-center w-full space-x-2 md:w-auto">
            <TextField
              id="outlined-basic"
              label="Search"
              size="small"
              variant="outlined"
              className="w-full md:w-64"
              sx={{ marginLeft: '8px' }}
            />
          </div>
          <div className="flex items-center w-full md:w-auto">
            <NotificationsNoneIcon sx={{ color: 'primary.secondary' }} className="cursor-pointer" />
            <HelpOutlineIcon sx={{ color: 'primary.secondary', marginLeft: '8px' }} className="cursor-pointer" />
            <AccountMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
