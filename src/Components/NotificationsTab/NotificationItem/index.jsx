import React from 'react';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { Avatar } from '@mui/material';

function NotificationsItem(props) {
  return (
    <div className="relative flex mr-12 ml-4 mb-3 bg-white rounded-xl border-[1px] border-solid border-slate-200  shadow-sm">
      <div className="flex flex-col flex-1">
        <div className="py-[6px] px-2 flex items-center text-[var(--light-gray)]">
          <PeopleOutlinedIcon fontSize="small" />
          <span>BKDN</span>
        </div>
        <div className="bg-[var(--hover-background)]">
          <div className="flex pt-4 px-2 items-center">
            <Avatar sx={{ bgcolor: `var(--primary)`, width: 24, height: 24 }}>N</Avatar>
            <div className="ml-2 flex flex-col items-start">
              <span className="font-bold text-[14px] text-[var(--text-color)]">Đặng Quang Nhật Linh</span>
              <div className="text-[14px] font-normal text-[var(--text-color)] text-left flex-col flex">
                <span>Added you to the Workspace BKDN as admin</span>
                <span className="text-[12px]">Oct 6, 2024, 8:54 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4 h-4 rounded-full bg-[var(--primary)] absolute right-[-36px] top-0"></div>
    </div>
  );
}

NotificationsItem.propTypes = {};

export default NotificationsItem;
