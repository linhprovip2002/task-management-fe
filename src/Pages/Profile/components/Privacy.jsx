import { Button, Divider, IconButton, OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";
import { userServices } from "../../../Services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { PrivacyConstants } from "../constants/PrivacyTabs.constant";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { joiResolver } from "@hookform/resolvers/joi";
import Loading from "../../../Components/Loading";
import { changePasswordValidation } from "../validation/change-password.validation";

export const Privacy = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: PrivacyConstants,
    resolver: joiResolver(changePasswordValidation)
  });

  useEffect(() => {
    if (errors) toast.error(errors?.message);
  }, [errors]);

  const handleChangePassword = async (values) => {
    setIsFetching(true);
    userServices
      .changePassword(values)
      .then((res) => {
        toast.success("Change password successfully");
      })
      .catch(() => {
        toast.error("Change password failed");
      })
      .finally(() => setIsFetching(false));
  };

  const isDisabledSubmit = !watch("newPassword") || !watch("currentPassword");

  return (
    <>
      {isFetching && <Loading />}
      <div className="max-w-[900px] p-8 m-auto">
        <div className="max-w-[530px] m-auto flex flex-col">
          <h1 className="text-2xl font-semibold mb-10">Security</h1>
          <h3 className="text-lg font-semibold">Change your Password</h3>
          <Divider component={"div"} />
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <div className="flex flex-col ">
              <label className="pt-4 text-sm text-[var(--text-color)] font-semibold">
                Current Password
              </label>
              <OutlinedInput
                {...register("currentPassword")}
                placeholder="Enter current password"
                type={showPassword.currentPassword ? "text" : "password"}
                autoComplete="off"
                required
                endAdornment={
                  <IconButton
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        currentPassword: !prev.currentPassword
                      }))
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword.currentPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                }
                size="small"
              />
            </div>

            <div className="flex flex-col">
              <label className="pt-4 text-sm text-[var(--text-color)] font-semibold">
                New Password
              </label>
              <OutlinedInput
                {...register("newPassword")}
                placeholder="Enter new password"
                type={showPassword.newPassword ? "text" : "password"}
                autoComplete="off"
                required
                endAdornment={
                  <IconButton
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        newPassword: !prev.newPassword
                      }))
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword.newPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                }
                size="small"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "20px" }}
              size="small"
              disabled={isDisabledSubmit}
            >
              Save Change
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
