import React from "react";
import PropTypes from "prop-types";

function MenuItem({ icon, children }) {
  return (
    <div className="h-8 cursor-pointer px-3 flex items-center gap-2 hover:bg-[#091E420F] rounded-md text-[var(--text-color)]">
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.string,
};

export default MenuItem;
