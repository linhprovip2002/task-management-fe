import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const MorePoperAttach = ({ handleCloseMore, handleDeleteFile }) => {
  return (
    <div className="absolute w-[200px] bg-white rounded-md px-1 py-1 font-medium text-[12px] z-50 shadow-[0_3px_10px_rgba(0,0,0,0.3)]">
      <div className="flex items-center mb-1 float-end">
        <p className="mr-2 text-md">Delete file?</p>
        <CloseIcon
          onClick={handleCloseMore}
          className="cursor-pointer flex float-end p-1 top-1 rounded-[4px] hover:bg-gray-100"
        />
      </div>
      <div className="p-1">
        <button onClick={handleDeleteFile} className="w-full p-2 text-left text-white bg-red-600 rounded-sm hover:bg-red-700 my-1rounded-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default MorePoperAttach;
