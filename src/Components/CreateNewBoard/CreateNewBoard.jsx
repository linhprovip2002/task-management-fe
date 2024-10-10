import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, Button } from '@mui/material';
import { listWorkspaces } from './listWorkspaces';
import { listRule } from './listRule';
import { createBoard } from '../../Services/API/ApiBoard/apiBoard';

// {
//   "title": "string",
//   "description": "string",
//   "backgroundColor": "string",
//   "coverUrl": "string",
//   "isPrivate": true,
//   "isFavorite": true,
//   "isArchived": true,
//   "workspaceId": 0
// }

export const CreateNewBoard = ({ open, handleClickOpen, handleClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      boardTitle: '',
      workspace: null,
      visibility: null,
    },
  });

  const [selectedBg, setSelectedBg] = useState(''); // Lưu màu background

  const onSubmit = async (data) => {
    const boardData = {
      title: data.boardTitle,
      description: '',
      backgroundColor: selectedBg,
      coverUrl: '',
      isPrivate: true,
      isFavorite: false,
      isArchived: false,
      workspaceId: data.workspace.id,
    };

    try {
      await createBoard(boardData);
      reset();
      handleClose();
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  const handleBackgroundClick = (color) => {
    setSelectedBg(color);
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="flex items-center justify-center w-40 h-20 bg-slate-200 hover:brightness-95 hover:cursor-pointer"
      >
        <p className="text-sm text-textColor">Create new board</p>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit),
          sx: { width: 400, padding: 1 },
        }}
      >
        <DialogTitle className="font-bold text-center text-textColor text-md">Create board</DialogTitle>
        <DialogContent>
          {/* Hình ảnh bảng */}
          <div className="flex justify-center my-2">
            <div
              className="w-64 rounded h-[152px]"
              style={{
                backgroundColor: selectedBg, // Áp dụng màu nền đã chọn
                backgroundImage: `url('https://trello.com/assets/14cda5dc635d1f13bc48.svg')`, // Hình ảnh SVG
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>

          {/* Lựa chọn màu background */}
          <div className="my-4">
            <p className="font-semibold">Background</p>
            <div className="grid grid-cols-5 gap-2">
              <div
                className={`w-12 h-10 bg-orange-500 border flex items-center justify-center rounded-md gap-x-1 hover:ring-2 cursor-pointer ${selectedBg === 'orange' ? 'ring-2  ring-orange-500' : ''}`}
                onClick={() => handleBackgroundClick('orange')}
              >
                {selectedBg === 'orange' && <CheckIcon className="text-white " />}
              </div>
              <div
                className={`w-12 h-10 bg-green-500 border rounded-md flex items-center justify-center gap-x-1 hover:ring-2 cursor-pointer ${selectedBg === 'green' ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => handleBackgroundClick('green')}
              >
                {selectedBg === 'green' && <CheckIcon className="items-center justify-center text-center text-white" />}
              </div>
              <div
                className={`w-12 h-10 bg-purple-500 border rounded-md flex items-center justify-center gap-x-1 hover:ring-2 cursor-pointer ${selectedBg === 'purple' ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => handleBackgroundClick('purple')}
              >
                {selectedBg === 'purple' && (
                  <CheckIcon className="items-center justify-center text-center text-white" />
                )}
              </div>
              <div
                className={`w-12 h-10 bg-pink-500 border rounded-md flex items-center justify-center gap-x-1 hover:ring-2 cursor-pointer ${selectedBg === 'pink' ? 'ring-2 ring-pink-500' : ''}`}
                onClick={() => handleBackgroundClick('pink')}
              >
                {selectedBg === 'pink' && <CheckIcon className="items-center justify-center text-center text-white" />}
              </div>
              <div
                className={`w-12 h-10 bg-yellow-500 border rounded-md flex items-center justify-center gap-x-1 hover:ring-2 cursor-pointer ${selectedBg === 'yellow' ? 'ring-2 ring-yellow-500' : ''}`}
                onClick={() => handleBackgroundClick('yellow')}
              >
                {selectedBg === 'yellow' && (
                  <CheckIcon className="items-center justify-center text-center text-white" />
                )}
              </div>
            </div>
          </div>

          {/* Field nhập Board Title */}
          <Controller
            name="boardTitle"
            control={control}
            rules={{ required: 'Board title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Board title"
                variant="outlined"
                fullWidth
                error={!!errors.boardTitle}
                helperText={errors.boardTitle ? errors.boardTitle.message : ''}
                className="my-4"
              />
            )}
          />

          {/* Field Autocomplete Workspace */}
          <Controller
            name="workspace"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={listWorkspaces}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => field.onChange(value)}
                renderInput={(params) => <TextField {...params} label="Workspace" variant="outlined" fullWidth />}
                className="my-4"
              />
            )}
          />

          {/* Field Autocomplete Visibility */}
          <Controller
            name="visibility"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={listRule}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => field.onChange(value)}
                renderInput={(params) => <TextField {...params} label="Visibility" variant="outlined" fullWidth />}
                className="my-4"
              />
            )}
          />
        </DialogContent>
        <DialogActions className="flex justify-center">
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit" className="bg-blue-500">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
