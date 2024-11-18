import React from "react";
import { Add as AddIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import { stringAvatar } from "../../Utils/color";

function ItemPerson({ handleShowMenuBtnCard, membersInCard }) {
  return (
    <div className="mr-2 mb-2">
      <div className="flex items-center text-[12px] mb-2">
        <span className="mr-2">Member</span>
      </div>
      <div className="relative flex items-center justify-center">
        {membersInCard?.map((item, index) => (
          <Avatar
            key={index}
            {...stringAvatar(item.user?.name)}
            alt={item.user?.name}
            src={item.user?.avatarUrl || ""}
            sx={{ width: 32, height: 32, marginRight: "8px" }}
          />
        ))}
        <div
          onClick={handleShowMenuBtnCard}
          className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mr-1 font-bold text-[12px] bg-gray-200 hover:bg-gray-300"
        >
          <AddIcon style={{ fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
}

ItemPerson.propTypes = {
  handleShowMenuBtnCard: PropTypes.func,
};

export default React.memo(ItemPerson);
