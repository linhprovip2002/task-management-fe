import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import NorthEastIcon from '@mui/icons-material/NorthEast';
function NotifySetting({ onClose }) {
  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="NotifySetting flex flex-col w-[304px] pb-2">
      <div className="flex items-center px-2 py-1">
        <div className="flex-1 flex justify-center">
          <h3 className="text-[14px] text-[#44546f] font-[600]">Notifications settings</h3>
        </div>
        <button
          onClick={handleClose}
          className="float-right w-8 h-8 rounded-lg hover:bg-[var(--hover-background)] flex items-center justify-center"
        >
          <CloseIcon fontSize="small" className="cursor-pointer" />
        </button>
      </div>
      <div className="flex flex-col items-start">
        <div className="w-full px-3 my-1">
          <h3 className="text-[12px] text-[var(--text-color)] font-[700]">Notifications email frequency</h3>
          <select className="w-full border-[1px] border-[#7A869A] border-solid py-1 px-2 rounded-sm">
            <option className="text-[var(--text-color)]">Never</option>
            <option className="text-[var(--text-color)]">Preodically</option>
            <option className="text-[var(--text-color)]">Instantly</option>
          </select>
        </div>

        <button className=" hover:bg-[var(--hover-background)] text-[14px] text-[var(--text-color)] font-normal py-[6px] px-3 w-full text-left">
          <span>Allow desktop notifications</span>
        </button>
        <button className="flex justify-between hover:bg-[var(--hover-background)] text-[14px] text-[var(--text-color)] font-normal py-[6px] px-3 w-full text-left">
          <span>All notifications settings</span>
          <NorthEastIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}

NotifySetting.propTypes = {};

export default NotifySetting;
