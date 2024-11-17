import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonBoardCard } from "../ButtonBoardCard";
import ClickAway from "../BoardCard/ClickAway";

const ToDoMenu = ({
  position,
  inputTitleToDo,
  handleChangeInputTodo,
  handleCreateNewToDoList,
  handleCloseShowMenuBtnCard,
}) => {
  const handleClickAway = () => {
    handleCloseShowMenuBtnCard();
  };

  return (
    <ClickAway onClickAway={handleClickAway}>
      <div
        style={{ top: position.top, left: position.left }}
        className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50 shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
      >
        <div className="text-center p-2 mx-8">Add to-do list</div>
        <div className="mx-2">
          <div className="py-2 bg-white">Title</div>
          <div className="border-2 border-gray-500 rounded-[2px]">
            <input
              type="text"
              value={inputTitleToDo}
              onChange={(e) => handleChangeInputTodo(e)}
              className="w-full bg-white rounded-[2px] text-base font-[400] px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4 mx-2">
          <ButtonBoardCard
            onHandleEvent={() => handleCreateNewToDoList(inputTitleToDo)}
            nameBtn="More"
            isActive={true}
            className={"w-[100px] bg-blue-500 justify-center text-white hover:opacity-90"}
          />
        </div>
        <CloseIcon
          onClick={handleCloseShowMenuBtnCard}
          className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100"
        />
      </div>
    </ClickAway>
  );
};

export default ToDoMenu;
