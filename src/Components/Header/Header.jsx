import AppsIcon from "@mui/icons-material/Apps";
import TrelloLogoIcon from "../TrelloLogoIcon/TrelloLogoIcon";
import WorkSpaces from "./Menus/WorkSpaces";
import Stared from "./Menus/Stared";
import { Box, ClickAwayListener, Fade, TextField, Tooltip } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountMenu from "./Menus/AccountMenu";
import NotificationsTab from "../NotificationsTab";
import { useEffect, useState } from "react";
import Popper from "@mui/material/Popper";
import { Link } from "react-router-dom";
import Create from "./Menus/Create";
import { useStorage } from "../../Contexts";
import HeadlessTippy from "@tippyjs/react/headless";
import SearchPopper from "./SearchPopper";
import { useDebounce } from "../../Hooks";
import { userServices } from "../../Services";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchPopper, setSearchPopper] = useState(false);
  const { firstWorkspace, isLoggedIn } = useStorage();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);
  const [searching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  useEffect(() => {
    if (searchValue.trim() !== "") {
      setIsSearching(true);
      userServices
        .searchGlobal({ searchValue: debounceValue })
        .then((res) => {
          setSearchResult(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsSearching(false);
        });
    } else {
      setSearchResult({});
    }
    // eslint-disable-next-line
  }, [debounceValue]);

  return (
    <>
      <header className="flex flex-col items-center gap-4 justify-between w-full px-4 py-2 border-b-[1px] border-gray-300 bg-white md:flex-row">
        <div className="flex items-center gap-4">
          <div className="m-1 rounded-md cursor-pointer hover:bg-hoverBackground">
            <AppsIcon style={{ color: "#44546f", hover: "#091e420f" }} className="m-1" />
          </div>
          <Link
            to={`/workspace/${firstWorkspace?.id || ":id"}/home`}
            className="m-1 rounded-md cursor-pointer hover:bg-hoverBackground"
          >
            <div className="flex items-center gap-2 m-1">
              <TrelloLogoIcon style={{ color: "#172b4d" }} className="w-4 h-4" />
              <span className="text-lg font-bold">Trello</span>
            </div>
          </Link>
          <div className="items-center hidden space-x-4 xl:flex">
            {isLoggedIn && <WorkSpaces />}
            <Stared />
            <Create />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <HeadlessTippy
            onClickOutside={() => setSearchPopper(false)}
            placement="bottom-start"
            visible={searchPopper}
            interactive
            render={() => <SearchPopper loading={searching} searchResult={searchResult} />}
          >
            <div className="flex items-center w-full space-x-2 md:w-auto">
              <TextField
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchPopper(true)}
                id="outlined-basic"
                label="Search"
                size="small"
                variant="outlined"
                className="w-full ml-8 md:w-64"
              />
            </div>
          </HeadlessTippy>
          <div className="flex items-center w-full md:w-auto">
            <button className="relative" aria-describedby={id} type="button" onClick={handleClick}>
              <Tooltip title="Notifications">
                <NotificationsNoneIcon sx={{ color: "primary.secondary" }} className="cursor-pointer" />
              </Tooltip>
            </button>
            <Popper sx={{ zIndex: 500 }} placement="bottom-end" id={id} open={open} anchorEl={anchorEl} transition>
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
            <AccountMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
