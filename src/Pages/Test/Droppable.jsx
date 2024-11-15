import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
const Droppable = ({ id, items }) => {
  const {
    attributes,
    listeners,
    setNodeRef: colNodeRef,
    transform,
  } = useSortable({
    id: id,
    data: {
      type: "COLUMN",
    },
  });
  const dndKitColumStyles = {
    transform: CSS.Translate.toString(transform),
    height: "100%",
  };

  const { setNodeRef } = useDroppable({ id });

  const droppableStyle = {
    padding: "20px 10px",
    border: "1px solid black",
    borderRadius: "5px",
    minWidth: 110,
  };

  return (
    <div ref={colNodeRef} style={dndKitColumStyles} {...attributes} {...listeners}>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div ref={setNodeRef} style={droppableStyle}>
          {items.map((item, index) => (
            <SortableItem key={index} id={item.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Droppable;
