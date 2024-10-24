import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { useGetWorkspaceByUser } from "../../../Hooks";
import { Controller, useForm } from "react-hook-form";
import { uploadFile } from "../../../Services/API/ApiUpload/apiUpload";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import Loading from "../../Loading";
import { style } from "../CreateNewBoard/constants/createNewBoard.constant";

const UploadFile = (open, handleClose) => {
  const { isLoading: isLoadingWorkspace } = useGetWorkspaceByUser();
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [uploadStatus, setUploadStatus] = useState("");

  const {
    register,
    handleSubmit,
    // setValue,
    control,
    formState: { errors },
  } = useForm(); // Khởi tạo react-hook-form

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { file } = data; // Lấy file từ dữ liệu được gửi
    if (!file[0]) {
      setUploadStatus("Plase choose file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file[0]);

    try {
      await uploadFile(formData);
      setUploadStatus("File uploaded successfully!");
      toast.success("upload sucessfuly", { position: "bottom-right", autoClose: 1500 });
    } catch (error) {
      setUploadStatus("Error uploading file.");
      toast.error("error uploading file", { position: "bottom-right", autoClose: 1500 });
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {(isLoading || isLoadingWorkspace) && <Loading />}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="sticky flex text-sm justify-center rounded-t-lg top-0 items-center h-[38px] bg-white font-bold text-center text-textColor">
            <div>Attach</div>
            <button onClick={handleClose} className="absolute right-2">
              <CloseIcon fontSize="small" className="cursor-pointer" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`justify-center w-[320px] max-h-[540px] px-4 pb-4 bg-white rounded-lg overflow-y-auto`}
          >
            <Button variant="contained" type="submit" fullWidth className="bg-gray-400">
              Upload
            </Button>
            <div className="mt-4">
              {/* Nhập tiêu đề bảng */}
              <Controller
                name="title"
                control={control}
                rules={{ required: "Board title is required" }}
                render={({ field }) => (
                  <TextField
                    {...register('files')}
                    label="Board title"
                    type="text"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ""}
                    className="my-4"
                  />
                )}
              />

              <div className="flex justify-end gap-2">
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit" className="bg-blue-500">
                  Upload
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UploadFile;
