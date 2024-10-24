import Modal from "@mui/material/Modal";
import { CenterModel } from "../styles";
import { Button, TextField } from "@mui/material";
import { CreateWorkspaceDefaultValues } from "./constants";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceServices } from "../../../Services";
import { EQueryKeys } from "../../../constants";
import { SearchMember } from "../../SearchMember/SearchMember";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../../Loading";

export const EditWorkspaceModal = ({ open, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: CreateWorkspaceDefaultValues
  });

  const { mutate: mutateCreate } = useMutation({
    mutationFn: (workspaceData) =>
      workspaceServices.createWorkspace(workspaceData),
    onSuccess: () => {
      toast.success("Workspace created successfully");
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_WORKSPACE_BY_USER]
      });
    },
    onSettled: () => {
      setIsLoading(false);
      handleClose();
      reset(CreateWorkspaceDefaultValues);
    }
  });

  const onSubmit = async (workspaceData) => {
    setIsLoading(true);
    mutateCreate(workspaceData);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          reset(CreateWorkspaceDefaultValues);
        }}
      >
        <form
          className={`w-3/4 flex bg-white ${CenterModel}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col flex-1 gap-4 px-20 py-20">
            <div>
              <div className="text-xl font-bold">Let's build a Workspace</div>
              <div className="text-lg">
                Boost your productivity by making it easier for everyone to
                access boards in one location.
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold">Workspace name</div>
              <TextField
                {...register("title")}
                placeholder="Workspace name"
                className="w-full"
                variant="outlined"
              />
              <div>This is the name of your company, team or organization.</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold">Workspace description (Optional)</div>
              <TextField
                {...register("description")}
                id="filled-multiline-static"
                multiline
                rows={5}
                placeholder="Our team is fantastic"
                variant="outlined"
              />
              <div>
                Get your members on board with a few words about your Workspace.
              </div>
            </div>
            <SearchMember />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Create Workspace
            </Button>
          </div>
          <div className="relative max-2xl:hidden">
            <img
              src="/Workspaces/CreateWS_2.svg"
              alt="Create Workspace"
              className="h-full"
            />
            <img
              src="/Workspaces/CreateWS_1.svg"
              alt="Create Workspace"
              className="absolute top-0 container scale-50"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
