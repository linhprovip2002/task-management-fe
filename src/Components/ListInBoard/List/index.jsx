import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { CreateItem } from "../../../Components/CreateItem";
import { AddIcon, TemplateCardIcon } from "../../../Components/Icons";
import ConvertHiDotsVertical from "../../../Components/HiDotsVertical";
import ItemList from "../../../Components/ItemList";
import TippyDetail from "../../TippyDetail";
import { useListBoardContext } from "../../../Pages/ListBoard/ListBoardContext";

import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UpdateList } from "../../../Services/API/ApiListOfBoard";
import { useGetBoardPermission } from "../../../Hooks/useBoardPermission";
import { memo } from "react";
import { createCardByIdList } from "../../../Services/API/ApiCard";
import { toast } from "react-toastify";
import { useDroppable } from "@dnd-kit/core";

function List({ item = {}, id }) {
  const {
    attributes,
    listeners,
    setNodeRef: colNodeRef,
    transform,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "COLUMN",
    },
  });
  const cards = item.cards || [];
  const { setNodeRef } = useDroppable({ id });

  const dndKitColumStyles = {
    transform: CSS.Translate.toString(transform),
    height: "100%",
    opacity: isDragging ? "0.7" : 1,
  };

  const {
    boardId,
    activeMonitor,
    setActiveIndex,
    activeIndex,
    handleChange,
    handleShowAddCard,
    dataList,
    setDataList,
  } = useListBoardContext();
  const { getCardPermissionByUser } = useGetBoardPermission(boardId);

  const handleClickOutside = async (event) => {
    if (event.target.value) {
      const dataList = {
        title: event.target.value.trim(),
        description: item?.description,
        boardId: boardId,
      };
      try {
        await UpdateList(boardId, id, dataList);
      } catch (error) {
        console.error("Failed to create list:", error);
      }
    }
  };

  const handleAddCard = async (nameTitle) => {
    try {
      const newCard = await createCardByIdList({
        title: nameTitle,
        description: "",
        coverUrl: "",
        priority: "medium",
        tagId: "",
        listId: id,
      });
      const newList = dataList.map((list) =>
        list.id === id
          ? {
              ...list,
              cards: [...(list.cards || []), newCard],
            }
          : list,
      );
      setActiveIndex((prev) => prev && null);
      setDataList(newList);
      toast.success("Create card successfully");
    } catch (error) {
      toast.error("Failed to create card");
      console.error("Failed to create card by id list:", error);
    }
  };

  return (
    <div ref={colNodeRef} style={dndKitColumStyles} {...attributes}>
      <div {...listeners} className="px-[8px]">
        <div className="flex flex-col w-[248px] max-h-[80vh] bg-gray-100 rounded-[12px] p-1 transition-opacity duration-300  ">
          <div className="flex p-1 items-center bg-gray-100">
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleChange(e, item.id)}
              onBlur={(e) => handleClickOutside(e)}
              className="flex-1 min-w-0 mr-2 bg-gray-100 rounded-[8px] text-[14px] font-[600] px-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {activeMonitor.includes(item.id) && <RemoveRedEyeOutlinedIcon className="p-1" />}
            <ConvertHiDotsVertical
              tippyName="Operation"
              data={item}
              className={
                "cursor-pointer p-2 group-hover:opacity-100 hover:bg-gray-300 rounded-[8px] transition-opacity duration-300"
              }
            />
          </div>
          {/* List board */}
          <SortableContext id={id} items={cards.map((card) => card.id)} strategy={rectSortingStrategy}>
            <div
              ref={setNodeRef}
              style={{
                maxHeight: "100%",
                overflowY: "auto",
                padding: "8px",
                scrollbarWidth: "thin",
              }}
              className="flex-1 p-1"
            >
              {cards?.map((card, index) => {
                return <ItemList id={card.id} key={index} item={item} dataCard={card} />;
              })}
            </div>
          </SortableContext>

          {activeIndex === item.id && (
            <CreateItem
              idList={item.id}
              nameBtn={"Add card"}
              placeHolderText={"Enter new card name"}
              onAdd={handleAddCard}
              setShowItem={() => handleShowAddCard(item.id)}
            />
          )}

          {getCardPermissionByUser("create") && activeIndex !== item.id && (
            <div className="flex p-1 items-center pt-[8px]">
              <div
                onClick={() => handleShowAddCard(item.id)}
                className="flex flex-1 items-center rounded-[8px] hover:bg-gray-300 cursor-pointer"
              >
                <div className="p-2 transition-opacity duration-300 text-[#44546f]">
                  <AddIcon width={16} height={16} />
                </div>
                <div className="text-[14px] font-medium text-[#44546f]">Add card</div>
              </div>
              <TippyDetail title={"Create from template..."}>
                <div className="text-[#44546f]">
                  <TemplateCardIcon
                    width={32}
                    height={32}
                    className={
                      "cursor-pointer p-2 group-hover:opacity-100 hover:bg-gray-300 rounded-[8px] transition-opacity duration-300"
                    }
                  />
                </div>
              </TippyDetail>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(List);
