import { Avatar, Button, Divider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import FormUpdate from './FormUpdate';
const WorkspaceSettings = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <div className="workSpaceSetting px-8">
      {/* header  */}
      <div className="flex justify-between pb-8">
        {/* left  */}
        {openUpdate ? (
          <FormUpdate onClose={handleCloseUpdate} />
        ) : (
          <div>
            <div className="flex gap-[10px] items-center text-[var(--text-color)]">
              <Avatar sx={{ bgcolor: deepOrange[500], borderRadius: 1, width: 60, height: 60 }} variant="square">
                N
              </Avatar>
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold">BKDN</h2>
                  <button
                    onClick={handleOpenUpdate}
                    className="w-6 h-6 hover:bg-[var(--hover-background)] cursor-pointer flex items-center justify-center ml-2 rounded-md"
                  >
                    <EditIcon sx={{ fontSize: '16px' }} />
                  </button>
                </div>
                <span className="text-xs flex  text-[#44546F]">
                  <LockIcon sx={{ fontSize: 16 }} />
                  Private
                </span>
              </div>
            </div>
            <div className="text-xs text-[var(--text-color)]">project</div>
          </div>
        )}
        {/* right  */}
        <div>
          <Button
            sx={{
              textTransform: 'none',
              paddingY: '6px',
              paddingX: '12px',
            }}
            variant="contained"
            startIcon={<PersonAddIcon fontSize="inherit" />}
          >
            Invite workspace members
          </Button>
        </div>
      </div>
      <Divider component={'div'} />
      <div className="py-3">
        <p className="text-sm font-semibold text-[#AE2E24] cursor-pointer hover:underline">Delete this workspace?</p>
      </div>
    </div>
  );
};

export default WorkspaceSettings;
