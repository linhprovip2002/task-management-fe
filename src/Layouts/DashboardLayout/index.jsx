import { Avatar, Divider } from '@mui/material';
import { WorkSpaceItems, UserItems } from './constant';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Collapse from '../../Components/Collapse';
import { useGetWorkspaceByUser } from '../../Hooks';

const DashBoardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tempUserId = 'userId';
  // const workspaceId = "workspaceId";

  const { workspaceInfo, isLoading } = useGetWorkspaceByUser();
  console.log(workspaceInfo);

  const isActiveClassname = (path) => {
    return location.pathname === path ? 'bg-blue-100' : 'hover:bg-gray-200';
  };

  if (isLoading) {
    return <div className='text-center'>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex justify-center w-full">
        <div className="flex w-[80%] gap-8 mt-12">
          <div className="w-1/4 text-sm text-textColor">
            <div className="flex flex-col gap-4 ml-4">
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
            {workspaceInfo.map((workspace) => {
              return (
                <>
                  <Collapse
                    key={workspace.id}
                    value={false}
                    position="right"
                    title={
                      <div className="flex items-center gap-4 text-base">
                        <Avatar sx={{ width: 28, height: 28 }}>{workspace.title[0]}</Avatar>
                        <div className="text-xl font-bold">{workspace.title}</div>
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-4 ml-4">
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
