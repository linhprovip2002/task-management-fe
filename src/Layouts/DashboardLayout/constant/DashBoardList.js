import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import TrelloLogoIcon from "../../../Components/TrelloLogoIcon/TrelloLogoIcon";

const DASHBOARD_LOGO_SIZE = 16;

const TrelloIcon = (
  <TrelloLogoIcon
    style={{
      color: "#44546f",
      width: DASHBOARD_LOGO_SIZE,
      height: DASHBOARD_LOGO_SIZE
    }}
  />
);

export const WorkSpaceItems = (workspaceId) => [
  {
    icon: TrelloIcon,
    title: "Boards",
    path: `/workspace/${workspaceId}/home`
  },
  {
    icon: <PeopleAltIcon fontSize="small" />,
    title: "Members",
    path: `/workspace/${workspaceId}/members`
  },
  {
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
    path: `/workspace/${workspaceId}/settings`
  }
];

export const UserItems = (id) => [
  {
    icon: TrelloIcon,
    title: "Boards",
    path: `/user/${id}/boards`
  }
];
