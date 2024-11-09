import { Autocomplete, Modal, Switch, TextField } from "@mui/material";
import Loading from "../../Loading";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CenterModel } from "../styles";
import { PermissionGridConstants, RoleOptions } from "./constants/Permission.constants";
import { CreateNewRoleModal } from "./CreateNewRoleModal";

export const EditPermissionModal = ({ open: defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [openCreateRoleModal, setOpenCreateRoleModal] = useState(false);
  const { handleSubmit, getValues, watch, setValue, control } = useForm();

  const watchRole = watch("role");

  const onSubmit = async (data) => {
    setIsLoading(true);
  };

  const handleChange = (permissionTitle, childTitle, value) => {
    const formValues = getValues();
    const updatedPermissions = {
      ...formValues.permissions,
      [permissionTitle]: {
        ...formValues.permissions?.[permissionTitle],
        [childTitle]: value,
      },
    };
    setValue("permissions", updatedPermissions);
  };
  console.log(watch());
  useEffect(() => {
    if (watchRole?.value === "newRole") {
      setValue("role", null);
      setOpenCreateRoleModal(true);
    }
    // eslint-disable-next-line
  }, [watchRole]);

  return (
    <>
      {isLoading && <Loading />}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <form className={`w-1/2 flex p-4 rounded-md bg-white ${CenterModel}`} onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <div className="flex w-full gap-2 items-center">
              <div>Role</div>
              <Controller
                name="role"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    size="small"
                    options={RoleOptions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Role" />}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
              />
              <div>Team</div>
              <Controller
                name="team"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    size="small"
                    options={RoleOptions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Team" />}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              {PermissionGridConstants.map((permission) => (
                <div className="flex items-center w-full" key={permission.title}>
                  <div className="min-w-1/2 w-1/2">{permission.title}</div>
                  <div className="flex gap-4 items-center">
                    {permission.children.map((child) => (
                      <div className="flex gap-2 items-center" key={child.title}>
                        <div>{child.title}</div>
                        <Controller
                          name={`permissions.${permission.title}.${child.title}`}
                          control={control}
                          render={({ field }) => (
                            <Switch
                              checked={field.value || false}
                              onChange={(_, value) => handleChange(permission.title, child.title, value)}
                            />
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </Modal>
      {openCreateRoleModal && (
        <CreateNewRoleModal
          open={openCreateRoleModal}
          handleClose={() => {
            setOpenCreateRoleModal(false);
          }}
        />
      )}
    </>
  );
};
