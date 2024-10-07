import { Avatar, Divider } from '@mui/material';
import { WorkSpaceItems, UserItems } from './constant';
import { useLocation, useNavigate } from 'react-router-dom';

const DashBoardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tempUserId = 'userId';
  const workspaceId = 'workspaceId';

  const isActiveClassname = (path) => {
    return location.pathname === path ? 'bg-blue-100' : 'hover:bg-gray-200';
  };

  return (
    <div className="flex w-full gap-8">
      <div className="w-1/4 text-sm">
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
        <div className="ml-4 font-bold">Workspace</div>
        {/* Block for each worckspace */}
        <div className="flex flex-col gap-4 ml-4 mt-4">
          <div className="flex gap-4 items-center text-base">
            <Avatar sx={{ width: 32, height: 32 }} />
            <div className="text-xl font-bold">Dashboard name</div>
          </div>
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
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
