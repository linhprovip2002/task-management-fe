import React, { useState } from "react";

import { CreateItem } from "../../Components/CreateItem";
import { AddIcon } from "../../Components/Icons";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import List from "./List";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../Utils/array";

function ListInBoard() {
  const [items, setItems] = useState({
    group1: ["1", "2", "3"],
    group2: ["4", "5", "6"],
    group3: ["7", "8", "9"],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragOver = ({ over, active }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;

    if (!overContainer) {
      return;
    }

    // if (activeContainer !== overContainer) {
    //   setItems((items) => {
    //     const activeIndex = active.data.current.sortable.index;
    //     const overIndex = over.data.current?.sortable.index || 0;

    //     return moveBetweenContainers(items, activeContainer, activeIndex, overContainer, overIndex, active.id);
    //   });
    // }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    // if (active.id !== over.id) {
    //   const activeContainer = active.data.current.sortable.containerId;
    //   const overContainer = over.data.current?.sortable.containerId || over.id;
    //   const activeIndex = active.data.current.sortable.index;
    //   const overIndex = over.data.current?.sortable.index || 0;

    //   setItems((items) => {
    //     let newItems;
    //     if (activeContainer === overContainer) {
    //       newItems = {
    //         ...items,
    //         [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
    //       };
    //     } else {
    //       newItems = moveBetweenContainers(items, activeContainer, activeIndex, overContainer, overIndex, active.id);
    //     }

    //     return newItems;
    //   });
    // }
  };

  const moveBetweenContainers = (items, activeContainer, activeIndex, overContainer, overIndex, item) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  let { nameTitle, isShowAddList, listCount, handleShowAddList, handleAddList, handleChangeTitleCard } =
    useListBoardContext();

  return (
    <div className="relative h-[90vh]">
      <div
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#fff6 #00000026",
        }}
        className="absolute h-full top-0 left-0 right-0 mb-2 pb-2 overflow-x-auto overflow-y-hidden whitespace-nowrap"
      >
        <div className="my-4 px-[4px] flex">
          <div className="flex flex-nowrap">
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
              <div style={{ display: "flex" }}>
                {listCount.map((item, index) => {
                  return <List key={index} item={item} />;
                })}
              </div>
            </DndContext>

            <div className="px-[8px]">
              <div
                onClick={!isShowAddList ? handleShowAddList : null}
                className={`flex items-center w-[248px] rounded-[12px] bg-gray-100 p-[6px] ${!isShowAddList ? "hover:bg-gray-300" : ""} cursor-pointer`}
              >
                {!isShowAddList ? (
                  <>
                    <div className="rounded-[4px] p-2 hover:bg-gray-300 transition-opacity duration-300">
                      <AddIcon width={16} height={16} />
                    </div>
                    <div className="text-[16px] font-medium">Add another list</div>
                  </>
                ) : (
                  <div className="w-full">
                    <CreateItem
                      isList={true}
                      nameBtn={"Add list"}
                      descriptionCard={nameTitle}
                      placeHolderText={"Enter list name..."}
                      onAdd={handleAddList}
                      onShow={handleShowAddList}
                      onChangeTitle={handleChangeTitleCard}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ListInBoard);
