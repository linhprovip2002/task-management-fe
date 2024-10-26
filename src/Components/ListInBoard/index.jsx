import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import React from "react";

import ConvertHiDotsVertical from "../../Components/HiDotsVertical";
import ItemList from "../../Components/ItemList";
import { CreateItem } from "../../Components/CreateItem";
import { AddIcon, TemplateCardIcon } from "../../Components/Icons";
import TippyDetail from "../TippyDetail";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";

function ListInBoard() {
  let {
    nameTitle,
    activeMonitor,
    activeIndex,
    isShowAddList,
    listCount,
    handleChange,
    handleShowAddCard,
    handleShowAddList,
    handleAddCard,
    handleAddList,
    handleChangeTitleCard,
  } = useListBoardContext();

  return (
    <div className="relative h-[80vh]">
      <div
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#fff6 #00000026",
        }}
        className="absolute h-full top-0 left-0 right-0 mb-2 pb-2 overflow-x-auto overflow-y-hidden whitespace-nowrap"
      >
        <div className="my-4 px-[4px] flex">
          <div className="flex flex-nowrap">
            {listCount.map((item, index) => {
              return (
                <div key={index} className="px-[8px]">
                  <div className="flex flex-col w-[248px] max-h-[75vh] bg-gray-100 rounded-[12px] p-1 transition-opacity duration-300  ">
                    <div className="flex p-1 items-center bg-gray-100">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleChange(e, item.id)}
                        className="flex-1 min-w-0 mr-2 bg-gray-100 rounded-[8px] text-[16px] font-[500] px-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {activeMonitor.includes(item.id) && <RemoveRedEyeOutlinedIcon className="p-1" />}
                      <ConvertHiDotsVertical
                        tippyName="Operation"
                        data={item}
                        type={"operation"}
                        className={
                          "cursor-pointer p-2 group-hover:opacity-100 hover:bg-gray-300 rounded-[8px] transition-opacity duration-300"
                        }
                      />
                    </div>
                    {/* List board */}
                    <div
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#fff6 #00000026",
                      }}
                      className="flex-1 p-1 overflow-y-auto overflow-x-hidden"
                    >
                      {item.cards?.map((card, index) => {
                        return (
                          <ItemList
                            key={index}
                            dataList={item}
                            dataCard={card}
                            imageSrc
                            isDescriptionIcon
                            Attachments={[1]}
                          />
                        );
                      })}
                    </div>

                    {item.isShowAddCard && activeIndex === item.id && (
                      <CreateItem
                        idList={item.id}
                        nameBtn={"Add card"}
                        descriptionCard={nameTitle}
                        placeHolderText={"Enter title or paste link"}
                        onAdd={handleAddCard}
                        onShow={() => handleShowAddCard(item.id)}
                        onChangeTitle={handleChangeTitleCard}
                      />
                    )}

                    {!item.isShowAddCard && (
                      <div className="flex p-1 items-center pt-[8px]">
                        <div
                          onClick={() => handleShowAddCard(item.id)}
                          className="flex flex-1 items-center rounded-[8px] hover:bg-gray-300 cursor-pointer"
                        >
                          <div className=" rounded-[4px] p-2 hover:bg-gray-300 transition-opacity duration-300">
                            <AddIcon width={16} height={16} />
                          </div>
                          <div className="text-[16px] font-medium">Add card</div>
                        </div>
                        <TippyDetail title={"Create from template..."}>
                          <div>
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
              );
            })}
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
