import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: props.id, data: { type: "CARD" } });

  const itemStyle = {
    transform: CSS.Translate.toString(transform),
    width: 110,
    height: 30,
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    border: "1px solid gray",
    borderRadius: 5,
    marginBottom: 5,
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
  };

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      Item {props.id}
    </div>
  );
};

export default SortableItem;
