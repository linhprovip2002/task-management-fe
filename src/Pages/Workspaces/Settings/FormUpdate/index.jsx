import { Button, TextField } from '@mui/material';
import React from 'react';

export default function FormUpdate({ onClose }) {
  const handleClose = (e) => {
    if (onClose) return onClose(e);
  };
  return (
    <div className="w-[250px]">
      <form className="text-[var(--dark-slate-blue)] text-sm mb-2">
        <div className="flex flex-col mb-2">
          <label className="font-semibold">Name</label>
          <TextField
            sx={{
              '& .MuiOutlinedInput-input': {
                paddingY: '8px',
                paddingX: '12px',
              },
            }}
            value={'BKDN'}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Description</label>
          <textarea rows={4} className="border-[1px]  rounded-sm px-2 border-slate-500" value={'BKDN'} />
        </div>
      </form>
      {/* action  */}
      <div className="flex gap-2">
        <Button
          sx={{
            paddingX: '12px',
            paddingY: '4px',
            textTransform: 'none',
          }}
          variant="contained"
        >
          Save
        </Button>
        <Button
          sx={{
            paddingX: '12px',
            paddingY: '4px',
            textTransform: 'none',
          }}
          onClick={handleClose}
          variant="outlined"
        >
          Cancle
        </Button>
      </div>
    </div>
  );
}
