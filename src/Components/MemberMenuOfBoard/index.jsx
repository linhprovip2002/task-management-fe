import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const MemberMenu = ({ position, handleCloseShowMenuBtnCard }) => {
  return (
    <div
      style={{ top: position.top, left: position.left }}
      className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50 shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
    >
      <div className="text-center p-2 mx-8">Member</div>
      <div className="mx-2">
        <div className="mx-1 border-2 border-gray-500 rounded-lg">
          <input
            type="text"
            // value={item.descriptionCard}
            // onChange={(e) => handleChange(e, index)}
            placeholder="Search for members"
            className="w-full bg-white rounded-lg text-base font-[200] px-2 py-1 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-2">
          <div className="py-2 bg-white">Member of the card</div>
          <div className="flex items-center justify-between cursor-pointer px-1 py-2 bg-white rounded transition duration-200 hover:bg-gray-100">
            <div className="flex items-center">
              <div className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mr-1 font-bold text-white text-[12px] bg-gradient-to-b from-green-400 to-blue-500">
                PM
              </div>
              <div>Cheese</div>
            </div>
            <CloseIcon className="cursor-pointer right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 " />
          </div>
        </div>
        <div className="mt-2">
          <div className="py-2 bg-white">Members of the board</div>
          <div className="flex items-center justify-between cursor-pointer px-1 py-2 bg-white rounded transition duration-200 hover:bg-gray-100">
            <div className="flex items-center">
              <div className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mr-1 font-bold text-white text-[12px] bg-gradient-to-b from-green-400 to-blue-500">
                PQ
              </div>
              <div>phomaique</div>
            </div>
          </div>
        </div>
        <CloseIcon
          onClick={handleCloseShowMenuBtnCard}
          className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
        />
      </div>
    </div>
  );
};

export default MemberMenu;
