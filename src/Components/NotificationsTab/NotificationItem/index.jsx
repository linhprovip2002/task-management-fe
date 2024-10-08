import React, { useState } from 'react';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { Avatar, Button } from '@mui/material';

function NotificationsItem({ isReaded = false, onAfterRead, peddingButton = '' }) {
  const [isReadedState, setIsReadedState] = useState(isReaded);
  const handleMarkReaded = (e) => {
    setIsReadedState((prev) => !prev);
    handleAfterRead(e);
  };

  const handleAfterRead = (e) => {
    if (onAfterRead) return onAfterRead(e);
  };

  return (
    <div className="NotifyItem relative flex mr-12 ml-4 mb-3 bg-white rounded-xl border-[1px] border-solid border-slate-200  shadow-sm">
      <div className="flex flex-col flex-1">
        <div className="py-[6px] px-2 flex items-center text-[var(--light-gray)]">
          <PeopleOutlinedIcon fontSize="small" />
          <span>BKDN</span>
        </div>
        <div className="bg-[var(--hover-background)] rounded-b-xl">
          <div className="flex pt-4 px-2 items-start">
            <Avatar sx={{ bgcolor: `var(--primary)`, width: 24, height: 24 }}>N</Avatar>
            <div className="ml-2 flex flex-col items-start pb-2">
              <span className="font-bold text-[14px] text-[var(--text-color)]">Đặng Quang Nhật Linh</span>
              <div className="text-[14px] font-normal text-[var(--text-color)] text-left flex-col flex">
                <span>Added you to the Workspace BKDN as admin</span>
                <span className="text-[12px]">Oct 6, 2024, 8:54 PM</span>
                {peddingButton && (
                  <div>
                    <Button
                      sx={{ my: 1, backgroundColor: '#091E420F', color: 'var(--text-color)', textTransform: 'none' }}
                      size="small"
                      variant="contained"
                    >
                      {peddingButton}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={handleMarkReaded}
        className="absolute right-[-36px] top-0 w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-[#cce0ff] rounded-sm"
      >
        {isReadedState ? (
          <div className="w-4 h-4 rounded-full bg-[var(--primary)]"></div>
        ) : (
          <div className="w-4 h-4 rounded-full bg-white  border-solid border-[1px] border-[var(--border-gray)]"></div>
        )}
      </div>
    </div>
  );
}

NotificationsItem.propTypes = {};

export default NotificationsItem;
