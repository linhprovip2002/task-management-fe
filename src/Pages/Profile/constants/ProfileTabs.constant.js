import routes from "../../../config/routes";
import { ProfileAndVisibility } from "../components/ProfileAndVisibility";

export const ProfileTabs = [
  {
    id: 1,
    title: "Profile and visibility",
    path: routes.profile,
    children: <ProfileAndVisibility />
  },
  {
    id: 2,
    title: "Activity",
    path: routes.profileActivity,
    children: <ProfileAndVisibility />
  },
  {
    id: 3,
    title: "Cards",
    path: routes.profileCards,
    children: <ProfileAndVisibility />
  },
  {
    id: 4,
    title: "Settings",
    path: routes.profileSettings,
    children: <ProfileAndVisibility />
  }
];
