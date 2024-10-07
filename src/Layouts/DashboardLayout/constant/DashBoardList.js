import FavoriteIcon from "@mui/icons-material/Favorite";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import TrelloLogoIcon from "../../../Components/TrelloLogoIcon/TrelloLogoIcon";

const TrelloIcon = (
  <TrelloLogoIcon style={{ color: "#44546f", width: "18px", height: "18px" }} />
);

export const WorkSpaceItems = (workspaceId) => [
  {
    icon: TrelloIcon,
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
    icon: TrelloIcon,
    title: "Boards",
    path: `/user/${id}/boards`
  },
  {
    icon: <HomeIcon />,
    title: "Home",
    path: "/"
  }
];
