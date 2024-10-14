import { Button, Divider, TextField } from '@mui/material';
import React from 'react';
import PublicIcon from '@mui/icons-material/Public';

const tabItemStyles =
  'text-sm w-fit text-[var(--dark-slate-blue)] font-bold pt-2 pb-[9px] cursor-pointer hover:text-[var(--primary)] mr-4';
export default function Profile() {
  return (
    <div>
      <div>
        <div className="max-w-[875px] pl-[48px] pr-8 py-[26px] flex">
          <div className="py-5 flex">
            <div className="flex justify-center items-center w-12 h-12 rounded-full mr-4">
              <img
                className="w-full h-full object-cover rounded-full"
                src="https://trello-members.s3.amazonaws.com/6411cb0b756e170127733b34/3cb3638a4c4bac4f4213caa087029bb6/170.png"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[var(--text-color)] text-xl font-semibold">Nhân Bùi</h2>
              <span className="text-[#44546f] text-xs">@nhanbui32</span>
            </div>
          </div>
        </div>
      </div>

      <ul className="mx-12 border-b-2 border-gray-200 border-solid flex">
        <li className={tabItemStyles}>Profile and visibility</li>
        <li className={tabItemStyles}>Activity</li>
        <li className={tabItemStyles}>Cards</li>
        <li className={tabItemStyles}>Settings</li>
      </ul>

      <div className="max-w-[900px] p-8 m-auto">
        <div className="max-w-[530px] m-auto flex flex-col">
          <img className="mt-[18px] mb-12" src="https://trello.com/assets/eff3d701a9c3a71105ea.svg" alt="" />

          <h3 className="mb-2 mt-10 text-[20px] font-semibold text-[var(--text-color)]">About</h3>
          <Divider component={'div'} />

          <div className="flex flex-col ">
            <div className="flex my-3 justify-between">
              <label className="pt-4 text-sm text-[var(--text-color)] font-semibold">Username</label>
              <div className="pt-4 flex items-center text-[var(--dark-slate-blue)]">
                <PublicIcon color="#44546f" sx={{ width: '16px', height: '16px', mr: 0.5 }} />
                <div className="text-xs">Always public</div>
              </div>
            </div>
            <TextField
              sx={{
                '& .MuiInputBase-input': {
                  paddingY: '8px',
                  paddingX: '12px',
                  fontSize: 14,
                },
              }}
            />
          </div>

          <div className="flex flex-col ">
            <div className="flex my-3 justify-between">
              <label className="pt-4 text-sm text-[var(--text-color)] font-semibold">Bio</label>
              <div className="pt-4 flex items-center text-[var(--dark-slate-blue)]">
                <PublicIcon color="#44546f" sx={{ width: '16px', height: '16px', mr: 0.5 }} />
                <div className="text-xs">Always public</div>
              </div>
            </div>
            <textarea className="border border-gray-500 border-solid" />
          </div>

          <Button
            variant="contained"
            sx={{
              mt: 4,
              textTransform: 'none',
              height: '32px',
              paddingY: '6px',
              paddingX: '12px',
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
