import { useCallback, useEffect, useState } from "react";

import ConvertHiDotsVertical from "../../Components/HiDotsVertical";
import { ArrowDown } from "../../Components/Icons";
import { BoardCard } from "../../Components/BoardCard";
import { EditCard } from "../../Components/EditCard";
import Sidebar from "../../Components/Sidebar";
import BoardInSidebar from "../../Components/BoardInSidebar";
import HeaderBoard from "../../Components/HeaderBoard";
import ListInBoard from "../../Components/ListInBoard";
import { CreateList } from "../../Services/API/ApiListOfBoard";
import { createCardByIdList } from "../../Services/API/ApiCard";

function ListBoard() {
  const [nameTitle, setNameTitle] = useState("");
  const [isClosedNavBar, setIsCloseNavBar] = useState(false);
  const [isShowBoardCard, setIsShowBoardCard] = useState(false);
  const [isShowBoardEdit, setIsShowBoardEdit] = useState(false);
  const [isShowAddList, setIsShowAddList] = useState(false);
  const [activeMonitor, setActiveMonitor] = useState([]);
  const [dataCard, setDataCard] = useState();
  const [dataList, setDataList] = useState();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeStar, setActiveStar] = useState(false);
  const [listCount, setListCount] = useState([]);
  const [dataBoard] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchBoardData = async () => {
      // try {
      //   const res = await getBoardId(128);
      //   setDataBoard(res);
      //   const lists = res.lists;
      //   const listWithCardsPromises = lists.map(async (list) => {
      //     const cards = await getAllCardByIdList(list.id);
      //     return { ...list, cards };
      //   });
      //   const updatedLists = await Promise.all(listWithCardsPromises);
      //   if (JSON.stringify(updatedLists) !== JSON.stringify(prevListCountRef.current)) {
      //     setListCount(updatedLists);
      //   }
      //   prevListCountRef.current = updatedLists;
      // } catch (err) {
      //   console.error("Error fetching board data: ", err);
      // }
    };

    fetchBoardData();
  }, [listCount]);

  const handleShowBoardCard = useCallback(
    (data) => {
      setIsShowBoardCard(!isShowBoardCard);
      if (isShowBoardEdit) {
        setIsShowBoardEdit(!isShowBoardEdit);
      }
      setDataList(data);
    },
    [isShowBoardCard, isShowBoardEdit],
  );

  const handleShowBoardEdit = useCallback(
    (e, data) => {
      setIsShowBoardEdit(!isShowBoardEdit);
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
      setDataCard(data);
    },
    [isShowBoardEdit],
  );

  const handleShowAddCard = (idList) => {
    setActiveIndex(idList);
    const newList = [...listCount];
    const index = newList.findIndex((list) => list.id === idList);
    if (index !== -1) {
      newList[index].isShowAddCard = !newList[index].isShowAddCard;
      setListCount(newList);
    }
  };

  const handleShowAddList = useCallback(() => {
    setIsShowAddList(!isShowAddList);
  }, [isShowAddList]);

  const handleChange = (e, idList) => {
    const newList = [...listCount];
    const index = newList.findIndex((list) => list.id === idList);
    if (index !== -1) {
      newList[index].title = e.target.value;
      setListCount(newList);
    }
  };

  const handleChangeTitleCard = (e) => {
    setNameTitle(e.target.value);
  };

  const handleClosedNavBar = () => {
    setIsCloseNavBar(!isClosedNavBar);
  };

  const handleAddCard = useCallback(
    async (newData, idList) => {
      const newList = [...listCount];
      const index = newList.findIndex((list) => list.id === idList);
      if (!Array.isArray(newList[index].cards)) {
        newList[index].cards = [];
      }
      if (newData.title) {
        newList[index].cards = [...newList[index].cards, newData];
      }
      newList[index].isShowAddCard = !newList[index].isShowAddCard;
      setListCount(newList);
      setNameTitle("");

      const dataSend = {
        ...newData,
        description: "",
        coverUrl: "",
        priority: "medium",
        tagId: "",
        listId: idList,
      };
      try {
        await createCardByIdList(dataSend);
      } catch (error) {
        console.error("Failed to create card by id list:", error);
      }
    },
    [listCount],
  );

  const handleAddList = async (newData) => {
    if (newData.title) {
      const newListItem = {
        title: newData.title.trim(),
        description: "",
        boardId: dataBoard.id,
      };

      try {
        await CreateList(newListItem);
        setIsShowAddList(!isShowAddList);
        setNameTitle("");
        setListCount((prev) => [...prev, newListItem]);
      } catch (error) {
        console.error("Failed to create list:", error);
      }
    }
  };

  const HandleCopyList = (dataList) => {
    setListCount([...listCount, dataList]);
  };

  const handleActiveMonitor = (idList) => {
    if (activeMonitor.includes(idList)) {
      setActiveMonitor(activeMonitor.filter((i) => i !== idList));
    } else {
      setActiveMonitor([...activeMonitor, idList]);
    }
  };

  const handleActiveStar = useCallback((isStar) => {
    return setActiveStar(!isStar);
  }, []);

  const handleChangeSidebar = useCallback((isClose) => {
    return setIsCloseNavBar(!isClose);
  }, []);

  return (
    <>
      <div
        style={{
          height: "calc(100vh - 56.8px)",
        }}
        className="w-[100wh] flex"
      >
        <Sidebar isClosedNavBar={isClosedNavBar} onChange={handleChangeSidebar}>
          <>
            <div className={`pl-4 py-4 flex items-center`}>
              <div className="rounded-[4px] px-3 font-bold text-white text-[20px] bg-gradient-to-b from-green-400 to-blue-500">
                B
              </div>
              <div className="flex-1 ml-2 text-[18px] font-medium">BKDN</div>
              <div onClick={handleClosedNavBar} className="mr-4 p-2 rounded-[4px] hover:bg-gray-300 cursor-pointer">
                <ArrowDown width={16} height={16} className={"rotate-90 text-gray-100"} />
              </div>
            </div>
            <div className="group flex items-center">
              <div className="flex-1 text-[16px] font-medium py-2 pl-4 ">Your tables</div>
              <ConvertHiDotsVertical
                type={"navbarTable"}
                className={
                  "cursor-pointer p-2 mr-2 opacity-0 group-hover:opacity-100 hover:bg-gray-300 rounded-[4px] transition-opacity duration-300"
                }
              />
            </div>
            <BoardInSidebar dataBoard={dataBoard} onChange={handleActiveStar} isStar={activeStar} />
          </>
        </Sidebar>
        {/* list board */}
        <div
          className="flex-grow flex flex-col overflow-x-hidden"
          style={{
            backgroundImage: `url(https://trello.com/assets/707f35bc691220846678.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <HeaderBoard dataBoard={dataBoard} onChangeStar={handleActiveStar} isStar={activeStar} />

          {/* list */}
          <ListInBoard
            dataBoard={dataBoard}
            nameTitle={nameTitle}
            activeMonitor={activeMonitor}
            activeIdList={activeIndex}
            isShowAddList={isShowAddList}
            listCount={listCount}
            onShowBoardCard={handleShowBoardCard}
            onShowBoardEdit={handleShowBoardEdit}
            onChange={handleChange}
            onShowAddCard={handleShowAddCard}
            onShowAddList={handleShowAddList}
            onActiveMonitor={handleActiveMonitor}
            onAddCard={handleAddCard}
            onAddList={handleAddList}
            onChangeTitleCard={handleChangeTitleCard}
            onCopyList={HandleCopyList}
          />
        </div>
      </div>
      {isShowBoardCard && <BoardCard data={dataList} onShowBoardCard={handleShowBoardCard} />}
      {isShowBoardEdit && (
        <EditCard
          position={position}
          data={dataCard}
          onShowBoardCard={handleShowBoardCard}
          onShowBoardEdit={handleShowBoardEdit}
        />
      )}
    </>
  );
}

export default ListBoard;
