import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { CreateItem } from "../../../Components/CreateItem";
import { AddIcon, TemplateCardIcon } from "../../../Components/Icons";
import ConvertHiDotsVertical from "../../../Components/HiDotsVertical";
import ItemList from "../../../Components/ItemList";
import TippyDetail from "../../TippyDetail";
import { useListBoardContext } from "../../../Pages/ListBoard/ListBoardContext";

import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UpdateList } from "../../../Services/API/ApiListOfBoard";
import { useGetBoardPermission } from "../../../Hooks/useBoardPermission";
import { memo, useState } from "react";
import { createCardByIdList } from "../../../Services/API/ApiCard";
import { toast } from "react-toastify";
import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";

function List({ item = {}, id }) {
  const cards = item.cards || [];
  const [activeId, setActiveId] = useState(null);
  const { setNodeRef, transform } = useDroppable({ id });

  const dndKitColumStyles = {
    transform: CSS.Translate.toString(transform),
    height: "100%",
  };

  const { boardId, activeMonitor, activeIndex, handleChange, handleShowAddCard, dataList, setDataList } =
    useListBoardContext();
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
      const newList = dataList.map((list) =>
        list.id === id
          ? {
              ...list,
              cards: [...(list.cards || []), { title: nameTitle, files: [] }],
              isShowAddCard: !list.isShowAddCard,
            }
          : list,
      );
      setDataList(newList);

      await createCardByIdList({
        title: nameTitle,
        description: "",
        coverUrl: "",
        priority: "medium",
        tagId: "",
        listId: id,
      });
      toast.success("Create card successfully");
    } catch (error) {
      toast.error("Failed to create card");
      console.error("Failed to create card by id list:", error);
    }
  };

  return (
    <div>
      <div className="px-[8px]">
        <div className="flex flex-col w-[248px] max-h-[75vh] bg-gray-100 rounded-[12px] p-1 transition-opacity duration-300  ">
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
          <DndContext onDragStart={(event) => setActiveId(event.active.id)} onDragEnd={() => setActiveId(null)}>
            <SortableContext id={id} items={cards.map((card) => card.id)} strategy={rectSortingStrategy}>
              <div ref={setNodeRef} style={dndKitColumStyles}>
                <div
                  style={{
                    maxHeight: "380px",
                    overflowY: "auto",
                    padding: "8px",
                    scrollbarWidth: "thin",
                  }}
                  className="flex-1 p-1"
                >
                  {cards?.map((card, index) => {
                    return (
                      <ItemList
                        id={card.id}
                        key={index}
                        item={item}
                        dataCard={card}
                        imageSrc
                        isDescriptionIcon
                        Attachments={[1]}
                      />
                    );
                  })}
                </div>
              </div>
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <ItemList id={activeId} item={item} dataCard={cards.find((card) => card.id === activeId)} />
              ) : null}
            </DragOverlay>
          </DndContext>
          {item.isShowAddCard && activeIndex === item.id && (
            <CreateItem
              idList={item.id}
              nameBtn={"Add card"}
              placeHolderText={"Enter new card name"}
              onAdd={handleAddCard}
              setShowItem={() => handleShowAddCard(item.id)}
            />
          )}

          {getCardPermissionByUser("create") && !item.isShowAddCard && (
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
