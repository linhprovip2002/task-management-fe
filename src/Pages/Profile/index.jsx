import { Avatar } from "@mui/material";
import { useStorage } from "../../Contexts/Storage";
import { ProfileTabs } from "./constants/ProfileTabs.constant";
import { convertStringToColor } from "./helpers/convertStringToColor.js";
import { Link, useLocation } from "react-router-dom";

const tabItemStyles =
  "text-sm w-fit text-[var(--dark-slate-blue)] font-bold pt-2 pb-[9px] cursor-pointer hover:text-[var(--primary)] mr-4";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: convertStringToColor(name)
    },
    children: `${name.split(" ")?.[0]?.[0]}${name.split(" ")?.[1]?.[0]}`
  };
}

export default function Profile() {
  const location = useLocation();
  const { userData } = useStorage();

  return (
    <div>
      <div>
        <div className="max-w-[875px] pl-[48px] pr-8 py-[26px] flex">
          <div className="flex py-5">
            <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full">
              {userData?.avatarUrl ? (
                <Avatar alt={userData?.name} src={userData?.avatarUrl} />
              ) : (
                <Avatar {...stringAvatar(userData?.name || "")} />
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-[var(--text-color)] text-xl font-semibold">
                {userData?.name}
              </h2>
              <span className="text-[#44546f] text-xs">{userData?.email}</span>
            </div>
          </div>
        </div>
      </div>

      <ul className="flex mx-12 border-b-2 border-gray-200 border-solid">
        {ProfileTabs.map((tab) => {
          const tabPath = tab.path.replace(":id", userData.id);
          const isSelectedTab = location.pathname === tabPath;

          return (
            <Link
              to={tabPath}
              key={tab.id}
              className={`${tabItemStyles} ${isSelectedTab ? "text-blue-600" : ""}`}
            >
              {tab.title}
            </Link>
          );
        })}
      </ul>
      {ProfileTabs.find(
        (tab) => location.pathname === tab.path.replace(":id", userData.id)
      )?.children || null}
    </div>
  );
}
