import React from 'react';
import TrelloLogoIcon from '../../Components/TrelloLogoIcon/TrelloLogoIcon';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Divider from '@mui/material/Divider';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Board from '../Board';
import Collapse from '../../Components/Collapse';

const Home = () => {
  return (
    <>
      <div className="mx-[93px] mt-10 flex">
        <sidebar className="px-4  w-[256px]">
          <div>
            <div className="flex items-center text-[14px] color-[#44546f] cursor-pointer py-3">
              <TrelloLogoIcon style={{ color: '#44546f', width: '18px', height: '18px' }} />
              <p className="ml-3 font-medium">Bảng</p>
            </div>
            <div className="flex items-center text-[14px] color-[#44546f] cursor-pointer py-3">
              <TrelloLogoIcon style={{ color: '#44546f', width: '18px', height: '18px' }} />
              <p className="ml-3 font-medium">Mẫu</p>
            </div>
            <div className="flex items-center text-[14px] color-[#44546f] cursor-pointer py-3">
              <ShowChartIcon style={{ color: '#44546f', width: '18px', height: '18px' }} />
              <p className="ml-3 font-medium">Trang chủ</p>
            </div>
          </div>
          <Divider sx={{ width: '224px' }} />
          <div>
            <p className="text-[14px] my-3">Các không gian làm việc</p>
            <ul className="overflow-y-auto">
              <li className="py-3 px-1 cursor-pointer rounded-md font-medium text-[14px] hover:bg-[rgb(245,249,254)]">
                Không gian 1
              </li>
              <li className="py-3 px-1 cursor-pointer rounded-md font-medium text-[14px] hover:bg-[rgb(245,249,254)]">
                Không gian 2
              </li>
              <li className="py-3 px-1 cursor-pointer rounded-md font-medium text-[14px] hover:bg-[rgb(245,249,254)]">
                Không gian 3
              </li>
              <li className="py-3 px-1 cursor-pointer rounded-md font-medium text-[14px] hover:bg-[rgb(245,249,254)]">
                Không gian 4
              </li>
            </ul>
          </div>
        </sidebar>
        <div className="w-full">
          <div className="p-8">
            <h2 className="text-2xl font-bold uppercase text-[#44546f]">Không gian làm việc 1</h2>
            <span className="text-[#44546f] text-[12px] flex items-center font-normal">
              <LockIcon sx={{ width: '12px', height: '12px' }} /> private
            </span>
          </div>
          <Divider sx={{ width: 'full', margin: '8px 0' }} />
          <div className="pl-3">
            <div className="flex items-center my-2">
              <PersonIcon sx={{ width: '18px', height: '18px' }} />
              <p className="text-lg font-medium text-[#44546f]">Các bảng của bạn</p>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              <div className="">
                <Board />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
