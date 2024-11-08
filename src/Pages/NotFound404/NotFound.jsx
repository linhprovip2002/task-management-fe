import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import routes from "../../config/routes";
import { useEffect } from "react";

export const NotFound = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    // remove all cookies
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    navigate(routes.login);
  };

  useEffect(() => {
    if (Cookies.get("authToken")) {
      navigate(routes.workspaceHome);
    }
    // eslint-disable-next-line
  }, [Cookies.get("authToken")]);

  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col text-center gap-4">
      <div className="text-2xl text-slate-500 font-semibold">
        Page not found.
      </div>
      <div className="text-xl">
        This page may be private. If someone gave you this link, you may need to
        be
        <br />a board or Workspace member to access it.
      </div>
      <div>
        <span
          className="text-blue-700 hover:underline hover:cursor-pointer"
          onClick={handleLogOut}
        >
          Go back to Login
        </span>
      </div>
    </div>
  );
};
