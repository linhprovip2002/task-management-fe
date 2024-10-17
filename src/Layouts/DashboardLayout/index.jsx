import { Avatar, Divider } from "@mui/material";
import { WorkSpaceItems, UserItems } from "./constant";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Collapse from "../../Components/Collapse";
import { useGetWorkspaceByUser } from "../../Hooks";
import Loading from "../../Components/Loading";
import { useStorage } from "../../Contexts";

const DashBoardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useStorage();

  const { workspaceInfo, isLoading } = useGetWorkspaceByUser();

  const isActiveClassname = (path) => {
    return location.pathname === path ? "bg-blue-100" : "hover:bg-gray-200";
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="flex justify-center w-full">
        <div className="flex w-[80%] gap-8 mt-12">
          <div className="w-1/4 text-sm text-textColor">
            <div className="flex flex-col gap-[4px]">
              {UserItems(userData.id).map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`hover:cursor-pointer p-2 rounded-md ${isActiveClassname(item.path)}`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    <span className="ml-2 font-semibold">{item.title}</span>
                  </div>
                );
              })}
            </div>
            <div className="my-4">
              <Divider />
            </div>
            <div className="ml-4 font-bold mb-3">Workspaces</div>
            {/* Block for each worckspace */}
            <div className="max-h-[70vh] overflow-y-auto">
              {workspaceInfo.map((workspace) => {
                return (
                  <Collapse
                    size="sm"
                    className={"rounded-lg"}
                    key={workspace.id}
                    value={false}
                    position="right"
                    title={
                      <div className="flex items-center gap-4 text-base">
                        <Avatar sx={{ width: 28, height: 28, borderRadius: 1 }}>
                          {workspace.title[0]}
                        </Avatar>
                        <div className="text-sm font-bold">
                          {workspace.title}
                        </div>
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-[4px]">
                      {WorkSpaceItems(workspace.id).map((item, index) => {
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
                );
              })}
            </div>
          </div>
          <div className="w-full mt-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
