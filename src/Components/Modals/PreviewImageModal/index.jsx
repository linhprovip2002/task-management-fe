import { Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CloseIcon from "@mui/icons-material/Close";
import { CenterModel } from "../styles";

export const PreviewImageModal = ({ open, handleCloseImageClick }) => {
  const { watch } = useFormContext();
  const imageUrl = watch("selectedImgUrl");

  return (
    <Modal open={open} onClose={handleCloseImageClick}>
      <div className={`${CenterModel} max-h-[80vh] flex flex-col gap-4`}>
        <img
          src={imageUrl}
          alt="attachment"
          className="p-4 cursor-pointer object-contain"
        />
        <div className="flex items-center justify-center">
          <Link
            className="p-2 mr-3 rounded-md cursor-pointer hover:bg-gray-00"
            to={imageUrl}
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
            <span className="text-base text-white ml-2">Open in new tab</span>
          </Link>
          <button
            onClick={handleCloseImageClick}
            className="flex items-center p-2 text-white rounded-md hover:bg-gray-800"
          >
            <CloseIcon
              sx={{ color: "white", fontSize: "16px", cursor: "pointer" }}
            />
            <span className="text-base text-white ml-2">Close</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
