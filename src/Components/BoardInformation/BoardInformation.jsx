import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { InviteMemberModal } from "../Modals/InviteMemberModal/InviteMemberModal";
import { useParams } from "react-router-dom";
import { useGetWorkspaceById } from "../../Hooks";

export const BoardInformation = (props) => {
  const { id } = useParams();
  const { workspaceDetails } = useGetWorkspaceById(id);

  const [openInviteModal, setOpenInviteModal] = useState(false);

  const isOwner = workspaceDetails?.isOwner

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <Avatar>{workspaceDetails?.title?.[0]}</Avatar>
          <div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <div>{workspaceDetails?.title}</div>
              <EditIcon
                fontSize="10"
                className="p-1 hover:bg-gray-200 hover:cursor-pointer"
              />
            </div>
            <div>Privacy</div>
          </div>
        </div>
        {props.isMemberPage && isOwner &&  (
          <Button
            variant="contained"
            startIcon={<PersonAddAlt1Icon />}
            sx={{ height: "fit-content" }}
            onClick={() => setOpenInviteModal(true)}
          >
            Invite Workspace members
          </Button>
        )}
      </div>
      <InviteMemberModal
        open={openInviteModal}
        handleClose={() => setOpenInviteModal(false)}
      />
    </>
  );
};
