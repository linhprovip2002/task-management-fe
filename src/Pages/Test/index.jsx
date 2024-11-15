import React, { useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable from "./Droppable";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../Utils/array";
import columns from "./data";
import { findColById } from "../../Utils/dragDrop";
import { Button } from "@mui/material";

function Test() {
  const [activeItemType, setActiveItemType] = useState(null);

  const [items, setItems] = useState(columns);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ over, active }) => {
    setActiveItemType(active.data.current.type);
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
      const activeContainerIndex = findColById(items, activeContainer);
      const overContainerIndex = findColById(items, overContainer);
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      const activeCard = items[activeContainerIndex].cards?.[activeIndex];

      setItems((items) => {
        const newItems = [...items];

        const changed = moveBetweenContainers(
          items,
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

      const activeContainerIndex = findColById(items, activeContainer);
      const overContainerIndex = findColById(items, overContainer);

      if (activeItemType === "CARD") {
        setItems((items) => {
          let newItems = [...items];
          if (activeContainerIndex === overContainerIndex) {
            newItems[activeContainerIndex].cards = arrayMove(
              newItems[activeContainerIndex].cards,
              activeIndex,
              overIndex,
            );
          } else {
            const activeCard = newItems[activeContainerIndex].cards?.[activeIndex];
            const changed = moveBetweenContainers(
              items,
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
        const activeColIndex = findColById(items, active.id);
        const overColIndex = findColById(items, over.id);
        setItems((prev) => {
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

  const containerStyle = { display: "flex", gap: 12 };

  const handleCreateList = () => {
    setItems((prev) => {
      const newList = {
        id: 50,
        updatedAt: "2024-11-17T09:46:09.014Z",
        createdAt: "2024-10-28T01:51:07.243Z",
        deletedAt: null,
        title: "Doing",
        position: 1,
        description: "",
        cards: [
          {
            id: 100,
            title: "Create UI Register",
            description: "",
            position: 1,
            coverUrl: "",
            priority: "medium",
            startDate: null,
            endDate: null,
            tagCards: [],
            members: [],
            comments: [
              {
                id: 74,
                createdAt: "2024-11-08T14:55:40.109Z",
                content:
                  '<p>&nbsp;</p>\n<p><img src="http://res.cloudinary.com/dksiby5mw/image/upload/v1731077683/ktpm-tasks-management/IMG_4121.JPG.1731077682853-565033697.jpg" alt="" width="1920" height="2560"></p>\n<p>Hello anh em&nbsp;</p>',
              },
            ],
            files: [
              {
                id: 198,
                createdAt: "2024-11-08T14:54:45.472Z",
                name: "IMG_4121",
                url: "http://res.cloudinary.com/dksiby5mw/image/upload/v1731077683/ktpm-tasks-management/IMG_4121.JPG.1731077682853-565033697.jpg",
              },
            ],
          },
          {
            id: 101,
            title: "Test create card",
            description: "",
            position: 3,
            coverUrl: "",
            priority: "medium",
            startDate: null,
            endDate: null,
            tagCards: [],
            members: [],
            comments: [],
            files: [],
          },
        ],
      };
      return [...prev, newList];
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <SortableContext strategy={horizontalListSortingStrategy} items={items.map((col) => col.id)}>
            <div style={containerStyle}>
              {items.map((col, index) => (
                <Droppable id={col.id} items={col.cards} key={index} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button
          onClick={handleCreateList}
          sx={{
            width: "fit-content",
          }}
        >
          Create List
        </Button>
      </div>
    </>
  );
}

export default Test;
