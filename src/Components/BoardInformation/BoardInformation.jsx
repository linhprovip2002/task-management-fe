import { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { InviteMemberModal } from '../Modals/InviteMemberModal/InviteMemberModal';

export const BoardInformation = (props) => {
  const [openInviteModal, setOpenInviteModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 text-sm">
          <Avatar />
          <div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <div>{props.name}</div>
              <EditIcon fontSize="10" className="p-1 hover:bg-gray-200 hover:cursor-pointer" />
            </div>
            <div>Privacy</div>
          </div>
        </div>
        {props.isMemberPage && (
          <Button
            variant="contained"
            startIcon={<PersonAddAlt1Icon />}
            sx={{ height: 'fit-content' }}
            onClick={() => setOpenInviteModal(true)}
          >
            Invite Workspace members
          </Button>
        )}
      </div>
      <InviteMemberModal open={openInviteModal} handleClose={() => setOpenInviteModal(false)} />
    </>
  );
};
