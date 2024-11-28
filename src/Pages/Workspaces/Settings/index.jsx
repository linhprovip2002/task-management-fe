import { Avatar, Box, Button, ClickAwayListener, Divider, Fade, Popper, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import FormUpdate from "./FormUpdate";
import { useParams } from "react-router-dom";
import { deleteWorkspace } from "../../../Services/API/ApiWorkSpace/apiWorkSpace";
import { toast } from "react-toastify";
import { useGetWorkspaceById } from "../../../Hooks";
import Loading from "../../../Components/Loading";
import { Close } from "@mui/icons-material";
import { InviteMemberModal } from "../../../Components/Modals/InviteMemberModal/InviteMemberModal";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryKeys } from "../../../constants";

const WorkspaceSettings = () => {
  const { id } = useParams();
  const { workspaceDetails, isLoading } = useGetWorkspaceById(id);
  const [workspaceData, setWorkspaceData] = useState(workspaceDetails);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [invitePopup, setInvitePopup] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState("");

  const queryClient = useQueryClient();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenDelete((previousOpen) => !previousOpen);
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDeleteWsp = () => {
    deleteWorkspace(id).then((res) => {
      toast.success("Deleted Workspace");

      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_WORKSPACE_BY_USER],
      });
    });
  };

  const handleAfterUpdate = (data) => {
    setWorkspaceData(data);
    handleCloseUpdate();
  };

  useEffect(() => {
    setWorkspaceData(workspaceDetails);
  }, [workspaceDetails]);

  useEffect(() => {
    document.title = "Settings | Kanban";
    return () => {
      document.title = "Kanban";
    };
  }, []);

  if (isLoading) return <Loading />;

  const canDelete = confirmDelete === workspaceData?.title;

  return (
    <div className="px-8 workSpaceSetting">
      {/* header  */}
      <div className="flex justify-between">
        {/* left  */}
        {openUpdate ? (
          <FormUpdate data={workspaceData} onUpdateSuccess={handleAfterUpdate} onClose={handleCloseUpdate} />
        ) : (
          <div>
            <div className="flex gap-[10px] items-center text-[var(--text-color)]">
              <Avatar
                sx={{
                  borderRadius: 2,
                  width: 60,
                  height: 60,
                }}
              >
                {workspaceDetails.title?.[0]}
              </Avatar>
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold">{workspaceDetails.title}</h2>
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
            <div className="text-xs text-[var(--text-color)]">{workspaceDetails.description}</div>
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
      <Divider component={"div"} className="my-2" />
      <div className="py-3">
        <p
          onClick={handleClick}
          className=" select-none w-fit text-sm font-semibold text-[#AE2E24] cursor-pointer hover:underline"
        >
          Delete this workspace?
        </p>
      </div>
      <InviteMemberModal open={invitePopup} handleClose={() => setInvitePopup(false)} />

      <Popper placement="bottom-start" id={id} open={openDelete} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <ClickAwayListener
                onClickAway={() => {
                  setOpenDelete(false);
                  setConfirmDelete("");
                }}
              >
                <div
                  style={{ boxShadow: "var(--ds-shadow-overlay)" }}
                  className="w-[304px] bg-white rounded-md mt-2"
                  ref={anchorEl}
                >
                  <div className="flex items-center py-1 px-2 ">
                    <h2 className="flex-1 text-center text-sm text-[#44546f] font-semibold">Delete Workspace?</h2>
                    <button
                      onClick={() => {
                        setConfirmDelete("");
                        setOpenDelete(false);
                      }}
                      className="w-8 h-8 text-[#44546f] rounded-md hover:bg-[var(--hover-background)]"
                    >
                      <Close />
                    </button>
                  </div>

                  <div className="px-3 pb-3 flex flex-col">
                    <h3 className="text-[var(--text-color)] text-base mb-2 font-semibold">
                      {`Enter the workspace name "${workspaceData?.title}" to delete`}
                    </h3>
                    <div className="text-[#44546f] font-semibold text-xs">Things to know:</div>
                    <ul className="list-disc">
                      <li className="text-sm text-[var(--text-color)] ml-5 mt-2">
                        This is permanent and can't be undone.
                      </li>
                      <li className="text-sm text-[var(--text-color)] ml-5 mt-2">
                        All boards in this Workspace will be closed.
                      </li>
                      <li className="text-sm text-[var(--text-color)] ml-5 mt-2">Board admins can reopen boards.</li>

                      <li className="text-sm text-[var(--text-color)] ml-5 mt-2">
                        Board members will not be able to interact with closed boards.
                      </li>
                    </ul>

                    <div className="text-[#44546f] font-semibold text-xs my-2">Enter the Workspace name to delete</div>
                    <TextField
                      value={confirmDelete}
                      onChange={(e) => {
                        setConfirmDelete(e.target.value);
                      }}
                      sx={{
                        "& .MuiInputBase-input": {
                          paddingY: "4px",
                          paddingX: "12px",
                        },
                      }}
                    />

                    <Button
                      onClick={handleDeleteWsp}
                      variant="contained"
                      color="error"
                      disabled={!canDelete}
                      sx={{ textTransform: "none", marginTop: "8px" }}
                    >
                      Delete Workspace
                    </Button>
                  </div>
                </div>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default React.memo(WorkspaceSettings);
