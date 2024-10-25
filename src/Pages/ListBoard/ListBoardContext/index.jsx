import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";
import { CreateList } from "../../../Services/API/ApiListOfBoard";
import { createCardByIdList, getAllCardByIdList } from "../../../Services/API/ApiCard";
import { getAllMembersByIdBoard, getBoardId } from "../../../Services/API/ApiBoard/apiBoard";

const ListBoardContext = createContext();

export const useListBoardContext = () => {
  return useContext(ListBoardContext);
};

function ListBoardProvider({ children, boardId }) {
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
  const [dataBoard, setDataBoard] = useState([]);
  const [membersBoard, setMembersBoard] = useState([]);
  const [membersInCard, setMembersInCard] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  let prevListCountRef = useRef();
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const res = await getBoardId(boardId);
        setDataBoard(res);
        const lists = res.lists;
        const listWithCardsPromises = lists.map(async (list) => {
          let cards = await getAllCardByIdList(list.id);
          cards = cards.data;
          return { ...list, cards };
        });
        const updatedLists = await Promise.all(listWithCardsPromises);
        if (JSON.stringify(updatedLists) !== JSON.stringify(prevListCountRef.current)) {
          setListCount(updatedLists);
        }
        prevListCountRef.current = updatedLists;
      } catch (err) {
        console.error("Error fetching board data: ", err);
      }
    };

    fetchBoardData();
  }, [boardId, listCount]);

  useEffect(() => {
    const getAllUserInBoard = async () => {
      try {
        const res = await getAllMembersByIdBoard(boardId);
        const dataUser = res.data[0].user;
        setMembersBoard([dataUser]);
      } catch (err) {
        console.error("Error fetching board data: ", err);
      }
    };

    getAllUserInBoard();
  }, [boardId]);

  const handleShowBoardCard = useCallback(
    (data, dataCard) => {
      setIsShowBoardCard(!isShowBoardCard);
      if (isShowBoardEdit) {
        setIsShowBoardEdit(!isShowBoardEdit);
      }
      setDataList(data);
      setDataCard(dataCard);
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

  const handleCopyList = (dataList) => {
    setListCount([...listCount, dataList]);
  };

  const handleActiveMonitor = (idList) => {
    if (activeMonitor.includes(idList)) {
      setActiveMonitor(activeMonitor.filter((i) => i !== idList));
    } else {
      setActiveMonitor([...activeMonitor, idList]);
    }
  };

  const handleActiveStar = useCallback(() => {
    return setActiveStar(!activeStar);
  }, [activeStar]);

  const handleChangeSidebar = useCallback((isClose) => {
    return setIsCloseNavBar(!isClose);
  }, []);

  return (
    <ListBoardContext.Provider
      value={{
        nameTitle,
        setNameTitle,
        isClosedNavBar,
        handleClosedNavBar,
        isShowBoardCard,
        handleShowBoardCard,
        isShowBoardEdit,
        handleShowBoardEdit,
        isShowAddList,
        handleShowAddList,
        activeMonitor,
        handleActiveMonitor,
        dataCard,
        setDataCard,
        dataList,
        setDataList,
        listCount,
        setListCount,
        handleAddCard,
        handleAddList,
        position,
        setPosition,
        activeIndex,
        activeStar,
        handleActiveStar,
        dataBoard,
        membersBoard,
        membersInCard,
        setMembersInCard,
        setMembersBoard,
        handleChangeSidebar,
        handleChange,
        handleChangeTitleCard,
        handleCopyList,
        handleShowAddCard,
      }}
    >
      {children}
    </ListBoardContext.Provider>
  );
}

export default ListBoardProvider;