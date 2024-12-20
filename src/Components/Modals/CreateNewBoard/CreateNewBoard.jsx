import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "@mui/material/Modal";
import { Autocomplete, Box, Button } from "@mui/material";
import {
  colorData,
  customBgImg,
  customStyleNewBoard,
  defaultBoardValues,
  listBgImage,
} from "./constants/createNewBoard.constant";
import { listRuleOptions, style } from "./constants/createNewBoard.constant";
import { useGetWorkspaceByUser } from "../../../Hooks";
import { createBoard } from "../../../Services/API/ApiBoard/apiBoard";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Loading";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryKeys } from "../../../constants";

export const CreateNewBoard = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const { workspaceInfo, isLoading: isLoadingWorkspace } = useGetWorkspaceByUser();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedBg, setSelectedBg] = useState("");
  const [selectedImg, setSelectedImg] = useState(listBgImage[0]?.image || ""); // Lưu hình ảnh đã chọn

  const { id: currentWspId } = useParams();

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: defaultBoardValues,
  });

  useEffect(() => {
    if (currentWspId) {
      setValue("workspaceId", currentWspId);
    }
  }, [currentWspId, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { title, visibility, workspaceId } = data;

    const boardData = {
      title: title.trim(),
      description: "",
      backgroundColor: selectedBg,
      coverUrl: selectedImg,
      isPrivate: visibility === "isPrivate",
      isFavorite: visibility === "isFavorite",
      isArchived: visibility === "isArchived",
      workspaceId: +workspaceId,
    };
    try {
      const newboard = await createBoard(boardData);
      reset(defaultBoardValues);
      queryClient.invalidateQueries([EQueryKeys.GET_WORKSPACE_BY_ID]);
      navigate(`/workspace/${workspaceId}/board/${newboard.id}`);
      handleClose();
    } catch (error) {
      console.error("Failed to create board:", error);
    }
    setIsLoading(false);
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
      {(isLoading || isLoadingWorkspace) && <Loading />}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="sticky flex text-sm justify-center rounded-t-lg top-0 items-center h-[38px] bg-white font-bold text-center text-textColor">
            <div>Create board</div>
            <button onClick={handleClose} className="absolute right-2">
              <CloseIcon fontSize="small" className="cursor-pointer" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`justify-center w-[320px] max-h-[540px] px-4 pb-4 bg-white rounded-lg overflow-y-auto`}
          >
            <div className="mt-4">
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
              <Controller
                name="workspaceId"
                control={control}
                rules={{ required: "Board title is required" }}
                render={({ field }) => (
                  <Autocomplete
                    onChange={(e, value) => field.onChange(+value.id)}
                    options={workspaceInfo}
                    getOptionLabel={(option) => option.title}
                    getOptionKey={(option) => option.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        required
                        label="Workspace"
                        variant="outlined"
                        fullWidth
                        defaultValue={workspaceInfo.currentWspId}
                      />
                    )}
                    className="my-4"
                  />
                )}
              />

              {/* Autocomplete Visibility */}
              <Autocomplete
                {...register("visibility")}
                options={listRuleOptions}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                onChange={(e, value) => setValue("visibility", value.value)}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Visibility" variant="outlined" fullWidth required />
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
