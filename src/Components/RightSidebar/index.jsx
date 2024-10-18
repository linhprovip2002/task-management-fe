import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./RightSidebar.module.scss";
import MenuItem from "./MenuItem";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ListIcon from "@mui/icons-material/List";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LabelIcon from "@mui/icons-material/Label";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ShareIcon from "@mui/icons-material/Share";
import LogoutIcon from "@mui/icons-material/Logout";
const cx = classNames.bind(styles);

const sizeIcon = 20;
const items = [
  {
    title: "About this board",
    icon: <ErrorOutlineIcon sx={{ fontSize: sizeIcon }} />,
  },
  {
    title: "Activity",
    icon: <ListIcon sx={{ fontSize: sizeIcon }} />,
  },
  {
    title: "Archived Items",
    icon: <InventoryIcon sx={{ fontSize: sizeIcon }} />,
    divide: true,
  },
  {
    title: "Settings",
    icon: <SettingsIcon sx={{ fontSize: sizeIcon }} />,
  },
  {
    title: "Power-Ups",
    icon: <RocketLaunchIcon sx={{ fontSize: sizeIcon }} />,
  },
  {
    title: "Labels",
    icon: <LabelIcon sx={{ fontSize: sizeIcon }} />,
    divide: true,
  },
  {
    title: "Watch",
    icon: <RemoveRedEyeIcon sx={{ fontSize: sizeIcon }} />,
  },
  {
    title: "Coppy board",
    icon: <ContentCopyIcon sx={{ fontSize: sizeIcon }} />,
  },
  {
    title: "Email to board",
    icon: <MailOutlineIcon sx={{ fontSize: sizeIcon }} />,
  },
  {
    title: "Print,export and share",
    icon: <ShareIcon sx={{ fontSize: sizeIcon }} />,
  },
  {
    title: "Leave this board",
    icon: <LogoutIcon sx={{ fontSize: sizeIcon }} />,
  },
];

export default function RightSidebar({ isOpen, onClose }) {
  const handleClose = (e) => {
    if (onClose) return onClose(e);
  };
  return (
    <div className={cx(["drawer", "absolute top-0 right-0 z-[999]"], { open: isOpen })}>
      <div className={cx(["w-[339px] flex bg-white border-l border-solid border-gray-300 flex-col h-full"])}>
        <div className="px-3">
          <div className="flex items-center justify-between">
            <h3 className="flex-1 text-center my-[18px] mx-8 text-base font-semibold text-[var(--text-color)]">Menu</h3>
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-[var(--hover-background)]"
            >
              <CloseIcon sx={{ fontSize: "20px", color: "var(--text-color)" }} />
            </button>
          </div>

          <Divider component={"div"} />
        </div>

        <div className="px-3 pt-3 pb-2 flex flex-col gap-1">
          {items.map((item, index) => {
            return (
              <div key={index}>
                <MenuItem icon={item.icon}>{item.title}</MenuItem>
                {item.divide && (
                  <div className="py-1">
                    <Divider component={"div"} />{" "}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
