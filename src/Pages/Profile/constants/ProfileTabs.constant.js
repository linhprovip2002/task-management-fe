import routes from "../../../config/routes";
import { ProfileAndVisibility } from "../components/ProfileAndVisibility";
import { Privacy } from "../components/Privacy";

export const ProfileTabs = [
  {
    title: "Profile and visibility",
    path: routes.profile,
    children: <ProfileAndVisibility />
  },
  {
    title: "Activity",
    path: routes.profileActivity,
    children: <ProfileAndVisibility />
  },
  {
    title: "Cards",
    path: routes.profileCards,
    children: <ProfileAndVisibility />
  },
  {
    title: "Privacy",
    path: routes.profilePrivacy,
    children: <Privacy />
  },
  {
    title: "Settings",
    path: routes.profileSettings,
    children: <ProfileAndVisibility />
  }
];
