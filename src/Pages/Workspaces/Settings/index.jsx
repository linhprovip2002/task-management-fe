import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Modal,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import FormUpdate from "./FormUpdate";
import InviteWorkspace from "../../../Components/Modals/InviteWorkspace";
import { useParams } from "react-router-dom";
import { getWorkspaceById } from "../../../Services/API/ApiWorkSpace/apiWorkSpace";
import { toast } from "react-toastify";
const WorkspaceSettings = () => {
  const [workspaceData, setWorkspaceData] = useState({});

  const [openUpdate, setOpenUpdate] = useState(false);
  const [invitePopup, setInvitePopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  const { id } = useParams();

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleOpenCloseDeletePopup = () => setDeletePopup(!deletePopup);

  const handleDeleteWsp = () => {
    toast.success("Deleted Workspace");
    setDeletePopup(false);
  };

  useEffect(() => {
    getWorkspaceById(id)
      .then((res) => {
        setWorkspaceData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAfterUpdate = (data) => {
    setWorkspaceData(data);
    handleCloseUpdate();
  };

  return (
    <div className="workSpaceSetting px-8">
      {/* header  */}
      <div className="flex justify-between pb-8">
        {/* left  */}
        {openUpdate ? (
          <FormUpdate data={workspaceData} onUpdateSuccess={handleAfterUpdate} onClose={handleCloseUpdate} />
        ) : (
          <div>
            <div className="flex gap-[10px] items-center text-[var(--text-color)]">
              <Avatar sx={{ bgcolor: deepOrange[500], borderRadius: 1, width: 60, height: 60 }} variant="square">
                N
              </Avatar>
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold">{workspaceData.title}</h2>
                  <button
                    onClick={handleOpenUpdate}
                    className="w-6 h-6 hover:bg-[var(--hover-background)] cursor-pointer flex items-center justify-center ml-2 rounded-md"
                  >
                    <EditIcon sx={{ fontSize: "16px" }} />
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
            onClick={() => setInvitePopup(true)}
            sx={{
              textTransform: "none",
              paddingY: "6px",
              paddingX: "12px",
            }}
            variant="contained"
            startIcon={<PersonAddIcon fontSize="inherit" />}
          >
            Invite workspace members
          </Button>
        </div>
      </div>
      <Divider component={"div"} />
      <div onClick={handleOpenCloseDeletePopup} className="py-3">
        <p className="text-sm font-semibold text-[#AE2E24] cursor-pointer hover:underline">Delete this workspace?</p>
      </div>

      <InviteWorkspace
        open={invitePopup}
        onClose={() => {
          setInvitePopup(false);
        }}
      />

      <Modal open={deletePopup} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Delete Workspace ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is permanent and can't be undone. Board members will not be able to interact with closed boards.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpenCloseDeletePopup} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteWsp}>
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
};

export default React.memo(WorkspaceSettings);
