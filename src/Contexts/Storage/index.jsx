import { createContext, useContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

export const StorageContext = createContext();

function GlobalStates({ children }) {
  const [currentUser, setCurrentUser] = useState(false);
  const [userData, setUserData] = useState({});

  const states = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser, // Đẵ đăng nhập hay chưa
    userData, // dữ liệu người dùng sau khi đăng nhập
    setUserData,
  };

  useEffect(() => {
    // const authToken = Cookies.get('authToken');
    // call api get profile
  }, []);

  return <StorageContext.Provider value={states}>{children}</StorageContext.Provider>;
}

export default GlobalStates;

export const useStorage = () => {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error('useEditCompanyContext must be used within a EditCompanyProvider');
  }

  return context;
};
