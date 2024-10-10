import { useState } from "react";
import Modal from "@mui/material/Modal";
import { CenterModel } from "../styles";
import { Button, TextField, Autocomplete } from "@mui/material";
import { CreateWorkspaceDefaultValues } from "./constants";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../Hooks";
import { useGetUser } from "../../Hooks";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { workspaceServices } from "../../Services";
import { EQueryKeys } from "../../constants";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

export const EditWorkspaceModal = ({ open, handleClose }) => {
  const queryClient = new QueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: CreateWorkspaceDefaultValues
  });
  const [searchMember, setSearchMember] = useState("");
  const debounceSearchMember = useDebounce(searchMember, 500);

  // Map this to select options later
  const { userInfo } = useGetUser({
    name: debounceSearchMember
  });

  const mutation = useMutation({
    mutationFn: (workspaceData) =>
      workspaceServices.createWorkspace(workspaceData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_WORKSPACE_BY_USER]
      });
    },
    onSettled: () => {
      handleClose();
      reset(CreateWorkspaceDefaultValues);
    }
  });

  const onSubmit = (workspaceData) => {
    mutation.mutate(workspaceData);
    console.log(workspaceData);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          reset(CreateWorkspaceDefaultValues);
        }}
      >
        <form
          className={`w-3/4 h-3/4 flex bg-white ${CenterModel}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1 px-20 pt-20 flex flex-col gap-4">
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
            <div className="flex flex-col gap-1">
              <div className="font-bold">Workspace members</div>
              <Autocomplete
                multiple
                options={names}
                filterSelectedOptions
                onInputChange={(_, newInputValue) => {
                  setSearchMember(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Find members" />
                )}
              />
              <div>
                Add members to your Workspace so they can collaborate on boards.
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Create Workspace
            </Button>
          </div>
          <div className="bg-blue-100 flex-1">1 cái ảnh ở đây</div>
        </form>
      </Modal>
    </>
  );
};
