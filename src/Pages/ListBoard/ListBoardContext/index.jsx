import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo
} from "react";
import { useParams } from "react-router-dom";
import { updateBoard } from "../../../Services/API/ApiBoard/apiBoard";
import {
  useGetAllCardByList,
  useGetBoardById,
  useGetMembersByBoard,
  useGetWorkspaceById
} from "../../../Hooks";
import { useStorage } from "../../../Contexts";

const ListBoardContext = createContext();

export const useListBoardContext = () => {
  return useContext(ListBoardContext);
};

function ListBoardProvider({ children }) {
  const { idBoard: boardId, id: idWorkSpace } = useParams();

  const [nameTitle, setNameTitle] = useState("");
  const [isClosedNavBar, setIsCloseNavBar] = useState(false);
  const [isShowBoardCard, setIsShowBoardCard] = useState(false);
  const [toggleCardEditModal, setToggleCardEditModal] = useState(false);
  const [activeMonitor, setActiveMonitor] = useState([]);

  const [dataCard, setDataCard] = useState(); // Details

  const [dataList, setDataList] = useState([]);
  const [itemList, setItemList] = useState({});

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeStar, setActiveStar] = useState(false);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const [upFileComment, setUpFileComment] = useState([]);

  const { userData } = useStorage();
  const { workspaceDetails: dataWorkspace } = useGetWorkspaceById(idWorkSpace);
  const { data: dataBoard } = useGetBoardById(boardId);
  const { data: dataListAPI } = useGetAllCardByList(dataBoard);
  const { data: membersBoard } = useGetMembersByBoard(boardId);

  const isOwner = useMemo(
    () => dataBoard?.ownerId === userData?.id,
    [dataBoard, userData]
  );

  useEffect(() => {
    setDataList(dataListAPI);
    //eslint-disable-next-line
  }, [dataListAPI]);

  const handleShowBoardCard = useCallback(
    async (dataCard) => {
      setIsShowBoardCard(!isShowBoardCard);
      localStorage.setItem("cardId", dataCard.id);
      toggleCardEditModal && setToggleCardEditModal((prev) => !prev);
    },
    [isShowBoardCard, toggleCardEditModal]
  );

  const handleShowBoardEdit = useCallback(
    async (e, item, dataCard) => {
      localStorage.setItem("cardId", dataCard?.id);
      const rect = e.currentTarget.getBoundingClientRect();
      setToggleCardEditModal(!toggleCardEditModal);
      setPosition({ top: rect.bottom + 8, left: rect.left });
      setItemList(item);
      setDataCard(dataCard);
      // setPostUploadedFiles([...dataCard?.files]);
    },
    //eslint-disable-next-line
    [toggleCardEditModal]
  );

  const handleShowAddCard = (idList) => {
    setActiveIndex((prev) => (prev === idList ? null : idList));
    const newList = dataList.map((list) => ({
      ...list,
      isShowAddCard: list.id === idList ? !list.isShowAddCard : false
    }));
    setDataList(newList);
  };

  const handleChange = async (e, idList) => {
    setDataList((prevDataList) =>
      prevDataList.map((list) =>
        list.id === idList ? { ...list, title: e.target.value } : list
      )
    );
  };

  const handleChangeTitleCard = (e) => {
    setNameTitle(e.target.value);
  };

  const toggleNavbar = () => {
    setIsCloseNavBar((prev) => !prev);
  };

  const toggleSidebar = useCallback((isClose) => {
    return setIsCloseNavBar(!isClose);
  }, []);

  const handleActiveMonitor = (idList) => {
    if (activeMonitor.includes(idList)) {
      setActiveMonitor(activeMonitor.filter((i) => i !== idList));
    } else {
      setActiveMonitor([...activeMonitor, idList]);
    }
  };

  // ============handle get Active star==============
  useEffect(() => {
    if (dataBoard && dataBoard.id) setActiveStar(dataBoard.isFavorite);
  }, [dataBoard]);

  const handleActiveStar = useCallback(() => {
    setActiveStar(!activeStar);
    updateBoard(boardId, { ...dataBoard, isFavorite: !activeStar });
  }, [activeStar, boardId, dataBoard]);

  return (
    <ListBoardContext.Provider
      value={{
        nameTitle,
        setNameTitle,
        isClosedNavBar,
        toggleNavbar,
        isShowBoardCard,
        handleShowBoardCard,
        toggleCardEditModal,
        handleShowBoardEdit,
        activeMonitor,
        handleActiveMonitor,
        dataCard,
        dataBoard,
        dataWorkspace,
        dataList,
        itemList,
        setDataList,
        setDataCard,
        setItemList,
        position,
        setPosition,
        activeIndex,
        activeStar,
        handleActiveStar,
        membersBoard,
        toggleSidebar,
        handleChange,
        handleChangeTitleCard,
        handleShowAddCard,
        loading,
        content,
        setContent,
        isSaving,
        setIsSaving,
        upFileComment,
        setUpFileComment,
        setToggleCardEditModal,
        setActiveIndex,
        isOwner
      }}
    >
      {children}
    </ListBoardContext.Provider>
  );
}

export default ListBoardProvider;
