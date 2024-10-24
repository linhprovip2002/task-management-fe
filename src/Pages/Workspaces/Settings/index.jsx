import { Avatar, Button, Divider } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import FormUpdate from "./FormUpdate";
import InviteWorkspace from "../../../Components/Modals/InviteWorkspace";
import { useParams } from "react-router-dom";
import { deleteWorkspace } from "../../../Services/API/ApiWorkSpace/apiWorkSpace";
import { toast } from "react-toastify";
import { useGetWorkspaceById } from "../../../Hooks";
import Loading from "../../../Components/Loading";
import { InviteMemberModal } from "../../../Components/Modals/InviteMemberModal/InviteMemberModal";

const WorkspaceSettings = () => {
  const { id } = useParams();
  const { workspaceDetails, isLoading } = useGetWorkspaceById(id);
  const [workspaceData, setWorkspaceData] = useState(workspaceDetails);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [invitePopup, setInvitePopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleOpenCloseDeletePopup = () => setDeletePopup(!deletePopup);

  const handleDeleteWsp = () => {
    deleteWorkspace(id).then((res) => {
      toast.success("Deleted Workspace");
      setDeletePopup(false);
      // chưa handle cập nhật lại workspace ở sidebar
    });
  };

  const handleAfterUpdate = (data) => {
    setWorkspaceData(data);
    handleCloseUpdate();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-8 workSpaceSetting">
      {/* header  */}
      <div className="flex justify-between">
        {/* left  */}
        {openUpdate ? (
          <FormUpdate
            data={workspaceData}
            onUpdateSuccess={handleAfterUpdate}
            onClose={handleCloseUpdate}
          />
        ) : (
          <div>
            <div className="flex gap-[10px] items-center text-[var(--text-color)]">
              <Avatar
                sx={{
                  borderRadius: 2,
                  width: 60,
                  height: 60
                }}
              >
                {workspaceDetails.title?.[0]}
              </Avatar>
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold">
                    {workspaceDetails.title}
                  </h2>
                  <div
                    onClick={handleOpenUpdate}
                    className="w-6 h-6 hover:bg-[var(--hover-background)] cursor-pointer flex items-center justify-center ml-2 rounded-md"
                  >
                    <EditIcon sx={{ fontSize: "16px" }} />
                  </div>
                </div>
                <span className="text-xs flex  text-[#44546F]">
                  <LockIcon sx={{ fontSize: 16 }} />
                  Private
                </span>
              </div>
            </div>
            <div className="text-xs text-[var(--text-color)]">
              {workspaceDetails.description}
            </div>
          </div>
        )}
        {/* right  */}
        <div>
          <Button
            onClick={() => setInvitePopup(true)}
            sx={{
              textTransform: "none",
              paddingY: "6px",
              paddingX: "12px"
            }}
            variant="contained"
            startIcon={<PersonAddIcon fontSize="inherit" />}
          >
            Invite workspace members
          </Button>
        </div>
      </div>
      <Divider component={"div"} className="my-2" />
      <div onClick={handleOpenCloseDeletePopup} className="py-3">
        <p className="text-sm font-semibold text-[#AE2E24] cursor-pointer hover:underline">
          Delete this workspace?
        </p>
      </div>
      <InviteMemberModal
        open={invitePopup}
        handleClose={() => setInvitePopup(false)}
      />
    </div>
  );
};

export default React.memo(WorkspaceSettings);
