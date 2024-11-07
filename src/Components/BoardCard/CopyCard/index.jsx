import React, { useCallback, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import TextField from "@mui/material/TextField";

import { useListBoardContext } from "../../../Pages/ListBoard/ListBoardContext";
import DropItemChoose from "../../DropItemChoose";
import { itemChooseToMove } from "../../HiDotsVertical/constans";
import { itemChooseCopyCard } from "../constans/list.constans";
import { ButtonBoardCard } from "../../ButtonBoardCard";

function CopyCard({ position, handleCloseShowMenuBtnCard }) {
  const { dataCard } = useListBoardContext();

  const [positionChoose, setPositionChoose] = useState({ top: 0, left: 0 });
  const [titleCard, setTitleCard] = useState(dataCard?.title || "");

  const handleChooseMoveList = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPositionChoose({ top: rect.bottom + 8, left: rect.left });
  }, []);
  return (
    <div
      style={{ top: position.top - 300, left: position.left }}
      className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50 shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
    >
      <div className="text-center p-2 mx-8">Copy card</div>
      <div className="mx-2">
        <div className="py-2 bg-white">Name</div>
        <TextField
          onChange={(e) => setTitleCard(e.target.value)}
          value={titleCard}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "60px !important",
            },
            "& .MuiInputBase-root": {
              height: "60px !important",
              padding: "0 12px",
              "& textarea": {
                height: "54px !important",
                overflow: "auto",
                resize: "none",
                lineHeight: "1.2",
              },
            },
          }}
        />
      </div>
      {itemChooseCopyCard.map((item, index) => (
        <DropItemChoose
          key={index}
          info={item}
          itemChooseToMove={itemChooseToMove}
          position={positionChoose}
          onChoose={handleChooseMoveList}
        />
      ))}
      <div className="mt-4 ml-2">
        <ButtonBoardCard
          nameBtn="Create card"
          isActive={true}
          className={"w-[100px] bg-blue-500 justify-center text-white hover:opacity-90"}
        />
      </div>
      <CloseIcon
        onClick={handleCloseShowMenuBtnCard}
        className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
      />
    </div>
  );
}

export default React.memo(CopyCard);
