import { createContext, useContext, useEffect, useState } from "react";
import { useGetUserProfile } from "../../Hooks";
import Cookies from "js-cookie";

export const StorageContext = createContext();

function GlobalStates({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [defaultWorkspace, setDefaultWorkspace] = useState({});
  const [listBoard, setListBoard] = useState([]);

  const states = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn, // Đẵ đăng nhập hay chưa
    userData, // dữ liệu người dùng sau khi đăng nhập
    setUserData,
    defaultWorkspace,
    setDefaultWorkspace,
    listBoard,
    setListBoard
  };

  const { userProfile } = useGetUserProfile(isLoggedIn);

  useEffect(() => {
    setIsLoggedIn(
      (userProfile && Object.keys(userProfile).length > 0) ||
        !!Cookies.get("authToken")
    );
    setUserData(userProfile);
  }, [userProfile]);

  return (
    <StorageContext.Provider value={states}>{children}</StorageContext.Provider>
  );
}

export default GlobalStates;

export const useStorage = () => {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error(
      "useEditCompanyContext must be used within a EditCompanyProvider"
    );
  }

  return context;
};
