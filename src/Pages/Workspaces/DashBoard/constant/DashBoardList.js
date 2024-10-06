import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";

export const WorkSpaceItems = [
  {
    icon: <SpaceDashboardIcon />,
    title: "Boards",
    path: "/dashboard"
  },
  {
    icon: <FavoriteIcon />,
    title: "Highlights",
    path: "/highlights"
  },
  {
    icon: <GridViewIcon />,
    title: "Views",
    path: "/views"
  },
  {
    icon: <PeopleAltIcon />,
    title: "Members",
    path: "/members"
  },
  {
    icon: <SettingsIcon />,
    title: "Settings",
    path: "/settings"
  }
];
