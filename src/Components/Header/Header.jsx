import AppsIcon from '@mui/icons-material/Apps';
import TrelloLogoIcon from '../TrelloLogoIcon/TrelloLogoIcon';
import WorkSpaces from './Menus/WorkSpaces';
import Recent from './Menus/Recent';
import Stared from './Menus/Stared';
import { Box, Button, ClickAwayListener, Fade, TextField, Tooltip } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountMenu from './Menus/AccountMenu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsTab from '../NotificationsTab';
import { useState } from 'react';
import Popper from '@mui/material/Popper';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <header className="flex flex-col items-center gap-4 justify-between w-full px-4 py-2 border-b-[1px] border-gray-300 bg-white md:flex-row">
        {/* Left Section: Logo and Menu */}
        <div className="flex items-center gap-4">
          <AppsIcon style={{ color: '#44546f', hover: '#091e420f' }} className="cursor-pointer " />
          <Link to={routes.workspaceHome} className="flex items-center gap-2 cursor-pointer ">
            <TrelloLogoIcon style={{ color: '#172b4d' }} className="w-4 h-4" />
            <span className="text-lg font-bold">Trello</span>
          </Link>
          <div className="items-center hidden space-x-4 xl:flex">
            <WorkSpaces />
            <Recent />
            <Stared />
            <Button variant="contained" size="small">
              Create
            </Button>
          </div>
        </div>
        {/* Right Section: Search and Account */}
        <div className="flex items-center gap-4">
          <div className="flex items-center w-full space-x-2 md:w-auto">
            <TextField
              id="outlined-basic"
              label="Search"
              size="small"
              type="search"
              variant="outlined"
              className="w-full ml-8 md:w-64"
            />
          </div>
          <div className="flex items-center w-full md:w-auto">
            <button className="relative" aria-describedby={id} type="button" onClick={handleClick}>
              <Tooltip title="Notifications">
                <NotificationsNoneIcon sx={{ color: 'primary.secondary' }} className="cursor-pointer" />
              </Tooltip>
            </button>
            <Popper placement="bottom-end" id={id} open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box>
                    <ClickAwayListener
                      onClickAway={() => {
                        setOpen(false);
                      }}
                    >
                      <NotificationsTab />
                    </ClickAwayListener>
                  </Box>
                </Fade>
              )}
            </Popper>
            <HelpOutlineIcon sx={{ color: 'primary.secondary', marginLeft: '8px' }} className="cursor-pointer" />
            <AccountMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
