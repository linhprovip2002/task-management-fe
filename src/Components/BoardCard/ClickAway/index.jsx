import { ClickAwayListener } from "@mui/material";
import { memo } from "react";

function ClickAway({ onClickAway, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[200]">
      <ClickAwayListener onClickAway={onClickAway}>{children}</ClickAwayListener>
    </div>
  );
}

export default memo(ClickAway);
