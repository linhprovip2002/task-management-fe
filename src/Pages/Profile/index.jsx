import { Avatar, Button, CircularProgress, Divider, TextField } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { useStorage } from "../../Contexts/Storage";
import { Controller, useForm } from "react-hook-form";
import { userServices } from "../../Services";
import { toast } from "react-toastify";
import { useState } from "react";

const tabItemStyles =
  "text-sm w-fit text-[var(--dark-slate-blue)] font-bold pt-2 pb-[9px] cursor-pointer hover:text-[var(--primary)] mr-4";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function Profile() {
  const { userData, setUserData } = useStorage();
  const [isFetching, setIsFetching] = useState(false);

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
        console.log(err);
        toast.error("Update profile unsuccessfully");
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <div>
      <div>
        <div className="max-w-[875px] pl-[48px] pr-8 py-[26px] flex">
          <div className="flex py-5">
            <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full">
              {userData?.avatarUrl ? (
                <Avatar alt={userData?.name} src={userData?.avatarUrl} />
              ) : (
                <Avatar {...stringAvatar(userData?.name || "")} />
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-[var(--text-color)] text-xl font-semibold">{userData?.name}</h2>
              <span className="text-[#44546f] text-xs">{userData?.email}</span>
            </div>
          </div>
        </div>
      </div>

      <ul className="flex mx-12 border-b-2 border-gray-200 border-solid">
        <li className={tabItemStyles}>Profile and visibility</li>
        <li className={tabItemStyles}>Activity</li>
        <li className={tabItemStyles}>Cards</li>
        <li className={tabItemStyles}>Settings</li>
      </ul>

      <div className="max-w-[900px] p-8 m-auto">
        <div className="max-w-[530px] m-auto flex flex-col">
          <img className="mt-[18px] mb-12" src="https://trello.com/assets/eff3d701a9c3a71105ea.svg" alt="" />

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
      </div>
    </div>
  );
}
