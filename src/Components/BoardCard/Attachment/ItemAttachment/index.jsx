import React, { useState } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Zoom from "react-medium-image-zoom";
import DeleteIcon from "@mui/icons-material/Delete";

import MorePoperAttach from "../MorePoperAttach";
import { formatDate } from "../../WriteComment/helpers/formatDate";
import { apiDeleteFile } from "../../../../Services/API/ApiUpload/apiUpload";
import { useGetCardById } from "../../../../Hooks";

const ItemAttachment = ({
  item,
  moreRef,
  handleCloseMore,
  openMore,
  handleOpenMore,
  setPostUploadedFiles
}) => {
  const [openImg, setOpenImg] = useState(false);
  const handleImageClick = () => setOpenImg(true);
  const handleCloseImageClick = () => setOpenImg(false);
  const cardId = localStorage.getItem("cardId");
  const { idBoard } = useParams();
  // eslint-disable-next-line
  const { data: dataCard } = useGetCardById(idBoard, cardId);
  
  const handleDeleteFile = async (idBoard, cardId, fileId) => {
    try {
      await apiDeleteFile(idBoard, cardId, fileId);
      setPostUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
      toast.success("File deleted successfully!");
    } catch (error) {
      console.error("Failed to delete file:", error);
      toast.error("Failed to delete file.");
    }
  };

  return (
    <div className="flex items-center justify-between my-3">
      <div className="flex items-center">
        <img
          onClick={handleImageClick}
          src={item.url}
          alt="attachment"
          className="rounded-[4px] cursor-pointer object-cover w-[60px] h-[40px]"
        />
        <div className="ml-3">
          <p className="text-gray-700 text-[13px] truncate max-w-[240px] whitespace-nowrap">
            {item.name}
          </p>
          <p className="text-[12px] font-normal text-gray-500">
            Added {formatDate(item.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Link className="cursor-pointer" to={item.url} target="_blank">
          <ArrowOutwardIcon
            sx={{ cursor: "pointer", width: "14px", height: "14px" }}
          />
        </Link>
        <div className="more-poper" ref={moreRef}>
          <button
            onClick={() => handleOpenMore(item.id)}
            className="px-1 ml-3 py-[2px] rounded-sm bg-gray-300"
          >
            <MoreHorizIcon />
          </button>
          {openMore === item.id && (
            <MorePoperAttach
              handleOpenMore={handleOpenMore}
              handleCloseMore={handleCloseMore}
              handleDeleteFile={() => handleDeleteFile(idBoard, cardId, item.id)}
            />
          )}
        </div>
      </div>
      <Modal open={openImg}>
        <Box justifyContent="center" alignItems="center">
          <div className="z-50 w-[1360px] h-[640px] m-auto text-center bg-black bg-opacity-50 overflow-y-auto">
            <Zoom className="items-center justify-center text-center">
              <img
                src={item.url}
                alt="attachment"
                className="rounded-[4px] p-4 cursor-pointer object-cover w-full h-full"
              />
            </Zoom>
          </div>
          <div className="mt-4 text-center">
            <p className="text-white text-[20px]">{item.name}</p>
            <p className="text-[16px] font-normal text-white">
              Added {formatDate(item.createdAt)}
            </p>
            <div className="flex items-center justify-center mt-3 text-center">
              <Link
                className="p-2 mr-3 rounded-md cursor-pointer hover:bg-gray-800"
                to={item.url}
                target="_blank"
              >
                <ArrowOutwardIcon
                  sx={{
                    cursor: "pointer",
                    width: "18px",
                    height: "18px",
                    color: "white"
                  }}
                />
                <span className="text-[16px] text-white ml-2">
                  Open in new tab
                </span>
              </Link>
              <button
                onClick={handleCloseImageClick}
                className="flex items-center p-2 text-white rounded-md hover:bg-gray-800"
              >
                <CloseIcon
                  sx={{
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer"
                  }}
                />
                <span className="text-[16px] text-white ml-2">Close</span>
              </button>
              <button
                onClick={() => handleDeleteFile(idBoard, cardId, item.id)}
                className="flex items-center p-2 mx-6 text-white rounded-md hover:bg-gray-800"
              >
                <DeleteIcon
                  sx={{
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer"
                  }}
                />
                <span className="text-[16px] text-red-600 ml-2">Delete</span>
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ItemAttachment;
