import { Avatar, Button, CircularProgress, Divider, TextField } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { Controller, useForm } from "react-hook-form";
import { userServices } from "../../../Services";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useStorage } from "../../../Contexts";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import classnames from "classnames/bind";
import styles from "./Avatar.module.scss";
import { apiUploadFile } from "../../../Services/API/ApiUpload/apiUpload";
const cx = classnames.bind(styles);

export const ProfileAndVisibility = () => {
  const { userData, setUserData } = useStorage();
  const [isFetching, setIsFetching] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl);

  const fileInputRef = useRef(null);

  const form = useForm({
    defaultValues: {
      userName: userData?.name,
      bio: userData?.bio || "",
    },
  });

  const handleUpdate = (values) => {
    setIsFetching(true);
    userServices
      .updateUser({
        name: values.userName,
        bio: values.bio,
      })
      .then((res) => {
        setUserData({
          id: res.id,
          name: res.name,
          email: res.email,
          bio: res.bio,
          avatarUrl: res.avatarUrl,
          createdAt: res.createdAt,
          updatedAt: res.updatedAt,
          deletedAt: res.deletedAt,
        });
        toast.success("Update profile successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Update profile unsuccessfully");
      })
      .finally(() => setIsFetching(false));
  };

  const handlePickImage = () => {
    fileInputRef.current.click();
  };

  const handleChoosedFile = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const choosedFile = files[0];
      const url = URL.createObjectURL(choosedFile);
      //! clear cache if change multi files
      setAvatarUrl(url);
      apiUploadFile(choosedFile)
        .then((res) => {
          setAvatarUrl(res.data.location);
          userServices
            .updateUser({ avatarUrl: res.data.location })
            .then(() => {
              setUserData((prev) => {
                return { ...prev, avatarUrl: res.data.location };
              });
              toast.success("Update avatar successfully");
            })
            .catch((err) => {
              toast.error("Update avatar unsuccessfully");
            });
        })
        .catch((err) => {
          toast.error("Upload file not successfully");
        });
    }
  };

  useEffect(() => {
    document.title = `${userData.name} | Kanban`;
    return () => {
      document.title = "Kanban";
    };
  }, [userData]);

  return (
    <div className="max-w-[900px] p-8 m-auto">
      <div className="max-w-[530px] m-auto flex flex-col">
        <div className="relative">
          <img className="mt-[18px] mb-12" src="https://trello.com/assets/eff3d701a9c3a71105ea.svg" alt="" />

          <div className="absolute top-20 left-20">
            <div className={cx(["avatar-container", "relative"])}>
              <Avatar
                sx={{ width: 96, height: 96, border: "2px solid #fff" }}
                src={
                  avatarUrl ||
                  "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                }
                alt=""
              />
              <div
                onClick={handlePickImage}
                className={cx([
                  "avatar-cover",
                  "absolute top-0 left-0 w-[96px] h-[96px] rounded-full cursor-pointer flex items-center justify-center",
                ])}
              >
                <CameraAltOutlinedIcon sx={{ color: "#fff" }} fontSize="small" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-color)] mb-[10px]">
            Manage your personal information
          </h1>
          <p className="bg-[var(--hover-background)] p-4 mb-2 text-sm text-[var(--dark-slate-blue)]">
            This is an Atlassian account. Edit your personal information and visibility settings through your{" "}
            <a
              className="text-[var(--primary)]"
              href="https://id.atlassian.com/manage-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Atlassian profile
            </a>
            . To learn more, view our{" "}
            <a
              className="text-[var(--primary)]"
              href="https://www.atlassian.com/legal/cloud-terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{" "}
            or{" "}
            <a
              className="text-[var(--primary)]"
              href="https://www.atlassian.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <h3 className="mb-2 mt-10 text-[20px] font-semibold text-[var(--text-color)]">About</h3>
        <Divider component={"div"} />
        <form onSubmit={form.handleSubmit(handleUpdate)}>
          <div className="flex flex-col ">
            <div className="flex justify-between my-3">
              <label className="pt-4 text-sm text-[var(--text-color)] font-semibold">Username</label>
              <div className="pt-4 flex items-center text-[var(--dark-slate-blue)]">
                <PublicIcon color="#44546f" sx={{ width: "16px", height: "16px", mr: 0.5 }} />
                <div className="text-xs">Always public</div>
              </div>
            </div>
            <Controller
              name="userName"
              control={form.control}
              render={({ field }) => {
                return (
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    sx={{
                      "& .MuiInputBase-input": {
                        paddingY: "8px",
                        paddingX: "12px",
                        fontSize: 14,
                      },
                    }}
                  />
                );
              }}
            />
          </div>

          <div className="flex flex-col ">
            <div className="flex justify-between my-3">
              <label className="pt-4 text-sm text-[var(--text-color)] font-semibold">Bio</label>
              <div className="pt-4 flex items-center text-[var(--dark-slate-blue)]">
                <PublicIcon color="#44546f" sx={{ width: "16px", height: "16px", mr: 0.5 }} />
                <div className="text-xs">Always public</div>
              </div>
            </div>
            <Controller
              name="bio"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  className="border border-gray-500 border-solid"
                />
              )}
            />
          </div>

          <Button
            startIcon={isFetching && <CircularProgress size={20} color="#fff" />}
            type="submit"
            variant="contained"
            sx={{
              mt: 4,
              textTransform: "none",
              height: "32px",
              paddingY: "6px",
              paddingX: "12px",
            }}
          >
            Save
          </Button>
        </form>
      </div>
      <input
        onChange={handleChoosedFile}
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/png, image/gif, image/jpeg"
      />
    </div>
  );
};
