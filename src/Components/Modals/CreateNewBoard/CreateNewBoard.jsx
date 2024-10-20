import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "@mui/material/Modal";
import { Autocomplete, Box, Button } from "@mui/material";
import { colorData, customBgImg, customStyleNewBoard, listBgImage, style } from "./customNewBoard";
import { listRule } from "./customNewBoard";
import { useGetWorkspaceByUser } from "../../../Hooks";
import { createBoard } from "../../../Services/API/ApiBoard/apiBoard";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";




export const CreateNewBoard = ({ open, handleClose, handleGetAllBoard }) => {
  const [selectedBg, setSelectedBg] = useState("");
  const [selectedImg, setSelectedImg] = useState(listBgImage[0]?.image || ""); // Lưu hình ảnh đã chọn
  const { workspaceInfo } = useGetWorkspaceByUser();

  const { id: currentWspId } = useParams();
  
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      workspaceId: currentWspId || null,
      visibility: "",
      backgroundColor: "",
      coverUrl: "",
      isPrivate: true,
      isFavorite: true,
      isArchived: true,
    },
  });

  useEffect(() => {
    if (currentWspId) {
      setValue("workspaceId", currentWspId);
    }
  }, [currentWspId, setValue]);

  const onSubmit = async (data) => {
    const { title, visibility, workspaceId } = data;

    // Reset tất cả các giá trị boolean trước khi cập nhật
    let isPrivate = false;
    let isFavorite = false;
    let isArchived = false;

    // Cập nhật đúng giá trị boolean dựa trên visibility mà người dùng chọn
    if (visibility === "isPrivate") {
      isPrivate = true;
    } else if (visibility === "isFavorite") {
      isFavorite = true;
    } else if (visibility === "isArchived") {
      isArchived = true;
    }

    // Tạo dữ liệu bảng
    const boardData = {
      title: title.trim(),
      description: "", // Add description field if needed
      backgroundColor: selectedBg,
      coverUrl: selectedImg,
      isPrivate,
      isFavorite,
      isArchived,
      workspaceId: Number(workspaceId),
    };

    try {
      await createBoard(boardData); // Gửi dữ liệu lên API
      reset(); // Reset form sau khi gửi
      handleClose(); // Đóng modal
      handleGetAllBoard(currentWspId); // Lấy lại danh sách bảng
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  };

  const handleBackgroundClick = (chooseColor) => {
    setSelectedBg(chooseColor);
    setSelectedImg(null);
  };

  const handleImageClick = (chooseImg) => {
    setSelectedImg(chooseImg);
    setSelectedBg(null);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="sticky flex text-sm justify-center rounded-t-lg top-0  items-center  h-[38px] bg-white font-bold text-center text-textColor">
            Create board
            <button onClick={handleClose} className="absolute right-2">
              <CloseIcon fontSize="small" className="cursor-pointer" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="justify-center w-[320px] max-h-[540px] px-4 pb-4 bg-white rounded-lg overflow-y-auto"
          >
            <div className="">
              {/* Hình ảnh bảng */}
              <div className="flex justify-center my-2 ">
                <div
                  className="w-[12rem] h-[110px] rounded-lg flex justify-center"
                  style={{
                    backgroundColor: selectedBg, // Áp dụng màu nền đã chọn
                    backgroundImage: selectedImg ? `url(${selectedImg})` : "none",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                  }}
                >
                  <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="svg" width="186" height="103" />
                </div>
              </div>

              {/* Lưu ảnh đã chọn */}
              <div className="my-4">
                <p className="my-2 font-semibold">Background</p>
                <div className="grid grid-cols-4 gap-2">
                  {listBgImage.map((bgImg, index) => (
                    <div key={index} className="relative">
                      <div
                        style={{
                          backgroundImage: `url(${bgImg.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                        }}
                        className={` ${customBgImg} ${selectedImg === bgImg.name ? `${bgImg.image}` : ""}`}
                        onClick={() => handleImageClick(bgImg.image)}
                      >
                        {selectedImg === bgImg.image && <CheckIcon className="text-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lựa chọn màu nền */}
              <div className="my-4">
                <div className="grid grid-cols-5 gap-2">
                  {colorData.map((color, index) => (
                    <div
                      key={index}
                      className={`${color.class} ${customStyleNewBoard} ${selectedBg === color.name ? `ring-2 ${color.class}` : ""}`}
                      onClick={() => handleBackgroundClick(color.name)}
                    >
                      {selectedBg === color.name && <CheckIcon className="text-white" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Nhập tiêu đề bảng */}
              <Controller
                name="title"
                control={control}
                rules={{ required: "Board title is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
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

              {/* Autocomplete Workspace */}
              <Controller
                name="workspaceId"
                control={control}
                defaultValue={currentWspId}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={workspaceInfo.map((workspace) => workspace.id)}
                    // getoptionselected={(option, value) => option === value}
                    getOptionLabel={(option) => {
                      const workspace = workspaceInfo.find((workspace) => workspace.id === option);
                      return workspace ? String(workspace.id) : "";
                    }}
                    onChange={(e, value) => {
                      field.onChange(Number(value));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        error={!!errors.title}
                        helperText={errors.title ? errors.title.message : ""}
                        required
                        label="Workspace"
                        defaultValues={currentWspId}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    className="my-4"
                    defaultValue={currentWspId}
                  />
                )}
              />

              {/* Autocomplete Visibility */}
              <Autocomplete
                {...register("visibility")}
                options={listRule} // Các lựa chọn là isPrivate, isFavorite, isArchived
                getOptionLabel={(option) => {
                  return option.label;
                }} // Hiển thị nhãn của option
                // isOptionEqualToValue={(option, value) => option.value === value} // So sánh đúng giữa option và value
                // getoptionselected={(option, value) => option.value === value.value}
                onChange={(e, v) => {
                  setValue("visibility", v.value);
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" required label="Visibility" variant="outlined" fullWidth />
                )}
                className="my-4"
              />

              <div className="flex justify-end gap-2">
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit" className="bg-blue-500">
                  Create
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
