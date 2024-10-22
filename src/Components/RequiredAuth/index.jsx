import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useStorage } from "../../Contexts";
import routes from "../../config/routes";
import Cookies from "js-cookie";

export const RequiredAuth = () => {
  const { setIsLoggedIn } = useStorage();
  const navigate = useNavigate();
  const token = Cookies.get("authToken");

  useEffect(() => {
    if (!!token) {
      setIsLoggedIn(true);
    } else {
      navigate(routes.login);
    }
    // eslint-disable-next-line
  }, [token]);

  return <Outlet />;
};
