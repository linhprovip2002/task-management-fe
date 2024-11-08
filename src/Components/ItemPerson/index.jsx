import React from "react";
import { Add as AddIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";

function ItemPerson({ handleShowMenuBtnCard }) {
  const { membersInCard } = useListBoardContext();
  return (
    <div className="mr-2">
      <div className="flex items-center text-[12px] mb-2">
        <span className="mr-2">Member</span>
      </div>
      <div className="relative flex items-center justify-center">
        {membersInCard?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mr-1 font-bold text-white text-[12px] bg-gradient-to-b from-green-400 to-blue-500"
          >
            PM
          </div>
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
