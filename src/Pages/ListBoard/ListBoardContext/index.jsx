import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CreateList } from "../../../Services/API/ApiListOfBoard";
import { createCardByIdList, getAllCardByIdList, getAllUserByIdCard, getCardById } from "../../../Services/API/ApiCard";
import {
  getAllMembersByIdBoard,
  getBoardId,
  getWorkspaceById,
  updateBoard,
} from "../../../Services/API/ApiBoard/apiBoard";
import { apiAssignFile, apiUploadMultiFile } from "../../../Services/API/ApiUpload/apiUpload";

const ListBoardContext = createContext();

export const useListBoardContext = () => {
  return useContext(ListBoardContext);
};

function ListBoardProvider({ children, boardId, idWorkSpace }) {
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
  const [dataWorkspace, setDataWorkspace] = useState([]);
  const [membersBoard, setMembersBoard] = useState([]);
  const [membersInCard, setMembersInCard] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [postUploadedFiles, setPostUploadedFiles] = useState([]);
  // eslint-disable-next-line
  const [allUrls, setAllUrls] = useState([]);

  const navigate = useNavigate();

  //======= handle upload with API =======
  // Hàm xử lý khi chọn file
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    toast.info("Uploading...");

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    try {
      const response = await apiUploadMultiFile(formData);
      toast.success("Upload successful!");
      const totalFileUpload = [...response.data, ...uploadedFiles];
      setUploadedFiles(totalFileUpload);
      // Lấy tất cả các URL từ totalFileUpload và lưu trữ chúng trong trạng thái allUrls
      const urls = totalFileUpload.map((file) => file.url);
      setAllUrls(urls);
      return response.data;
    } catch (error) {
      toast.error("Upload failed!");
    }
  };

  // ============handle get UploadedFiles==============
  const handlePostFiles = async (id, allUrls) => {
    try {
      const response = await apiAssignFile(id, allUrls);
      setPostUploadedFiles(response.data.files);
    } catch (error) {
      console.error("Failed to get uploaded files:", error);
    }
  };

  let prevListCountRef = useRef();
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const resWorkspace = await getWorkspaceById(idWorkSpace);
        if (!resWorkspace || resWorkspace.error) return navigate(`/workspace/${idWorkSpace}/home`);
        setDataWorkspace(resWorkspace?.data);

        const resBoard = await getBoardId(boardId);
        if (!resBoard || resBoard.error) return navigate(`/workspace/${idWorkSpace}/home`);
        setDataBoard(resBoard);
        const lists = resBoard.lists;
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
        navigate(`/workspace/${idWorkSpace}/home`);
      }
    };

    fetchBoardData();
  }, [boardId, idWorkSpace, navigate]);

  useEffect(() => {
    const getAllUserInBoard = async () => {
      try {
        const res = await getAllMembersByIdBoard(boardId);
        const dataUser = res.data[0].user;
        setMembersBoard([dataUser]);
      } catch (err) {
        console.error("Error get all user data in board: ", err);
      }
    };

    getAllUserInBoard();
  }, [boardId]);

  const handleShowBoardCard = useCallback(
    async (data, dataCard) => {
      try {
        const resDataCardDetail = await getCardById(dataCard.id);
        setDataCard(resDataCardDetail.data);

        const resMemberCard = await getAllUserByIdCard(dataCard.id);
        setMembersInCard(resMemberCard?.data);
      } catch (err) {
        console.error("Error fetching data card detail: ", err);
        navigate(`/workspace/${idWorkSpace}/board/${boardId}`);
      }
      setIsShowBoardCard(!isShowBoardCard);
      if (isShowBoardEdit) {
        setIsShowBoardEdit(!isShowBoardEdit);
      }
      setDataList(data);
    },
    [isShowBoardCard, isShowBoardEdit, idWorkSpace, boardId, navigate],
  );

  const handleShowBoardEdit = useCallback(
    async (e, dataList, dataCard) => {
      setIsShowBoardEdit(!isShowBoardEdit);
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
      setDataList(dataList);
      try {
        const resDataCardDetail = await getCardById(dataCard.id);
        setDataCard(resDataCardDetail.data);
      } catch (err) {
        console.error("Error fetching data card detail: ", err);
        navigate(`/workspace/${idWorkSpace}/board/${boardId}`);
      }
    },
    [isShowBoardEdit, idWorkSpace, boardId, navigate],
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

  // ============handle get Active star==============
  useEffect(() => {
    if (dataBoard && dataBoard.id) setActiveStar(dataBoard.isFavorite);
  }, [dataBoard]);
  const handleActiveStar = useCallback(() => {
    setActiveStar(!activeStar);
    updateBoard(boardId, { ...dataBoard, isFavorite: !activeStar });
  }, [activeStar, boardId, dataBoard]);

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
        dataWorkspace,
        membersBoard,
        membersInCard,
        setMembersInCard,
        setMembersBoard,
        handleChangeSidebar,
        handleChange,
        handleChangeTitleCard,
        handleCopyList,
        handleShowAddCard,
        uploadedFiles,
        setUploadedFiles,
        handleFileChange,
        postUploadedFiles,
        setPostUploadedFiles,
        handlePostFiles,
      }}
    >
      {children}
    </ListBoardContext.Provider>
  );
}

export default ListBoardProvider;
