import { useEffect, useState } from "react";
import { Avatar, Divider, Button } from "@mui/material";
import { WorkSpaceItems, UserItems } from "./constant";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Collapse from "../../Components/Collapse";
import { useGetWorkspaceByUser } from "../../Hooks";
import Loading from "../../Components/Loading";
import { useStorage } from "../../Contexts";
import { EditWorkspaceModal } from "../../Components/Modals";
import { useParams } from "react-router-dom";

const DashBoardLayout = ({ children }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, setFirstWorkspace, firstWorkspace } = useStorage();
  const { id } = useParams();

  const { workspaceInfo, isLoading, isFetching } = useGetWorkspaceByUser();

  const isActiveClassname = (path) => {
    return location.pathname === path
      ? "bg-blue-100 text-blue-700"
      : "hover:bg-gray-200";
  };

  useEffect(() => {
    if (workspaceInfo?.length && id === ":id") {
      navigate(`/workspace/${workspaceInfo[0].id}/home`);
    }
    if (!firstWorkspace && workspaceInfo?.length) {
      setFirstWorkspace(workspaceInfo[0]);
    }
    // eslint-disable-next-line
  }, [workspaceInfo, firstWorkspace]);

  return (
    <>
      <Header />
      <div className="flex justify-center w-full">
        <div className="flex w-[80%] gap-8 mt-12">
          <div className="w-1/4 text-sm text-textColor">
            <div className="flex flex-col gap-[4px]">
              {UserItems(userData?.id).map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`hover:cursor-pointer flex items-center p-2 rounded-md ${isActiveClassname(item.path)}`}
                    onClick={() => navigate(item.path)}
                  >
                    <span className="flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="ml-2 font-semibold">{item.title}</span>
                  </div>
                );
              })}
            </div>
            <div className="my-4">
              <Divider />
            </div>
            <div className="mb-3 ml-4 font-bold">Workspaces</div>
            {/* Block for each worckspace */}
            <div className="max-h-[70vh] overflow-y-auto">
              {workspaceInfo?.length ? (
                workspaceInfo.map((workspace) => {
                  return (
                    <Collapse
                      size="sm"
                      className={"rounded-lg"}
                      key={workspace.id}
                      value={workspace.id.toString() === id}
                      position="right"
                      title={
                        <div className="flex items-center gap-4 text-base">
                          <Avatar
                            sx={{ width: 24, height: 24, borderRadius: 1 }}
                          >
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
                              className={`hover:cursor-pointer pl-10 py-2 rounded-md flex items-center ${isActiveClassname(item.path)}`}
                              onClick={() => navigate(item.path)}
                            >
                              <span className="flex items-center justify-center">
                                {item.icon}
                              </span>
                              <span className="ml-2">{item.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    </Collapse>
                  );
                })
              ) : (
                <div className="ml-4 flex flex-col gap-3">
                  <div className="text-base text-textColor">
                    No workspace to show
                  </div>
                  <div className="w-full">
                    <Button
                      onClick={() => setToggleModal(true)}
                      variant="contained"
                    >
                      Create your first workspace
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
      {toggleModal && (
        <EditWorkspaceModal
          open={toggleModal}
          handleClose={() => setToggleModal(false)}
        />
      )}
      {(isLoading || isFetching) && <Loading />}
    </>
  );
};

export default DashBoardLayout;
