import { Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CenterModel } from "../styles";
import { useForm } from "react-hook-form";
import { SearchMember } from "../../SearchMember/SearchMember";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceServices } from "../../../Services";
import { EQueryKeys, EMemberRole } from "../../../constants";
import { defaultInviteMemberValues } from "./InviteMember.constant";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../../Loading";

export const InviteMemberModal = ({ open, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { id: workspaceId } = useParams();
  const { handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: defaultInviteMemberValues
  });

  const mutation = useMutation({
    mutationFn: (userId) =>
      workspaceServices.addWorkspaceMember(
        userId,
        +workspaceId,
        EMemberRole.MEMBER
      ),
    onSuccess: () => {
      toast.success("Add member successfully");
    },
    onError: (error) => {
      toast.error("Add member failed");
    },
    onSettled: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_WORKSPACE_BY_USER]
      });
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_WORKSPACE_MEMBER]
      });
      reset(defaultInviteMemberValues);
    }
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    mutation.mutate(data.members);
  };

  const handleChange = (_, newValue) => {
    if (!newValue) {
      setValue("members", "");
      return;
    }
    setValue("members", newValue?.id);
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Invite to Workspace</div>
            <div
              onClick={() => handleClose()}
              className="p-1 rounded-full hover:cursor-pointer hover:bg-slate-200"
            >
              <CloseIcon className="cursor-pointer" />
            </div>
          </div>
          <SearchMember onChange={handleChange} multiple={false} />
          {watch("members") ? (
            <Button variant="contained" type="submit">
              Add
            </Button>
          ) : null}
        </form>
      </Modal>
      {isLoading && <Loading />}
    </>
  );
};
