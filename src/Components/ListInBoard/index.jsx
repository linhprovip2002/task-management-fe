import React, { useEffect, useState } from "react";

import { CreateItem } from "../../Components/CreateItem";
import { AddIcon } from "../../Components/Icons";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import List from "./List";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../Utils/array";
import useDebounce from "../../Hooks/useDebounce";

function ListInBoard() {
  const [activeDragItemType, setActiveDragItemType] = useState(null);

  let { nameTitle, isShowAddList, listCount, setListCount, handleShowAddList, handleAddList, handleChangeTitleCard } =
    useListBoardContext();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  const mySensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event) => {
    setActiveDragItemType(event.active?.data?.current?.type);
  };

  const handleDragOver = (event) => {
    if (activeDragItemType === "column") return;
    const { active, over } = event;
    if (!over) return;

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    if (!overContainer || !activeContainer) return;

    if (activeContainer !== overContainer) {
      const activeContainerIndex = Number(activeContainer.split("-")[1]) - 1;
      const overContainerIndex = Number(overContainer.split("-")[1]) - 1;

      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;
      const newColums = [...listCount];
      const activeCard = newColums[activeContainerIndex]?.cards[activeIndex];

      if (overContainerIndex === -1) {
        // trường hợp kéo qua cột rỗng thì không có overContainerIndex và overIndex sẽ thay cho index của container
        moveBetweenContainers(newColums, activeContainerIndex, activeIndex, overIndex, 0, activeCard);
      } else {
        moveBetweenContainers(newColums, activeContainerIndex, activeIndex, overContainerIndex, overIndex, activeCard);
      }
      setListCount(newColums);
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (activeDragItemType === "card") {
      //TODO case drag card
      // setState for card
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      if (!overContainer || !activeContainer) return;

      const activeContainerIndex = Number(activeContainer.split("-")[1]) - 1;
      const overContainerIndex = Number(overContainer.split("-")[1]) - 1;
      if (overContainerIndex < 0) return;

      if (activeContainerIndex === overContainerIndex) {
        const newColums = [...listCount];
        const activeColumn = newColums[activeContainerIndex];
        if (activeColumn.cards) activeColumn.cards = arrayMove(activeColumn.cards, activeIndex, overIndex);
        setListCount(newColums);
      }
      return;
    }

    if (active.id !== over.id) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;
      const newColums = arrayMove(listCount, activeIndex, overIndex);
      setListCount(newColums);
    }

    setActiveDragItemType(null);
  };

  const moveBetweenContainers = (
    items,
    activeContainerIndex,
    activeItemIndex,
    overContainerIndex,
    overItemIndex,
    item,
  ) => {
    const activeList = items[activeContainerIndex];
    const overList = items[overContainerIndex];
    if (!activeList || !overList) return items;

    activeList.cards = removeAtIndex(activeList.cards, activeItemIndex);
    overList.cards = insertAtIndex(overList.cards, overItemIndex, item);
    return items;
  };

  const debounceValue = useDebounce(listCount, 1000);

  useEffect(() => {
    //TODO call api move card or column here
  }, [debounceValue]);

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
              sensors={mySensors}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
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
