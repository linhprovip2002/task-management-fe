import React, { useEffect, useState } from "react";

import { CreateItem } from "../../Components/CreateItem";
import { AddIcon } from "../../Components/Icons";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import List from "./List";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../Utils/array";
import useDebounce from "../../Hooks/useDebounce";
import { changePositionList, CreateList } from "../../Services/API/ApiListOfBoard";
import { changePositionCard } from "../../Services/API/ApiCard";
import { useGetBoardPermission } from "../../Hooks/useBoardPermission";
import { EQueryKeys } from "../../constants";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { findColById } from "../../Utils/dragDrop";

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
  const [changeData, setChangeData] = useState(null);
  const [showAddListItem, setShowAddListItem] = useState(false);
  const debounceValue = useDebounce(changeData, 1000);
  const [activeItemType, setActiveItemType] = useState(null);

  const { dataList, setDataList, boardId, dataBoard } = useListBoardContext();
  const { getListPermissionByUser } = useGetBoardPermission(boardId);

  const handleDragStart = ({ over, active }) => {
    setActiveItemType(active.data.current.type);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      const activeContainerIndex = findColById(dataList, activeContainer);
      const overContainerIndex = findColById(dataList, overContainer);

      if (activeItemType === "CARD") {
        setDataList((prev) => {
          const newItems = [...prev];
          if (activeContainerIndex === overContainerIndex) {
            newItems[activeContainerIndex].cards = arrayMove(
              newItems[activeContainerIndex].cards,
              activeIndex,
              overIndex,
            );
          } else {
            const activeCard = newItems[activeContainerIndex].cards?.[activeIndex];
            const changed = moveBetweenContainers(
              dataList,
              activeContainerIndex,
              activeIndex,
              overContainerIndex,
              overIndex,
              activeCard,
            );
            newItems[activeContainerIndex].cards = changed.activeCol;
            newItems[overContainerIndex].cards = changed.overCol;
          }
          return newItems;
        });
      }
      if (activeItemType === "COLUMN") {
        const activeColIndex = findColById(dataList, active.id);
        const overColIndex = findColById(dataList, over.id);
        setDataList((prev) => {
          return arrayMove(prev, activeColIndex, overColIndex);
        });
      }
    }

    setActiveItemType(null);
  };

  const moveBetweenContainers = (items, activeContainer, activeIndex, overContainer, overIndex, item) => {
    return {
      activeCol: removeAtIndex(items[activeContainer].cards, activeIndex),
      overCol: insertAtIndex(items[overContainer].cards, overIndex, item),
    };
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
      if (debounceValue.type === "CARD") {
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
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <div style={{ display: "flex" }}>
                {dataList?.map((item, index) => {
                  return <List id={item.id} key={index} item={item} />;
                })}
              </div>
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
