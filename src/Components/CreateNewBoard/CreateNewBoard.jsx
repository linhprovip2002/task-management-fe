import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Button } from '@mui/material';
import { listWorkspaces } from './listWorkspaces';
import { listRule } from './listRule';

export const CreateNewBoard = ({ open, handleClickOpen, handleClose }) => {

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="flex items-center justify-center w-40 h-20 bg-slate-200 hover:brightness-95 hover:cursor-pointer"
      >
        <p className="text-sm text-textColor">Create new board</p>
      </button>
      <Dialog
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiDialog-paper': {
            width: 420, // Đảm bảo dialog có width 420px
            // height: 520, // Đảm bảo dialog có height 720px
          },
        }}
        maxWidth={false} // Đảm bảo không bị giới hạn chiều rộng
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            // console.log(email);
            handleClose();
          },
          sx: { width: 420, margin: 'auto' },
        }}
      >
        <DialogTitle sx={{ justifyContent: 'center', display: 'flex' }} className='textColor'>Create board</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="board-title"
            label="Board Title"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ width: 300 }}
          />
          <Autocomplete
            disablePortal
            required
            options={listWorkspaces}
            sx={{ width: 300, margin: '16px 0' }}
            renderInput={(params) => <TextField {...params} label="Workspaces" />}
          />
          <Autocomplete
            disablePortal
            required
            options={listRule}
            sx={{ width: 300,  }}
            renderInput={(params) => <TextField {...params} label="Visibility" />}
          />
        </DialogContent>
        <DialogActions sx={{ margin: 'auto'  }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" size="small" className="hidden" type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
