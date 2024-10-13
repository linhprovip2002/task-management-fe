import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';
import { Autocomplete, Box, Button } from '@mui/material';
import { customStyleNewBoard, style } from './customNewBoard';
import { colorData, listRule } from './customNewBoard';
import { useGetWorkspaceByUser } from '../../../Hooks';
import { createBoard } from '../../../Services/API/ApiBoard/apiBoard';



export const CreateNewBoard = ({ open, handleOpen, handleClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      workspaceId: null,
      visibility: null, // Người dùng sẽ chọn trạng thái
      backgroundColor: '',
      coverUrl: null,
      isPrivate: false, // Mặc định là false
      isFavorite: false, // Mặc định là false
      isArchived: false, // Mặc định là false
    },
  });

  const [selectedBg, setSelectedBg] = useState(''); // Lưu màu background
  const { workspaceInfo } = useGetWorkspaceByUser();

  const onSubmit = async (data) => {
    const { title, visibility, workspaceId } = data;
    console.log('in ra data', data)

    // Kiểm tra tiêu đề bảng phải là chuỗi không rỗng
    if (typeof title !== 'string' || !title.trim()) {
      console.error('Title must be a non-empty string');
      return;
    }

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
      coverUrl: '', // Set a cover URL if needed
      isPrivate,
      isFavorite,
      isArchived,
      workspaceId: Number(workspaceId), // Chuyển đổi thành số
  };


  console.log('du lieu gui len', boardData);
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
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center justify-center w-40 h-20 bg-slate-200 hover:brightness-95 hover:cursor-pointer"
      >
        <p className="text-sm text-textColor">Create new board</p>
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)} className="justify-center w-[320px] p-4 bg-white ">
            <h2 className="font-bold text-center text-textColor text-md">Create board</h2>

            {/* Hình ảnh bảng */}
            <div className="flex justify-center my-2">
              <div
                className="w-[12rem] rounded h-[110px]"
                style={{
                  backgroundColor: selectedBg, // Áp dụng màu nền đã chọn
                  backgroundImage: `url('https://trello.com/assets/14cda5dc635d1f13bc48.svg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>

            {/* Lựa chọn màu nền */}
            <div className="my-4">
              <p className="my-2 font-semibold">Background</p>
              <div className="grid grid-cols-5 gap-2">
                {colorData.map((color) => (
                  <div
                    key={color}
                    className={`bg-${color}-500 ${customStyleNewBoard} ${selectedBg === color ? `ring-2 ring-${color}` : ''}`}
                    onClick={() => handleBackgroundClick(color)}
                  >
                    {selectedBg === color && <CheckIcon className="text-white" />}
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
                    <TextField {...params} size="small" label="Workspace" variant="outlined" fullWidth />
                  )}
                  className="my-4"
                />
              )}
            />

            {/* Autocomplete Visibility */}
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={listRule} // Các lựa chọn là isPrivate, isFavorite, isArchived
                  getOptionLabel={(option) => option.label} // Hiển thị nhãn của option
                  isOptionEqualToValue={(option, value) => option.value === value} // So sánh đúng giữa option và value
                  onChange={(event, newValue) => field.onChange(newValue?.value || '')} // Cập nhật giá trị cho form
                  renderInput={(params) => (
                    <TextField {...params} size="small" label="Visibility" variant="outlined" fullWidth />
                  )}
                  className="my-4"
                />
              )}
            />

            <div className="flex justify-end gap-2">
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="submit" className="bg-blue-500">
                Create
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
