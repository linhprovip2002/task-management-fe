import { Avatar, Divider } from "@mui/material";
import { WorkSpaceItems, UserItems } from "./constant";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Collapse from "../../Components/Collapse";

const DashBoardLayout = ({ children }) => {
  const tempWorkSpace = [1, 2, 3];
  const location = useLocation();
  const navigate = useNavigate();

  const tempUserId = "userId";
  const workspaceId = "workspaceId";

  const isActiveClassname = (path) => {
    return location.pathname === path ? "bg-blue-100" : "hover:bg-gray-200";
  };

  return (
    <>
      <Header />
      <div className="flex w-full justify-center">
        <div className="flex w-3/4 gap-8 mt-4">
          <div className="w-1/4 text-sm text-textColor">
            <div className="flex flex-col gap-4 ml-4 mt-4">
              {UserItems(tempUserId).map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`hover:cursor-pointer p-2 rounded-md ${isActiveClassname(item.path)}`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </div>
                );
              })}
            </div>
            <div className="my-4">
              <Divider />
            </div>
            <div className="ml-4 font-bold">Workspaces</div>
            {/* Block for each worckspace */}
            {tempWorkSpace.map((workspace, index) => {
              return (
                <>
                  <Collapse
                    value={false}
                    position="right"
                    title={
                      <div className="flex gap-4 items-center text-base">
                        <Avatar sx={{ width: 28, height: 28 }} />
                        <div className="text-xl font-bold">Dashboard name</div>
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-4 ml-4 mt-4">
                      {WorkSpaceItems(workspaceId).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={`hover:cursor-pointer pl-10 py-2 rounded-md ${isActiveClassname(item.path)}`}
                            onClick={() => navigate(item.path)}
                          >
                            {item.icon}
                            <span className="ml-2">{item.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </Collapse>
                </>
              );
            })}
          </div>
          <div className="w-full mt-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
