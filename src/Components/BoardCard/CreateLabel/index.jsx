import React from "react";
import { Divider } from "@mui/material";

import ItemMenu from "../../ItemMenu";
import { ButtonBoardCard } from "../../ButtonBoardCard";
import { colors } from "../../RightSidebar/LabelMenu/constant";
import ClickAway from "../ClickAway";

function CreateLabel({
  position,
  tag,
  isUpdateLabel,
  handleCloseShowMenuBtnCard,
  ShowDetailNewLabel,
  chooseColorLabel,
  handleChangeInputLabel,
  inputTitleLabel,
  handleChooseColor,
  handleCreateNewLabel,
  onUpdateLabel,
}) {
  const handleClickAway = () => {
    handleCloseShowMenuBtnCard();
  };
  return (
    <ClickAway onClickAway={handleClickAway}>
      <div style={{ top: position.top - 200, left: position.left }} className="absolute z-[300]">
        <ItemMenu title={"Label"} onClose={handleCloseShowMenuBtnCard} onBack={ShowDetailNewLabel}>
          <div className="flex items-center justify-center bg-gray-100 h-[60px]">
            {chooseColorLabel ? (
              <div
                style={{
                  backgroundColor: chooseColorLabel.colorCode,
                }}
                className={`w-[80%] h-[32px] p-2 rounded-[4px]`}
              >
                <font>{inputTitleLabel}</font>
              </div>
            ) : (
              <div
                className={`${colors.length > 0 ? colors[0].colorCode : "bg-gray-100"} w-[80%] h-[32px] p-2 rounded-[4px]`}
              >
                <font>{inputTitleLabel}</font>
              </div>
            )}
          </div>
          <div
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#fff6 #00000026",
              overflowY: "auto",
              maxHeight: "400px",
            }}
            className="px-2"
          >
            <div className="py-2 bg-white">Title</div>
            <div className="border-2 border-gray-500 rounded-[2px]">
              <input
                type="text"
                value={inputTitleLabel}
                onChange={handleChangeInputLabel}
                className="w-full bg-white rounded-[2px] text-base font-[200] px-2 py-1 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-2">
              <div className="py-2 bg-white">Select a color</div>
              <ul className="flex items-center justify-center flex-wrap">
                {colors?.map((item, index) => (
                  <li
                    onClick={() => handleChooseColor(item)}
                    key={index}
                    style={{
                      backgroundColor: item.colorCode,
                    }}
                    className={`w-12 h-8 rounded-[4px] mr-1 mb-1 ${chooseColorLabel.colorCode === item.colorCode && "border-[3px] border-blue-500 shadow-[0_3px_10px_rgba(0,0,0,0.3)]"}`}
                  ></li>
                ))}
              </ul>
            </div>
            <div className="my-4">
              <ButtonBoardCard
                onHandleEvent={ShowDetailNewLabel}
                nameBtn="Remove color"
                isActive={true}
                className={"justify-center bg-gray-200 hover:bg-gray-300"}
              />
            </div>
            <Divider />
            {!isUpdateLabel ? (
              <div className="mt-4">
                <ButtonBoardCard
                  onHandleEvent={() => handleCreateNewLabel(chooseColorLabel, inputTitleLabel)}
                  nameBtn="Create new"
                  isActive={true}
                  className={"w-[100px] bg-blue-500 justify-center text-white hover:opacity-90"}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between mt-4">
                <ButtonBoardCard
                  onHandleEvent={() => onUpdateLabel(tag, chooseColorLabel, inputTitleLabel)}
                  nameBtn="Save"
                  isActive={true}
                  className={"w-[100px] bg-blue-500 justify-center text-white hover:opacity-90"}
                />
                <ButtonBoardCard
                  onHandleEvent={() => handleCreateNewLabel(chooseColorLabel, inputTitleLabel)}
                  nameBtn="Remove"
                  isActive={true}
                  className={"w-[100px] bg-red-500 justify-center text-white hover:opacity-90"}
                />
              </div>
            )}
          </div>
        </ItemMenu>
      </div>
    </ClickAway>
  );
}

export default React.memo(CreateLabel);
