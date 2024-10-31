import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CreateList } from "../../../Services/API/ApiListOfBoard";
import { createCardByIdList, getAllCardByIdList, getCardById } from "../../../Services/API/ApiCard";
import { getAllMembersByIdBoard, getBoardId, getWorkspaceById } from "../../../Services/API/ApiBoard/apiBoard";
import { apiAssignFile, apiUploadMultiFile } from "../../../Services/API/ApiUpload/apiUpload";
import { deleteComment, postComment } from "../../../Services/API/ApiComment";

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
  const [allUrls, setAllUrls] = useState([]);
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  // const [listComment, setListComment] = useState([]);

  const navigate = useNavigate();

  // const cmdId = dataCard.map((item) => item.comments.id);

  //======= handle upload with API =======
  // Hàm xử lý khi chọn file
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    toast.info("Uploading...");

    const formData = new FormData();
    let validFiles = true;
    for (let i = 0; i < files.length; i++) {
      const totalSize = +(10 * 1024 * 1024); // 10MB
      if (files[i].size > totalSize) {
        toast.error(`File ${files[i].name} is too large to upload.`);
        validFiles = false;
      } else {
        formData.append("files", files[i]);
      }
    }

    if (!validFiles) return;
    toast.info("Uploading...");

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
  useEffect(() => {
    if (dataCard && dataCard.id) {
      handlePostFiles(dataCard.id, allUrls);
    } else {
      //thêm thông báo cho người dùng ở đây nếu cần
    }
  }, [dataCard, allUrls]);

  //=============HANDLE COMMENT API====================
  const handlePostComment = async () => {
    if (!content.trim()) {
      toast.error("content không được để trống");
      return;
    }

    if (!dataCard || !dataCard.id) {
      console.error("dataCard không hợp lệ");
      return;
    }

    // Cấu trúc body để gửi lên API
    const params = {
      content: content.trim(),
      files: postUploadedFiles, // Nếu không có file nào, sẽ là mảng rỗng
      cardId: dataCard.id,
    };

    try {
      // await postcontent(boardId).send({ text: content });
      const response = await postComment(boardId, params);
      toast.success("Đăng content thành công!");
      setContent(""); // Xóa nội dung sau khi đăng thành công
      setPostUploadedFiles([]);
      // Cập nhật lại danh sách comments sau khi post thành công
      const newComment = response.data;
      setDataCard((prevDataCard) => ({
        ...prevDataCard,
        comments: [...prevDataCard.comments, newComment],
      }));
      return response.data;
    } catch (err) {
      toast.error("Không thể đăng comment");
      console.error("Lỗi khi đăng comment:", err);
    }
  };

  //================HANDLE DELETE COMMENT =================
  const handleDeleteComment = async (cmdId) => {
    try {
      await deleteComment(boardId, cmdId);
      // Cập nhật lại danh sách comments sau khi xóa
      setDataCard((prevDataCard) => ({
        ...prevDataCard,
        comments: prevDataCard.comments.filter((comment) => comment.id !== cmdId),
      }));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  //============HANDLE GET COMMENT: KHÔNG ĐƯỢC XÓA ĐOẠN COMMENT NÀY =================
  // useEffect(() => {
  //   const handleGetComment = async () => {
  //     try {
  //       const response = await getComment(boardId, dataCard.id);
  //       console.log('boardId', boardId);
  //       console.log('dataCard.id', dataCard.id);

  //       setListComment(response.data.content);
  //       return response.data;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //     };
  //     handleGetComment();
  //   }, [boardId, dataCard.id, listComment]);

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
  }, [boardId, idWorkSpace, listCount, navigate]);

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
        content,
        setContent,
        isSaving,
        setIsSaving,
        handlePostComment,
        handleDeleteComment,
      }}
    >
      {children}
    </ListBoardContext.Provider>
  );
}

export default ListBoardProvider;
