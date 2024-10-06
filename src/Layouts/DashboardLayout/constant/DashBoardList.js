import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";

export const WorkSpaceItems = (workspaceId) => [
  {
    icon: <SpaceDashboardIcon />,
    title: "Boards",
    path: `/workspace/${workspaceId}/home`
  },
  {
    icon: <FavoriteIcon />,
    title: "Highlights",
    path: `/workspace/${workspaceId}/highlights`
  },
  {
    icon: <GridViewIcon />,
    title: "Views",
    path: `/workspace/${workspaceId}/views`
  },
  {
    icon: <PeopleAltIcon />,
    title: "Members",
    path: `/workspace/${workspaceId}/members`
  },
  {
    icon: <SettingsIcon />,
    title: "Settings",
    path: `/workspace/${workspaceId}/settings`
  }
];

export const UserItems = (id) => [
  {
    icon: <SpaceDashboardIcon />,
    title: "Boards",
    path: `/user/${id}/boards`
  },
  {
    icon: <HomeIcon />,
    title: "Home",
    path: "/"
  }
];
