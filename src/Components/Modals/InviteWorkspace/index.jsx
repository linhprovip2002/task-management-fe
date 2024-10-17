import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import { Button, Modal, TextField } from '@mui/material';
import HeadlessTippy from '@tippyjs/react/headless';

import React, { useState } from 'react';
import UserItem from './UserItem';

const primaryText = '#172b4d';

export default function InviteWorkspace({ open, onClose }) {
  const [searchPopper, setSearchPopper] = useState(false);

  const handleClose = (e) => {
    if (onClose) return onClose(e);
  };
  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          marginTop: '200px',
          justifyContent: 'center',
        }}
      >
        <div className="InviteWorkspace w-[600px]">
          <div className="py-5 px-4 bg-white rounded-md">
            <div className="flex justify-between mb-4">
              <h1 className={`font-normal text-xl text-[${primaryText}]`}>Invite to Workspace</h1>
              <button onClick={handleClose} className="w-6 h-6">
                <CloseIcon className="cursor-pointer" />
              </button>
            </div>

            <div className="mb-2 ">
              <HeadlessTippy
                onClickOutside={() => setSearchPopper(false)}
                visible={searchPopper}
                interactive
                placement="bottom"
                render={(props) => (
                  <div className="bg-white w-[600px] p-5">
                    <div className="shadow-lg border border-solid border-slate-200 rounded-md p-5">
                      <UserItem />
                      <UserItem />
                      <UserItem />
                      <UserItem />
                      <UserItem />
                    </div>
                  </div>
                )}
              >
                <TextField
                  onFocus={() => setSearchPopper(true)}
                  onBlur={() => setSearchPopper(false)}
                  placeholder="Email address or name"
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      paddingY: '8px',
                      paddingX: '12px',
                      fontSize: '14px',
                      fontWeight: 400,
                    },
                  }}
                />
              </HeadlessTippy>
            </div>

            <div className="flex justify-between items-center">
              <p className={`text-[${primaryText}] text-sm font-normal`}>
                Invite someone to this Workspace with a link
              </p>
              <Button
                sx={{
                  textTransform: 'none',
                  gap: 1,
                  paddingY: '2px',
                  paddingX: '12px',
                }}
                variant="outlined"
              >
                <LinkIcon />
                Create link
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
