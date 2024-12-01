import React from "react";
import {
  Close as CloseIcon,
  ModeEdit as ModeEditIcon,
} from "@mui/icons-material";
import { ButtonBoardCard } from "../../ButtonBoardCard";
import ClickAway from "../ClickAway";

function AddLabelInCard({
  position,
  labelOfCard,
  listColorLabel,
  handleAddLabel,
  ShowUpdateLabel,
  ShowDetailNewLabel,
  handleCloseShowMenuBtnCard,
}) {
  const handleClickAway = () => {
    handleCloseShowMenuBtnCard();
  };

  return (
    <ClickAway onClickAway={handleClickAway}>
      <div
        style={{ top: position.top - 150, left: position.left }}
        className="absolute w-[280px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-[300] shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
      >
        <div className="text-center p-2 mx-8">Label</div>
        <div
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#fff6 #00000026",
            overflowY: "auto",
            maxHeight: "400px",
          }}
          className="px-2"
        >
          <div className="mx-1 border-2 border-gray-500 rounded-lg">
            <input
              type="text"
              // value={item.descriptionCard}
              // onChange={(e) => handleChange(e, index)}
              placeholder="Find the label..."
              className="w-full bg-white rounded-lg text-base font-[200] px-2 py-1 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-2">
            <div className="py-2 bg-white">Label</div>
            <ul>
              {listColorLabel?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center my-2 cursor-pointer"
                >
                  <input
                    checked={labelOfCard.some((i) => i.id === item.id)}
                    onChange={() => handleAddLabel(item)}
                    type="checkbox"
                    className="w-5 h-5 mx-2 cursor-pointer"
                  />
                  <span className="flex items-center w-full">
                    <div
                      onClick={() => handleAddLabel(item)}
                      style={{
                        backgroundColor: item.color,
                      }}
                      className={`flex-1 hover:opacity-90 h-[34px] p-2 rounded-[4px] transition-all duration-50`}
                    >
                      <font>{item.name}</font>
                    </div>
                    <div
                      onClick={() => ShowUpdateLabel(item)}
                      className=" hover:bg-gray-300 p-2 ml-2 rounded-[4px]"
                    >
                      <ModeEditIcon style={{ fontSize: "16px" }} />
                    </div>
                  </span>
                </li>
              ))}
              <div className="mt-4">
                <ButtonBoardCard
                  onHandleEvent={ShowDetailNewLabel}
                  nameBtn="Create new label"
                  isActive={true}
                  className={"justify-center bg-gray-200 hover:bg-gray-300"}
                />
              </div>
            </ul>
          </div>
          <CloseIcon
            onClick={handleCloseShowMenuBtnCard}
            className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
          />
        </div>
      </div>
    </ClickAway>
  );
}

export default React.memo(AddLabelInCard);
