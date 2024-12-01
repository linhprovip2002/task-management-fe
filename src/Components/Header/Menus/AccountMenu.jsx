import { useState } from "react";
import Cookies from "js-cookie";
import { EditWorkspaceModal } from "../../Modals";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../config/routes";
import { useStorage } from "../../../Contexts";
import { useGetUserProfile } from "../../../Hooks";
import Loading from "../../Loading";
import HeadlessTippy from "@tippyjs/react/headless";
import { Avatar, Divider } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { stringAvatar } from "../../../Utils/color";

export const styleCSS =
  "block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100";

export default function AccountMenu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openEditWorkspaceModal, setOpenEditWorkspaceModal] = useState(false);
  const { setIsLoggedIn, isLoggedIn } = useStorage();
  const { userProfile, isLoading } = useGetUserProfile(isLoggedIn);
  const { userData } = useStorage();

  const handleLogout = async () => {
    setIsLoggedIn(false);
    localStorage.clear();
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userId");
    navigate("/login");
  };

  if (isLoading || !userData) return <Loading />;

  return (
    <>
      <HeadlessTippy
        interactive={true}
        visible={isMenuOpen} // Điều khiển mở/đóng menu
        onClickOutside={() => setIsMenuOpen(false)} // Đóng menu khi click ra ngoài
        render={(attrs) => (
          <div
            className="w-64 py-2 bg-white border border-gray-300 border-solid rounded-lg shadow-lg"
            tabIndex="-1"
            {...attrs}
          >
            <p className="px-4 my-2 font-semibold text-gray-600 text-[12px]">
              ACCOUNT
            </p>
            <div className="flex items-center">
              <div className="flex items-center px-4 py-2">
                <Avatar
                  {...stringAvatar(userProfile?.name)}
                  alt={userProfile?.name}
                  src={userProfile?.avatarUrl || ""}
                />
                <div className="ml-2">
                  <p className="text-[15px] font-normal">{userProfile?.name}</p>
                  <p className="text-[12px] font-normal">{userProfile.email}</p>
                </div>
              </div>
            </div>
            <Divider />
            <p className="px-4 my-3 font-semibold text-gray-600 text-[12px]">
              TRELLO
            </p>
            <Link
              to={routes.profile.replace(":id", userData.id)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile and visibility
            </Link>
            <div className="my-2 border-t border-gray-200"></div>
            <button
              onClick={() => {
                setOpenEditWorkspaceModal(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            >
              <PeopleAltIcon sx={{ fontSize: "15px", marginRight: "8px" }} />
              <p>Create Workspace</p>
            </button>
            <Divider />
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center ml-4 text-gray-700"
        >
          <Avatar
            {...stringAvatar(userData?.name)}
            alt={userData?.name}
            src={userData?.avatarUrl || ""}
          />
        </button>
      </HeadlessTippy>

      <EditWorkspaceModal
        open={openEditWorkspaceModal}
        handleClose={() => setOpenEditWorkspaceModal(false)}
      />
    </>
  );
}
