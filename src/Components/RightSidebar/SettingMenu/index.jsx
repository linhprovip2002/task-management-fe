import React from "react";
import MenuItem from "../MenuItem";

const styles = {
  permissionHeader: "text-[var(--text-color)] text-[14px] font-semibold py-2 px-3",
};
export default function SettingMenu() {
  return (
    <div className="flex flex-col">
      <h1 className={styles.permissionHeader}>Worksapce</h1>
      <MenuItem>BKDN</MenuItem>
      <div className="mt-3">
        <h1 className={styles.permissionHeader}>Permissions</h1>
      </div>
      <MenuItem>Commenting</MenuItem>
      <MenuItem>Adding and removing members</MenuItem>
      <MenuItem>Workspace editing</MenuItem>

      <div className="mt-3">
        <h1 className={styles.permissionHeader}>Covers</h1>
      </div>

      <MenuItem>Card covers enabled</MenuItem>
      <div className="mt-3">
        <h1 className={styles.permissionHeader}>Collections</h1>
      </div>
    </div>
  );
}
