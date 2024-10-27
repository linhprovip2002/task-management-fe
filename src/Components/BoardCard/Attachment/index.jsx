import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Attachment = ({
  quantityFile,
  showImage,
  fileToShow,
  open,
  handleClose,
  handleShowImage,
  handleHideImage,
  formatDate,
  postUploadedFiles
}) => {
  return (
    <div>
      {fileToShow.map((item) => {
        return (
          <div key={item.id} className="flex items-center justify-between my-3 ">
            <div className="flex items-center">
              <div className="w-[60px]  h-[40px]">
                <img
                  src={item.url}
                  alt="attachment"
                  className="rounded-[4px] cursor-pointer object-cover w-full h-full"
                />
              </div>
              <div className="ml-3">
                <p className="text-gray-700 text-[13px]">{item.name}</p>
                <p className="text-[12px] font-normal text-gray-500">Added {formatDate(item.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <ArrowOutwardIcon sx={{ cursor: "pointer", width: "14px", height: "14px" }} />
              <button onClick={open} className="px-1 ml-3 py-[2px] rounded-sm bg-gray-300">
                <MoreHorizIcon />
              </button>
            </div>
          </div>
        );
      })}
      {postUploadedFiles.length > 4 && (
        <div>
          {showImage ? (
            <button onClick={handleHideImage} className="px-4 py-1 bg-gray-300 rounded-sm">
              Show fewer attachments
            </button>
          ) : (
            <button onClick={handleShowImage} className="px-4 py-1 bg-gray-300 rounded-sm">
              View all attachments ({quantityFile} {"hidden"})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Attachment;
