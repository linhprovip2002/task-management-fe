import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../../Services/API/Auth";

export const StorageContext = createContext();

function GlobalStates({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [defaultWorkspace, setDefaultWorkspace] = useState({});

  const states = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn, // Đẵ đăng nhập hay chưa
    userData, // dữ liệu người dùng sau khi đăng nhập
    setUserData,
    defaultWorkspace,
    setDefaultWorkspace
  };

  useEffect(() => {
    getProfile()
      .then((res) => {
        setIsLoggedIn(true);
        setUserData(res);
      })
      .catch((err) => {});
  }, []);

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
