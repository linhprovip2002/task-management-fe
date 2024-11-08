import React from "react";

import { CreateItem } from "../../Components/CreateItem";
import { AddIcon } from "../../Components/Icons";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import List from "./List";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../Utils/array";

function ListInBoard() {
  let { nameTitle, isShowAddList, listCount, setListCount, handleShowAddList, handleAddList, handleChangeTitleCard } =
    useListBoardContext();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  // nhấn giữ 250ms và dung sai của cảm ứng (di chuyển chênh lệch 5px )
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });

  const mySensors = useSensors(mouseSensor, touchSensor);

  // const handleDragOver = ({ over, active }) => {
  //   const overId = over?.id;

  //   if (!overId) {
  //     return;
  //   }

  //   const activeContainer = active.data.current.sortable;
  //   const overContainer = over.data.current?.sortable;

  //   if (!overContainer) {
  //     return;
  //   }

  //   const activeIndex = active.data.current.sortable.index;
  //   const overIndex = over.data.current?.sortable.index || 0;

  //   if (activeContainer !== overContainer) {
  //     // setListCount((items) => {
  //     //   let newState = [...items];
  //     //   const activeIndex = active.data.current.sortable.index;
  //     //   const overIndex = over.data.current?.sortable.index || 0;
  //     //   const activeCard = listCount.find((item) => item.id === activeContainer)?.cards[activeIndex];
  //     //   newState = moveBetweenContainers(newState, activeContainer, activeIndex, overContainer, overIndex, activeCard);
  //     //   return newState;
  //     // });
  //   }
  // };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (!active?.data?.current.cards) {
      return;
    }

    if (active.id !== over.id) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;
      const newColums = arrayMove(listCount, activeIndex, overIndex);
      setListCount(newColums);
    }
  };

  const moveBetweenContainers = (items, activeContainer, activeIndex, overContainer, overIndex, item) => {
    const activeList = items.find((item) => item.id === activeContainer);
    const overList = items.find((item) => item.id === overContainer);

    activeList.cards = removeAtIndex(activeList.cards, activeIndex);
    overList.cards = insertAtIndex(overList.cards, overIndex, item);

    return items;
  };

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
            <DndContext
              // onDragOver={handleDragOver}
              sensors={mySensors}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <SortableContext strategy={horizontalListSortingStrategy} items={listCount?.map((item) => item.id)}>
                <div style={{ display: "flex" }}>
                  {listCount.map((item, index) => {
                    return <List id={item.id} key={index} item={item} />;
                  })}
                </div>
              </SortableContext>
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
