import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function TippyDetail({ title, children }) {
  return (
    <Tippy content={<span className="text-[12px] max-w-[150px]">{title}</span>} arrow={false} placement="bottom">
      {children}
    </Tippy>
  );
}

export default React.memo(TippyDetail);
