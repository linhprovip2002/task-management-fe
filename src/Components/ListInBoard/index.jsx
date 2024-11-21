import React, { useEffect, useState } from "react";

import { CreateItem } from "../../Components/CreateItem";
import { AddIcon } from "../../Components/Icons";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import List from "./List";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../Utils/array";
import useDebounce from "../../Hooks/useDebounce";
import { changePositionList, CreateList } from "../../Services/API/ApiListOfBoard";
import { changePositionCard } from "../../Services/API/ApiCard";
import { useGetBoardPermission } from "../../Hooks/useBoardPermission";
import { EQueryKeys } from "../../constants";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { findColById } from "../../Utils/dragDrop";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { toast } from "react-toastify";
import ItemList from "../ItemList";

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
  const { dataList, boardId, dataBoard } = useListBoardContext();
  const { getListPermissionByUser } = useGetBoardPermission(boardId);
  const [activeItemData, setActiveItemData] = useState(null);
  const [columns, setColumns] = useState(dataList);

  const handleDragStart = ({ over, active }) => {
    setActiveItemType(active.data.current.type);

    if (active.data.current.type === "CARD") {
      const activeContainer = active.data.current.sortable.containerId;
      const activeContainerIndex = findColById(columns, activeContainer);
      const activeIndex = active.data.current.sortable.index;
      const activeCard = columns[activeContainerIndex].cards[activeIndex];
      setActiveItemData({ activeCardId: active.id, dataCard: activeCard });
    }
    if (active.data.current.type === "COLUMN") {
      const activeColumnId = active.id;
      const activeColumnIndex = findColById(columns, activeColumnId);
      const activeColumn = columns[activeColumnIndex];
      setActiveItemData({ activeColumnId, dataColumn: activeColumn, activeColumnIndex });
    }
  };

  const handleDragOver = ({ over, active }) => {
    if (activeItemType === "COLUMN") return;
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const activeContainerIndex = findColById(columns, activeContainer);
      const overContainerIndex = findColById(columns, overContainer);
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      const activeCard = columns[activeContainerIndex].cards?.[activeIndex];

      setColumns((prev) => {
        const newItems = [...prev];

        const changed = moveBetweenContainers(
          prev,
          activeContainerIndex,
          activeIndex,
          overContainerIndex,
          overIndex,
          activeCard,
        );
        newItems[activeContainerIndex].cards = changed.activeCol;
        newItems[overContainerIndex].cards = changed.overCol;

        return newItems;
      });
    }
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

      const activeContainerIndex = findColById(columns, activeContainer);
      const overContainerIndex = findColById(columns, overContainer);
      if (activeItemType === "CARD") {
        setColumns((prev) => {
          const newItems = [...prev];
          const activeCard = newItems[activeContainerIndex].cards?.[activeIndex];

          if (activeContainerIndex === overContainerIndex) {
            newItems[activeContainerIndex].cards = arrayMove(
              newItems[activeContainerIndex].cards,
              activeIndex,
              overIndex,
            );
          } else {
            const changed = moveBetweenContainers(
              columns,
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
        const activeColIndex = findColById(columns, active.id);
        const overColIndex = findColById(columns, over.id);
        const activeList = columns[activeColIndex];

        setColumns((prev) => {
          return arrayMove(prev, activeColIndex, overColIndex);
        });
      }
    }
    setActiveItemType(null);
    setActiveItemData(null);
  };

  const moveBetweenContainers = (items, activeContainer, activeIndex, overContainer, overIndex, item) => {
    return {
      activeCol: removeAtIndex(items[activeContainer].cards, activeIndex),
      overCol: insertAtIndex(items[overContainer].cards, overIndex, item),
    };
  };

  useEffect(() => {
    console.log("re render");
    //TODO call api move card or column here
    if (dataBoard?.role?.roleName !== "admin") return;
    if (debounceValue !== null) {
      if (debounceValue.type === "COLUMN") {
        // call api change position list
        changePositionList({
          boardId: idBoard,
          listId: debounceValue.activeListId,
          newPosition: debounceValue.newPosition + 1,
        })
          .then((res) => {})
          .catch((err) => {
            toast.error("Change position unsuccessfully");
          });
      }
      if (debounceValue.type === "CARD") {
        // call api change position card
        changePositionCard({
          cardId: debounceValue.cardId,
          activeListId: debounceValue.activeListId,
          overListId: debounceValue.overListId,
          position: debounceValue.newPosition + 1,
        })
          .then((res) => {})
          .catch((err) => {
            toast.error("Change position unsuccesfully");
          });
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

  useEffect(() => {
    setColumns(dataList);
  }, [dataList]);

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
              <SortableContext strategy={horizontalListSortingStrategy} items={columns.map((col) => col.id)}>
                <div style={{ display: "flex" }}>
                  {columns?.map((item, index) => {
                    return <List id={item.id} key={index} item={item} />;
                  })}
                </div>
              </SortableContext>
              <DragOverlay>
                {activeItemType === "CARD" ? (
                  <ItemList id={activeItemData.activeCardId} dataCard={activeItemData.dataCard} />
                ) : null}

                {activeItemType === "COLUMN" ? (
                  <List id={activeItemData.activeColumnId} item={activeItemData.dataColumn} />
                ) : null}
              </DragOverlay>
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
