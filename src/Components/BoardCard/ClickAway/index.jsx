import { ClickAwayListener } from "@mui/material";
import { memo } from "react";

function ClickAway({ onClickAway, children }) {
  return <ClickAwayListener onClickAway={onClickAway}>{children}</ClickAwayListener>;
}

export default memo(ClickAway);
