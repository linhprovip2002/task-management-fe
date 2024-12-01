import {
  Autocomplete,
  Button,
  Checkbox,
  Modal,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import capitalize from "lodash/capitalize";

import Loading from "../../Loading";
import { CenterModel } from "../styles";
import { CreateNewRoleModal } from "./CreateNewRoleModal";
import {
  useGetBoardPermission,
  useGetBoardRole,
} from "../../../Hooks/useBoardPermission";
import { updateBoardPermission } from "../../../Services/API/apiBoardPermission";
import { EQueryKeys } from "../../../constants";

export const EditPermissionModal = ({ open: defaultOpen, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkedAll, setCheckedAll] = useState({
    board: false,
    list: false,
    card: false,
    comment: false,
    tag: false,
  });
  const [openCreateRoleModal, setOpenCreateRoleModal] = useState(false);

  const { handleSubmit, getValues, watch, setValue, control } = useForm();
  const { idBoard } = useParams();
  const queryClient = useQueryClient();

  const { dataBoardPermission } = useGetBoardPermission(watch("role")?.value);
  const {
    dataBoardRole,
    isLoading: isLoadingRole,
    refetch: refetchBoardRole,
  } = useGetBoardRole(idBoard);

  const RoleOptions = useMemo(() => {
    if (!dataBoardRole) return [];
    const roles = [{ value: "newRole", label: "Create New Role" }];
    dataBoardRole.forEach((role) => {
      roles.push({
        value: role.id,
        label: role.name,
      });
    });
    return roles;
  }, [dataBoardRole]);

  const PermissionGridConstants = useMemo(() => {
    if (!dataBoardPermission) return [];
    return dataBoardPermission.reduce((acc, permission) => {
      if (!acc.find((p) => p.title === permission.moduleName)) {
        acc.push({
          title: permission.moduleName,
          children: [],
        });
      }
      const index = acc.findIndex((p) => p.title === permission.moduleName);

      acc[index].children.push({
        id: permission.id,
        title:
          capitalize(permission.moduleName) +
          " " +
          capitalize(permission.actionName),
      });
      return acc;
    }, []);
  }, [dataBoardPermission]);

  const watchRole = watch("role");
  const watchPermissionByRole = watch("permissions");

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      roleId: data.role.value,
      permissionId: [...new Set(data.permissions)],
    };
    updateBoardPermission(idBoard, payload)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [EQueryKeys.GET_BOARD_PERMISSION],
        });
        refetchBoardRole();
        toast.success("Permission updated successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error updating permission");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (permission, value) => {
    if (!watch("role")) {
      toast.error("Please select a role first");
      return;
    }
    const formValues = getValues("permissions") || [];
    const updatedPermissions = value
      ? [...formValues, permission.id].filter(Boolean)
      : formValues.filter((p) => p !== permission.id);
    const uniquePermissions = [...new Set(updatedPermissions)];
    setValue("permissions", uniquePermissions);
  };

  const handleCheckedAll = (module, value) => {
    setCheckedAll((prev) => ({
      ...prev,
      [module]: value,
    }));
    const modulePermission = dataBoardPermission
      .filter((permission) => permission.moduleName === module)
      .map((child) => child.id);

    const currentPermissions = getValues("permissions") || [];

    const updatedPermissions = value
      ? [...new Set([...currentPermissions, ...modulePermission])]
      : currentPermissions.filter((perm) => !modulePermission.includes(perm));

    setValue("permissions", updatedPermissions);
  };

  useEffect(() => {
    if (watchRole?.value === "newRole") {
      setValue("role", null);
      setOpenCreateRoleModal(true);
      return;
    }

    const permissionsByRole = dataBoardPermission
      .map((permission) => permission.isGranted && permission.id)
      .filter(Boolean);

    setValue("permissions", permissionsByRole);
    setCheckedAll({});
    // eslint-disable-next-line
  }, [watchRole, dataBoardRole]);

  useEffect(() => {
    // Update checkedAll state based on permissions
    if (watchRole?.value === "newRole") return;
    const updatedCheckedAll = {};

    PermissionGridConstants.forEach((permission) => {
      const modulePermission = dataBoardPermission
        .filter((perm) => perm.moduleName === permission.title)
        .map((child) => child.id);

      const allChecked = modulePermission.every((perm) =>
        watchPermissionByRole?.includes(perm),
      );

      updatedCheckedAll[permission.title] = allChecked;
    });

    setCheckedAll(updatedCheckedAll);
    // eslint-disable-next-line
  }, [watchPermissionByRole, watchRole]);

  const loading = isLoading || isLoadingRole || !dataBoardRole;

  return (
    <>
      <Modal
        open={defaultOpen}
        onClose={() => {
          handleClose();
        }}
      >
        <>
          {loading && <Loading />}
          <form
            className={`w-3/4 overflow-x-hidden flex flex-col items-center p-6 rounded-md bg-white ${CenterModel}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-2xl font-bold mb-6">
              Edit Role & Permission
            </div>
            <div className="w-full">
              <div className="flex w-full gap-4 items-center max-sm:flex-col max-sm:items-start mb-4 font-semibold">
                <div className="w-1/12">Role</div>
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
                      renderInput={(params) => (
                        <TextField {...params} label="Role" />
                      )}
                      onChange={(_, data) => field.onChange(data)}
                    />
                  )}
                />
                <div className="w-60 h-full">
                  <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    fullWidth
                    disabled={!watchRole}
                    sx={{ textTransform: "none" }}
                  >
                    Save new settings
                  </Button>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 max-h-[75vh] overflow-y-scroll">
                {PermissionGridConstants.map((permission) => (
                  <div
                    className="flex items-center w-full gap-4 border-b border-slate-100"
                    key={permission.title}
                  >
                    <Checkbox
                      checked={checkedAll[permission.title]}
                      onChange={(e) => {
                        handleCheckedAll(permission.title, e.target.checked);
                      }}
                    />
                    <div className="w-1/12 font-semibold">
                      {capitalize(permission.title)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-1 overflow-x-hidden">
                      {permission.children.map((child) => {
                        return (
                          <div
                            className="flex gap-2 items-center w-full"
                            key={child.title}
                          >
                            <Switch
                              checked={watchPermissionByRole?.includes(
                                child.id,
                              )}
                              onChange={(_, value) => {
                                handleChange(child, value);
                              }}
                            />
                            <div>{child.title}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </>
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
