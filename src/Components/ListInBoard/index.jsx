import React, { useCallback, useEffect, useState } from "react";

import { CreateItem } from "../../Components/CreateItem";
import { AddIcon } from "../../Components/Icons";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import List from "./List";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../Utils/array";
import useDebounce from "../../Hooks/useDebounce";
import { changePositionList, CreateList } from "../../Services/API/ApiListOfBoard";
import { changePositionCard } from "../../Services/API/ApiCard";
import { useGetBoardPermission } from "../../Hooks/useBoardPermission";
import { EQueryKeys } from "../../constants";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function ListInBoard() {
  const queryClient = useQueryClient();
  const { idBoard } = useParams();
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
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [changeData, setChangeData] = useState(null);
  const [showAddListItem, setShowAddListItem] = useState(false);
  const debounceValue = useDebounce(changeData, 1000);

  const { dataList, setListCount, boardId, dataBoard } = useListBoardContext();
  const { getListPermissionByUser } = useGetBoardPermission(boardId);

  const handleDragStart = useCallback((event) => {
    setActiveDragItemType(event.active?.data?.current?.type);
    const activeContainer = event.active?.data?.current?.sortable?.containerId;
    const activeContainerIndex = Number(activeContainer.split("-")[1]) - 1;
    setChangeData({
      activeContainerIndex,
    });
  }, []);

  const handleDragOver = useCallback(
    (event) => {
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
        const newColums = [...dataList];
        const activeCard = newColums[activeContainerIndex]?.cards?.[activeIndex];
        if (!activeCard) return;
        moveBetweenContainers(newColums, activeContainerIndex, activeIndex, overContainerIndex, overIndex, activeCard);

        setListCount(newColums);
      }
    },
    [activeDragItemType, dataList, setListCount],
  );

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (!over) return;

      if (activeDragItemType === "card") {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;
        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId || over.id;
        if (!overContainer || !activeContainer) return;

        const activeContainerIndex = Number(activeContainer.split("-")[1]) - 1;
        const overContainerIndex = Number(overContainer.split("-")[1]) - 1;
        if (overContainerIndex < 0) return;

        if (activeContainerIndex === overContainerIndex) {
          const newColums = [...dataList];
          const activeColumn = newColums[activeContainerIndex];
          if (activeColumn.cards) activeColumn.cards = arrayMove(activeColumn.cards, activeIndex, overIndex);
          setListCount(newColums);
          setChangeData((prev) => {
            return {
              type: "card",
              activeIndex,
              overIndex,
              overContainerIndex,
              ...prev,
            };
          });
        }

        return;
      }

      if (active.id !== over.id) {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;
        const newColums = arrayMove(dataList, activeIndex, overIndex);
        setListCount(newColums);
        setChangeData({
          type: "column",
          listId: dataList[activeIndex].id,
          activeIndex,
          overIndex,
        });
      }

      setActiveDragItemType(null);
    },
    [activeDragItemType, dataList, setListCount],
  );

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

  useEffect(() => {
    //TODO call api move card or column here
    if (dataBoard?.role?.roleName !== "admin") return;
    if (debounceValue !== null) {
      const activeListId = debounceValue.listId;
      const overIndex = debounceValue.overIndex + 1;

      if (debounceValue.type === "column") {
        changePositionList({
          boardId,
          listId: activeListId,
          newPosition: overIndex,
        })
          .then((res) => {})
          .catch((err) => {
            console.error(err);
          });
      }
      if (debounceValue.type === "card") {
        const activeListId = dataList[debounceValue.activeContainerIndex]?.id;
        const overListId = dataList[debounceValue.overContainerIndex]?.id;
        const overIndex = debounceValue.overIndex + 1;
        const card = dataList[debounceValue.overContainerIndex].cards?.[debounceValue.overIndex];
        if (activeListId && overListId && card) {
          changePositionCard({
            cardId: card.id,
            activeListId,
            overListId,
            position: overIndex,
          })
            .then((res) => {})
            .catch((err) => {
              console.error(err);
            });
        }
      }
      setChangeData(null);
    }
    // eslint-disable-next-line
  }, [debounceValue]);

  const handleAddList = async (nameTitle) => {
    const newListItem = {
      title: nameTitle.trim(),
      description: "",
      boardId: idBoard,
    };
    try {
      await CreateList(idBoard, newListItem);
      setShowAddListItem((prev) => !prev);
      queryClient.invalidateQueries([EQueryKeys.GET_BOARD_BY_ID]);
    } catch (error) {
      console.error("Failed to create list:", error);
    }
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
        <div className="my-4 px-[4px] flex h-full">
          <div className="flex flex-nowrap">
            <DndContext
              sensors={mySensors}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <SortableContext strategy={horizontalListSortingStrategy} items={dataList}>
                <div style={{ display: "flex" }}>
                  {dataList?.map((item, index) => {
                    return <List id={item.id} key={index} item={item} />;
                  })}
                </div>
              </SortableContext>
            </DndContext>

            <div className="px-[8px]">
              {getListPermissionByUser("create") && (
                <div
                  onClick={() => (!showAddListItem ? setShowAddListItem((prev) => !prev) : null)}
                  className={`flex items-center w-[248px] rounded-[12px] bg-gray-100 p-[6px] ${!showAddListItem ? "hover:bg-gray-300" : ""} cursor-pointer`}
                >
                  {!showAddListItem ? (
                    <>
                      <div className="rounded-[4px] p-2 hover:bg-gray-300 transition-opacity duration-300">
                        <AddIcon width={16} height={16} />
                      </div>
                      <div className="text-[14px] font-medium text-[#44546f]">Add another list</div>
                    </>
                  ) : (
                    <div className="w-full">
                      <CreateItem
                        isList
                        nameBtn={"Add list"}
                        onAdd={handleAddList}
                        placeHolderText={"Enter list name..."}
                        setShowItem={setShowAddListItem}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ListInBoard);
