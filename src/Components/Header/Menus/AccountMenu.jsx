import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import Cookies from "js-cookie";

import { EditWorkspaceModal } from "../../Modals";
import { Link, Routes, useNavigate } from "react-router-dom";
import routes from "../../../config/routes";
import { useStorage } from "../../../Contexts";
import { useGetUserProfile } from "../../../Hooks";
import Loading from "../../Loading";

const Slot_Props = {
  paper: {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  },
};

export default function AccountMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditWorkspaceModal, setOpenEditWorkspaceModal] = useState(false);
  const { setIsLoggedIn, isLoggedIn } = useStorage();

  const { userProfile, isLoading } = useGetUserProfile(isLoggedIn);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    localStorage.clear();
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    navigate(Routes.login);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 26, height: 26, backgroundColor: "orange" }}>
              {userProfile?.avatarUrl || userProfile?.name[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={Slot_Props}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={routes.profile} className="flex w-full">
          <MenuItem sx={{ width: "100%" }}>
            <Avatar sx={{ width: 26, height: 26 }} />
            Profile
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 26, height: 26 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            setOpenEditWorkspaceModal(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <PeopleIcon fontSize="small" />
          </ListItemIcon>
          Create Workspace
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <EditWorkspaceModal
        open={openEditWorkspaceModal}
        handleClose={() => {
          setOpenEditWorkspaceModal(false);
        }}
      />
    </>
  );
}
