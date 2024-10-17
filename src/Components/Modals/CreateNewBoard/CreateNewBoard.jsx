import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';
import { Autocomplete, Box, Button } from '@mui/material';
import { colorData, customBgImg, customStyleNewBoard, listBgImage, style } from './customNewBoard';
import { listRule } from './customNewBoard';
import { useGetWorkspaceByUser } from '../../../Hooks';
import { createBoard } from '../../../Services/API/ApiBoard/apiBoard';
import CloseIcon from '@mui/icons-material/Close';
// import { useParams } from 'react-router-dom';

export const CreateNewBoard = ({ open, handleOpen, handleClose }) => {
  const [selectedBg, setSelectedBg] = useState(''); // Lưu màu background
  const [selectedImg, setSelectedImg] = useState(''); // Lưu hình ảnh đã chọn
  const { workspaceInfo } = useGetWorkspaceByUser();

  // const { id } = useParams();

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      workspaceId: null,
      visibility: '', // Người dùng sẽ chọn trạng thái
      backgroundColor: '',
      coverUrl: '',
      isPrivate: false, // Mặc định là false
      isFavorite: false, // Mặc định là false
      isArchived: false, // Mặc định là false
    },
  });

  const onSubmit = async (data) => {
    const { title, visibility, workspaceId } = data;

    // Reset tất cả các giá trị boolean trước khi cập nhật
    let isPrivate = false;
    let isFavorite = false;
    let isArchived = false;

    // Cập nhật đúng giá trị boolean dựa trên visibility mà người dùng chọn
    if (visibility === 'isPrivate') {
      isPrivate = true;
    } else if (visibility === 'isFavorite') {
      isFavorite = true;
    } else if (visibility === 'isArchived') {
      isArchived = true;
    }

    // Tạo dữ liệu bảng
    const boardData = {
      title: title.trim(), // Đảm bảo title là chuỗi và không rỗng
      description: '', // Add description field if needed
      backgroundColor: selectedBg,
      coverUrl: selectedImg, // Set a cover URL if needed
      isPrivate,
      isFavorite,
      isArchived,
      workspaceId: Number(workspaceId), // Chuyển đổi thành số
    };

    try {
      await createBoard(boardData); // Gửi dữ liệu lên API
      reset(); // Reset form sau khi gửi
      handleClose(); // Đóng modal
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  const handleBackgroundClick = (chooseColor) => {
    setSelectedBg(chooseColor); // Cập nhật màu nền khi người dùng chọn
    setSelectedImg(null); // Reset hình ảnh khi người dùng chọn màu nền
  };

  const handleImageClick = (chooseImg) => {
    setSelectedImg(chooseImg); // Cập nhật hình ảnh khi người dùng chọn
    setSelectedBg(null);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center justify-center w-[12rem] h-[110px] rounded-lg bg-slate-200 hover:brightness-95 hover:cursor-pointer"
      >
        <p className="text-sm text-textColor">Create new board</p>
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="justify-center w-[320px] h-[80vh] p-4 bg-white rounded-lg overflow-y-auto"
          >
            <div className="fixed flex text-sm justify-center top-0 left-0 items-center right-0 h-[38px] bg-white font-bold text-center text-textColor">
              Create board
              <button onClick={handleClose} className="absolute right-2">
                <CloseIcon fontSize="small" className="cursor-pointer" />
              </button>
            </div>
            <div className="mt-[38px]">
              {/* Hình ảnh bảng */}
              <div className="flex justify-center my-2 ">
                <div
                  className="w-[12rem] h-[110px] rounded-lg flex justify-center"
                  style={{
                    backgroundColor: selectedBg, // Áp dụng màu nền đã chọn
                    backgroundImage: selectedImg ? `url(${selectedImg})` : 'none',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
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
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center center',
                        }}
                        className={` ${customBgImg} ${selectedImg === bgImg.name ? `${bgImg.image}` : ''}`}
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
                      className={`${color.class} ${customStyleNewBoard} ${selectedBg === color.name ? `ring-2 ${color.class}` : ''}`}
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
                rules={{ required: 'Board title is required' }}
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
                    helperText={errors.title ? errors.title.message : ''}
                    className="my-4"
                  />
                )}
              />

              {/* Autocomplete Workspace */}
              <Controller
                name="workspaceId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={workspaceInfo.map((workspace) => workspace.id)}
                    getOptionLabel={(option) => {
                      const workspace = workspaceInfo.find((workspace) => workspace.id === option);
                      return workspace ? String(workspace.id) : '';
                    }}
                    onChange={(e, value) => field.onChange(Number(value))} // Chuyển value sang kiểu số
                    renderInput={(params) => (
                      <TextField {...params} size="small" required label="Workspace" variant="outlined" fullWidth />
                    )}
                    className="my-4"
                  />
                )}
              />

              {/* Autocomplete Visibility */}
              <Autocomplete
                {...register('visibility')}
                options={listRule} // Các lựa chọn là isPrivate, isFavorite, isArchived
                getOptionLabel={(option) => option.label} // Hiển thị nhãn của option
                isOptionEqualToValue={(option, value) => option.value === value} // So sánh đúng giữa option và value
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Visibility" variant="outlined" fullWidth />
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
