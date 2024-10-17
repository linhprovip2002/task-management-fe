import { Switch } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import NotificationsItem from './NotificationItem';
import Wrapper from '../Wrapper';
import NotifySetting from '../NotifySetting';
import HeadlessTippy from '@tippyjs/react/headless';

const NotificationsTab = React.forwardRef((props, ref) => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const handleOpenSetting = (event) => {
    setIsOpenSetting(!isOpenSetting);
  };

  const handleReadAll = () => {};

  return (
    <div
      ref={ref}
      className="NotificationsTab bg-white mt-2 shadow-lg rounded-xl w-[400px] border-[1px] border-solid border-slate-200 max-h-[623px] select-none"
    >
      <div className="mt-10 mx-[10px] pb-1 border-b-1">
        <div className="flex justify-between border-b-[1px] border-solid border-slate-200">
          <h2 className="text-[20px] text-[var(--text-color)] font-semibold">Notifications</h2>
          <div>
            <span className="text-[12px] text-[var(--light-gray)]">Only show unread</span>
            <Switch
              defaultChecked
              sx={{
                '& .css-jsexje-MuiSwitch-thumb': {
                  backgroundColor: '#fff',
                },
              }}
            />
            <HeadlessTippy
              visible={isOpenSetting}
              onClickOutside={handleOpenSetting}
              interactive
              placement="bottom-end"
              offset={[10, 10]}
              render={() => (
                <Wrapper>
                  <NotifySetting onClose={handleOpenSetting} />
                </Wrapper>
              )}
            >
              <button onClick={handleOpenSetting}>
                <MoreVertIcon className="text-[var(--light-gray)] cursor-pointer hover:bg-slate-200 rounded-sm" />
              </button>
            </HeadlessTippy>
          </div>
        </div>
        <div onClick={handleReadAll} className="flex justify-end py-2 pl-3 pr-4">
          <span className="text-[var(--light-gray)] text-[12px] hover:underline cursor-pointer">Mark all as read</span>
        </div>
      </div>
      <div className="bg-[var(--light-blue)] rounded-b-xl">
        <div className="py-2 max-h-[500px] overflow-y-scroll">
          <NotificationsItem peddingButton="Review peding request" />
          <NotificationsItem />
          <NotificationsItem />
          <NotificationsItem />
          <NotificationsItem />
        </div>
      </div>
    </div>
  );
});

export default NotificationsTab;
