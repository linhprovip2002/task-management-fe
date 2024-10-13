import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';
import { Autocomplete, Box, Button } from '@mui/material';
import { colorData, customStyleNewBoard, style } from './customNewBoard';
import { listRule } from './customNewBoard';
import { useGetWorkspaceByUser } from '../../../Hooks';
import { createBoard } from '../../../Services/API/ApiBoard/apiBoard';
import { useParams } from 'react-router-dom';

export const CreateNewBoard = ({ open, handleOpen, handleClose }) => {
  const [selectedBg, setSelectedBg] = useState(''); // Lưu màu background
  const { workspaceInfo } = useGetWorkspaceByUser();

  const {id} = useParams();
  console.log('in ra id: ' + id);
  

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      workspaceId: null,
      visibility: '', // Người dùng sẽ chọn trạng thái
      backgroundColor: '',
      coverUrl: null,
      isPrivate: false, // Mặc định là false
      isFavorite: false, // Mặc định là false
      isArchived: false, // Mặc định là false
    },
  });



  const onSubmit = async (data) => {
    const { title, visibility, workspaceId } = data;
    console.log('in ra data', data);

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
        className="flex items-center justify-center w-[12rem] h-[110px] rounded-lg bg-slate-200 hover:brightness-95 hover:cursor-pointer"
      >
        <p className="text-sm text-textColor">Create new board</p>
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)} className="justify-center w-[320px] p-4 bg-white ">
            <h2 className="text-sm font-bold text-center text-textColor">Create board</h2>

            {/* Hình ảnh bảng */}
            <div className="flex justify-center my-2 ">
              <div
                className="w-[12rem] h-[110px] rounded-lg flex justify-center"
                style={{
                  backgroundColor: selectedBg, // Áp dụng màu nền đã chọn
                }}
              >
                <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="svg" width="186" height="103" />
              </div>
            </div>

            {/* Lựa chọn màu nền */}
            <div className="my-4">
              <p className="my-2 font-semibold">Background</p>
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
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={listRule} // Các lựa chọn là isPrivate, isFavorite, isArchived
                  getOptionLabel={(option) => option.label || ''} // Hiển thị nhãn của option
                  isOptionEqualToValue={(option, value) => option.value === value} // So sánh đúng giữa option và value
                  onChange={(event, newValue) => field.onChange(String(newValue?.value) || '')} // Cập nhật giá trị cho form
                  renderInput={(params) => (
                    <TextField {...params} required size="small" label="Visibility" variant="outlined" fullWidth />
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
