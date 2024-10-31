import { Button, Modal } from "@mui/material";
import { CenterModel } from "../styles";
import { workspaceServices } from "../../../Services";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryKeys } from "../../../constants";
import { useState } from "react";
import Loading from "../../Loading";

export const RemoveMemberModal = ({ open, handleClose, member }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const handleRemoveMember = () => {
    setIsLoading(true);
    workspaceServices
      .removeWorkspaceMember(+id, +member.id)
      .then(() => {
        queryClient.invalidateQueries([EQueryKeys.GET_WORKSPACE_MEMBER]);
        queryClient.invalidateQueries([EQueryKeys.GET_WORKSPACE_BY_USER]);
        toast.success("Member removed successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to remove member");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
      >
        <form
          className={`bg-white p-8 flex flex-col gap-4 ${CenterModel} w-1/4 rounded-xl`}
          onSubmit={handleRemoveMember}
        >
          <div className="text-xl font-bold">Remove member</div>
          <div>
            Are you sure you want to remove{" "}
            <span className="font-bold">{member.name}</span>
          </div>
          <div className="flex gap-4 self-end">
            <Button
              type="button"
              variant="contained"
              color="warning"
              onClick={handleRemoveMember}
            >
              Remove
            </Button>
            <Button type="button" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {isLoading && <Loading />}
    </>
  );
};
