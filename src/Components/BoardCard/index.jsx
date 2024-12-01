import {
  Close as CloseIcon,
  FeaturedPlayList as FeaturedPlayListIcon,
  Subject as SubjectIcon,
  FormatListBulleted as FormatListBulletedIcon,
  RemoveRedEyeOutlined as RemoveRedEyeOutlinedIcon,
  Person4Outlined as Person4OutlinedIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  Replay as ReplayIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { useCallback, useEffect, useMemo, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import { useParams } from "react-router-dom";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { ButtonBoardCard } from "../ButtonBoardCard";
import MemberMenu from "../MemberMenuOfBoard";
import ToDoMenu from "../ToDoMenuOfBoard";
import { listBtnCard } from "./constans/list.constans";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import ItemPerson from "../ItemPerson";
import { useStorage } from "../../Contexts";
import AddLabelInCard from "./AddLabelInCard";
import CreateLabel from "./CreateLabel";
import UploadFile from "./Attachment/UploadFile";
import Attachment from "./Attachment";
import CalendarPopper from "./CalendarPopper";
import { CardComments } from "./ShowComment";
import {
  AddTagInCard,
  RemoveTagInCard,
} from "../../Services/API/ApiBoard/apiBoard";
import BackgroundPhoto from "./BackgroundPhoto";
import {
  deleteCard,
  destroyCard,
  getArchivedCards,
  JoinToCard,
  RemoveUserToCard,
  resendCard,
  updateCard,
} from "../../Services/API/ApiCard";
import UploadPoper from "./Attachment/UploadPoper";
import WriteComment from "./WriteComment";
import { EQueryKeys } from "../../constants";
import { useGetCardById, useGetTagByBoardId } from "../../Hooks";
import Loading from "../Loading";
import { formatDate } from "./WriteComment/helpers/formatDate";
import { createTag, deleteTag, updateTag } from "../../Services/API/APITags";
import { useGetCardComments } from "../../Hooks/useCards";
import {
  apiAssignFile,
  apiUploadMultiFile,
} from "../../Services/API/ApiUpload/apiUpload";
import DeleteCard from "./DeleteCard";
import { Description } from "./Description/Description";
import { findColById } from "../../Utils/dragDrop";
import { insertAtIndex } from "../../Utils/array";
import { useGetBoardPermission } from "../../Hooks/useBoardPermission";

export const BoardCard = () => {
  const {
    handleShowBoardCard,
    dataList,
    position,
    setPosition,
    content,
    setContent,
    isSaving,
    setEditorInstance,
    setDataCard,
    setIsShowBoardCard,
    isShowBoardCard,
    setDataList,
  } = useListBoardContext();
  const { idBoard } = useParams();

  const cardId = localStorage.getItem("cardId");
  const { data: dataCard } = useGetCardById(idBoard, cardId);
  const queryClient = useQueryClient();

  const { userData } = useStorage();
  const [labelOfCard, setLabelOfCard] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [postUploadedFiles, setPostUploadedFiles] = useState(
    dataCard?.files || [],
  );
  const [updatedBtnCard, setUpdatedBtnCard] = useState(listBtnCard);
  const [listColorLabel, setListColorLabel] = useState([]);
  const [membersInCard, setMembersInCard] = useState(dataCard?.members || []);
  const [listToDo, setListToDo] = useState([]);
  const [chooseColorLabel, setChooseColorLabel] = useState({});
  const [tag, setTag] = useState({});
  const [inputTitleLabel, setInputTitleLabel] = useState("");
  const [inputTitleToDo, setInputTitleToDo] = useState("What to do");
  const [inputTitleToDoItem, setInputTitleToDoItem] = useState("");
  const [numberShow, setNumberShow] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isCreateLabel, setIsCreateLabel] = useState(false);
  const [isUpdateLabel, setIsUpdateLabel] = useState(false);
  const [isShowMenuBtnCard, setIsShowMenuBtnCard] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  const [checkCompleteEndDate, setCheckCompleteEndDate] = useState(false);
  const [checkOverdue, setCheckOverdue] = useState(false);
  const [endDateCheck, setEndDateCheck] = useState(
    formatDate(dataCard?.endDate),
  );

  const [chooseColorBackground, setChooseColorBackground] = useState(
    dataCard?.coverUrl || "",
  );

  const [openAttach, setOpenAttach] = useState(false);
  const handleOpenAttach = () => setOpenAttach(true);
  const handleCloseAttach = () => setOpenAttach(false);

  const { cardComments, isLoading: isLoadingComments } = useGetCardComments(
    idBoard,
    cardId,
  );
  const listComment = useMemo(
    () => cardComments?.reverse() || [],
    [cardComments],
  );

  const { boardTags, isLoading: isLoadingTags } = useGetTagByBoardId(idBoard);
  const {
    getCommentPermissionByUser,
    getTagPermissionByUser,
    getCardPermissionByUser,
  } = useGetBoardPermission();

  useEffect(() => {
    if (dataCard) {
      setLabelOfCard(
        dataCard?.tagCards
          ?.filter((tagCard) => tagCard?.tag)
          .map(({ tag }) => ({
            id: tag.id,
            updatedAt: tag.updatedAt || null,
            color: tag.color,
            name: tag.name,
            boardId: idBoard,
          })) || [],
      );
      setPostUploadedFiles(dataCard?.files || []);
      setMembersInCard(dataCard?.members || []);
      setChooseColorBackground(dataCard?.coverUrl || "");

      if (dataCard.endDate) {
        const endDate = new Date(dataCard.endDate);
        const currentDate = new Date();
        setCheckOverdue(endDate < currentDate);
        const day = endDate.getUTCDate().toString().padStart(2, "0");
        const month = (endDate.getUTCMonth() + 1).toString().padStart(2, "0");
        setEndDateCheck(`${day}thg${month}`);
      } else {
        setEndDateCheck(null);
      }
    }
  }, [dataCard, idBoard]);

  useEffect(() => {
    setListColorLabel(boardTags?.data || []);
  }, [boardTags]);

  const handleCloseBoardCard = async (data) => {
    
    setIsShowBoardCard(!isShowBoardCard);
    queryClient
      .invalidateQueries({
        queryKey: [EQueryKeys.GET_CARD_BY_ID, data?.id.toString()],
      })
      .then(() => {
        const updatedDataCard = queryClient.getQueryData([
          EQueryKeys.GET_CARD_BY_ID,
          data?.id.toString(),
        ]);
        handleShowBoardCard(updatedDataCard?.data);
      });
  };

  const handleFollowing = () => {
    setIsFollowing(!isFollowing);
  };

  const handleChooseColorBackground = useCallback(async (item) => {
    if (!getCardPermissionByUser("update")) {
      toast.error("You don't have permission to join this card.");
      return;
    }
    setChooseColorBackground(item);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const updateBtnBegin = async () => {
      console.log(cardId);
      if (dataCard) {
        const isUserJoined = dataCard?.members.some(
          (member) => member?.user.id === userData.id,
        );
        const newBtnCard = listBtnCard.map((btn) => {
          if (btn.nameBtn === "Join" && isUserJoined) {
            setIsJoin(true);
            setIsFollowing(true);
            return {
              ...btn,
              nameBtn: "Leave",
              Icon: (
                <PersonRemoveAlt1OutlinedIcon
                  className="ml-1 mr-2"
                  fontSize="small"
                />
              ),
            };
          }
          return btn;
        });

        setUpdatedBtnCard(newBtnCard);
      } else {
        const cardsArchived = await getArchivedCards(idBoard);
        setDataCard(cardsArchived.find((card) => card.id === Number(cardId)));
        const updateBtnList = listBtnCard.flatMap((btn) => {
          if (btn.id === 12) {
            return [
              {
                id: 13,
                nameBtn: "Send to board",
                Icon: <ReplayIcon className="ml-1 mr-2" fontSize="small" />,
              },
              {
                id: 14,
                nameBtn: "Delete",
                Icon: <RemoveIcon className="ml-1 mr-2" fontSize="small" />,
                color: "#ca3521",
              },
            ];
          }
          return [btn];
        });
        setUpdatedBtnCard(updateBtnList);
      }
    };
    updateBtnBegin();
  }, [dataCard, userData, idBoard, cardId, setDataCard]);

  const ShowCreateToDoItem = (Item) => {
    setListToDo((prev) => {
      return prev.map((item) => {
        if (item.id === Item.id) {
          const isCreateItem = !item.isCreateItem;
          return {
            ...item,
            isCreateItem: isCreateItem,
          };
        }
        return item;
      });
    });
  };

  const ShowDetailNewLabel = useCallback(() => {
    setIsCreateLabel(!isCreateLabel);
    if (isUpdateLabel) {
      setIsUpdateLabel(!isUpdateLabel);
    }
  }, [isCreateLabel, isUpdateLabel]);

  const ShowUpdateLabel = useCallback(
    (item) => {
      item = { ...item, colorCode: item.color };
      ShowDetailNewLabel();
      setIsUpdateLabel(!isUpdateLabel);
      setChooseColorLabel(item);
      setTag(item);
      setInputTitleLabel(item.name);
    },
    [isUpdateLabel, ShowDetailNewLabel],
  );

  const handleCreateNewLabel = async (dataColor, titleLabel = "") => {
    if (!getCardPermissionByUser("update")) {
      toast.error("You don't have permission to join this card.");
      return;
    }
    try {
      ShowDetailNewLabel();
      setInputTitleLabel("");
      const tag = await createTag({
        boardId: Number(idBoard),
        name: titleLabel,
        color: dataColor?.colorCode,
      });
      tag && setListColorLabel([...listColorLabel, tag]);
      tag && (await AddTagInCard(idBoard, dataCard?.id, tag.id));
      setLabelOfCard((prevCountLabel) => [...prevCountLabel, tag]);
    } catch (err) {
      console.error("Error add data tag in card detail: ", err);
    }
  };

  const handleRemoveLabel = async (tag) => {
    if (!getCardPermissionByUser("update")) {
      toast.error("You don't have permission to join this card.");
      return;
    }
    try {
      ShowDetailNewLabel();
      setInputTitleLabel("");
      setListColorLabel((prev) => prev.filter((label) => label.id !== tag.id));
      await deleteTag(tag?.boardId, tag?.id);
      setLabelOfCard((prevCountLabel) =>
        prevCountLabel.filter((label) => label.id !== tag?.id),
      );
    } catch (err) {
      setListColorLabel([...listColorLabel]);
      console.error("Error add data tag in card detail: ", err);
    }
  };

  const handleUpdateLabel = async (tag, dataColor, titleLabel = "") => {
    if (!getCardPermissionByUser("update")) {
      toast.error("You don't have permission to join this card.");
      return;
    }
    try {
      ShowDetailNewLabel();
      setInputTitleLabel("");
      setListColorLabel((prevList) =>
        prevList.map((item) =>
          item.id === tag.id
            ? { ...item, name: titleLabel, color: dataColor?.colorCode }
            : item,
        ),
      );
      setLabelOfCard((prevCountLabel) =>
        prevCountLabel.map((item) =>
          item.id === tag.id
            ? { ...item, name: titleLabel, color: dataColor?.colorCode }
            : item,
        ),
      );
      await updateTag({
        boardId: idBoard,
        name: titleLabel,
        color: dataColor?.colorCode,
        tagId: tag.id,
      });
    } catch (error) {
      setListColorLabel([...listColorLabel]);
      setLabelOfCard(labelOfCard);
      console.error("Error update data tag in card detail: ", error);
    }
  };

  const handleCreateNewToDoList = (nameItem) => {
    if (!getCardPermissionByUser("update")) {
      toast.error("You don't have permission to join this card.");
      return;
    }
    const dataToDo = {
      id: listToDo.length + 1,
      title: nameItem,
      todoItem: [],
      percent: 0,
    };
    setListToDo((prev) => {
      if (prev.some((item) => item.id === dataToDo.id)) {
        return prev;
      } else {
        return [...prev, dataToDo];
      }
    });
    handleCloseShowMenuBtnCard();
  };

  const handleRemoveToDoList = (item) => {
    if (!getCardPermissionByUser("update")) {
      toast.error("You don't have permission to join this card.");
      return;
    }
    setListToDo((prev) => {
      return prev.filter((i) => i.id !== item.id);
    });
  };

  const handleShowMenuBtnCard = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ top: rect.bottom + 8, left: rect.left });
    handleCloseShowMenuBtnCard();
  };

  const handleCloseShowMenuBtnCard = () => {
    setIsShowMenuBtnCard(!isShowMenuBtnCard);
    if (isCreateLabel) setIsCreateLabel(!isCreateLabel);
  };

  const handleCloseBtnPhoto = async () => {
    handleCloseShowMenuBtnCard();
    try {
      const data = {
        title: dataCard.title,
        description: dataCard.description,
        coverUrl: chooseColorBackground,
        priority: dataCard.priority,
        tagId: dataCard.tagId,
        startDate: dataCard.startDate,
        endDate: dataCard.endDate,
        listId: dataList.id,
      };
      const res = await updateCard(idBoard, dataCard.id, data);
      setDataCard((prev) => {
        return { ...prev, coverUrl: chooseColorBackground };
      });
      return res;
    } catch (error) {}
  };

  const handleAddLabel = useCallback(
    (item) => {
      const addTagAsync = async () => {
        try {
          await AddTagInCard(idBoard, dataCard?.id, item.id);
        } catch (err) {
          console.error("Error add data tag in card detail: ", err);
        }
      };
      const removeTagAsync = async () => {
        try {
          await RemoveTagInCard(idBoard, dataCard?.id, item.id);
        } catch (err) {
          console.error("Error remove data tag in card detail: ", err);
        }
      };
      setLabelOfCard((prevCountLabel) => {
        if (prevCountLabel.some((i) => i.id === item.id)) {
          if (getTagPermissionByUser("unassign")) {
            removeTagAsync();
            return prevCountLabel.filter((i) => i.id !== item.id);
          } else {
            toast.error("You don't have permission to remove this tag.");
          }
        } else {
          if (getTagPermissionByUser("assign")) {
            addTagAsync();
            return [...prevCountLabel, item];
          } else {
            toast.error("You don't have permission to add this tag.");
          }
        }
      });
    },
    // eslint-disable-next-line
    [dataCard, idBoard],
  );

  const handleCheckDoneToDoItem = (Item, todoItemList) => {
    if (!getCardPermissionByUser("update")) {
      toast.error("You don't have permission to join this card.");
      return;
    }
    setListToDo((prev) => {
      return prev.map((todo) => {
        if (todo.id === Item.id) {
          const updatedCheckDone = !todoItemList.checkDone;
          const updatedTodoItems = todo.todoItem.map((todoItem) => {
            if (todoItem.id === todoItemList.id) {
              return {
                ...todoItem,
                checkDone: updatedCheckDone,
              };
            }
            return todoItem;
          });

          const checkDoneCount = updatedTodoItems.filter(
            (i) => i.checkDone,
          ).length;
          const percent =
            Math.round((100 * checkDoneCount) / updatedTodoItems.length) || 0;
          return {
            ...todo,
            todoItem: updatedTodoItems,
            percent,
          };
        }
        return todo;
      });
    });
  };

  const handleAddToDoItem = (nameItem, item) => {
    if (!getCardPermissionByUser("update")) {
      toast.error("You don't have permission to join this card.");
      return;
    }
    if (nameItem !== "") {
      const updatedList = listToDo.map((i) => {
        if (i.id === item.id) {
          const newDataItem = {
            id: i.todoItem.length + 1,
            title: nameItem,
            checkDone: false,
          };
          return {
            ...i,
            todoItem: [...i.todoItem, newDataItem],
          };
        }
        return i;
      });
      setListToDo(updatedList);
      setInputTitleToDoItem("");
      ShowCreateToDoItem(item);
    }
  };

  const handleChooseColor = (item) => {
    setChooseColorLabel(item);
  };

  const handleChangeInputLabel = (e) => {
    setInputTitleLabel(e.target.value);
  };

  const handleChangeInputTodo = (e) => {
    setInputTitleToDo(e.target.value);
  };

  const handleChangeInputTodoItem = (e) => {
    setInputTitleToDoItem(e.target.value);
  };

  const handleJoinIntoCard = async (item) => {
    if (!getCardPermissionByUser("update")) {
      toast.error("You don't have permission to join this card.");
      return;
    }
    try {
      const isUserJoined = membersInCard?.some(
        (member) => member?.user?.id === item.id,
      );
      const newBtnCard = updatedBtnCard.map((btn) => {
        if (btn.nameBtn === "Leave" && isUserJoined) {
          return {
            ...btn,
            nameBtn: "Join",
            Icon: <PersonAddAltIcon className="ml-1 mr-2" fontSize="small" />,
          };
        } else if (btn.nameBtn === "Join" && !isUserJoined) {
          return {
            ...btn,
            nameBtn: "Leave",
            Icon: (
              <PersonRemoveAlt1OutlinedIcon
                className="ml-1 mr-2"
                fontSize="small"
              />
            ),
          };
        }
        return btn;
      });
      setUpdatedBtnCard(newBtnCard);
      if (isUserJoined) {
        setMembersInCard((prev) => prev.filter((p) => p?.user?.id !== item.id));
        await RemoveUserToCard(idBoard, dataCard.id, item.id);
      } else {
        setMembersInCard([...membersInCard, { user: item }]);
        await JoinToCard(idBoard, dataCard.id, item.id);
      }

      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_MEMBER_BY_BOARD],
      });
    } catch (error) {
      setMembersInCard([...membersInCard]);
      setUpdatedBtnCard(updatedBtnCard);
      console.error("Error handling join member to card:", error);
    }
  };

  const handleAddMember = async (item) => {
    if (
      !getCardPermissionByUser("assign") ||
      !getCardPermissionByUser("unassign") ||
      !getCardPermissionByUser("update")
    ) {
      toast.error("You don't have permission to add this member.");
      return;
    }
    try {
      if (item?.user.id === userData.id) {
        handleJoinIntoCard(item?.user);
        return;
      }
      setMembersInCard([...membersInCard, { user: item?.user }]);
      const res = await JoinToCard(idBoard, dataCard.id, item?.user.id);
      !res && setMembersInCard([...membersInCard]);
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_MEMBER_BY_BOARD],
      });
    } catch (error) {
      console.error("Error handling member:", error);
    }
  };

  const handlePostFiles = useCallback(async (id, idBoard, allUrls) => {
    try {
      const response = await apiAssignFile(id, idBoard, allUrls);
      setPostUploadedFiles(response.data.files);
      return response.data.files;
    } catch (error) {
      console.error("Failed to get uploaded files:", error);
    }
    // eslint-disable-next-line
  }, []);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const validFiles = [];
    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File ${file.name} is too large to upload.`);
      } else {
        validFiles.push(file);
      }
    });
    if (!validFiles.length) return;
    const loadToastId = toast.loading("Uploading...");

    try {
      // Tải lên các file song song
      const uploadPromises = validFiles.map((file) => {
        const formData = new FormData();
        formData.append("files", file);
        return apiUploadMultiFile(formData);
      });

      const responses = await Promise.all(uploadPromises);
      toast.dismiss(loadToastId);
      toast.success("Upload successful!");

      // Lấy dữ liệu file đã tải lên
      const uploadedFilesData = responses.flatMap((response) => response.data);
      const uploadedUrls = uploadedFilesData.map((file) => file.url);

      // Gọi API để đính kèm (gửi) các URL len dữ liệu thẻ (card)
      await handlePostFiles(dataCard.id, idBoard, uploadedUrls);
      return uploadedFilesData;
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.dismiss(loadToastId);
      toast.error("Failed to upload files.");
    }
  };

  const handleArchived = useCallback(
    async (idBtn) => {
      const updateBtnList = listBtnCard.flatMap((btn) => {
        if (btn.id === idBtn) {
          return [
            {
              id: 13,
              nameBtn: "Send to board",
              Icon: <ReplayIcon className="ml-1 mr-2" fontSize="small" />,
            },
            {
              id: 14,
              nameBtn: "Delete",
              Icon: <RemoveIcon className="ml-1 mr-2" fontSize="small" />,
              color: "#ca3521",
            },
          ];
        }
        return [btn];
      });
      setUpdatedBtnCard(updateBtnList);

      try {
        const updatedLists = dataList.map((list) => {
          if (list.cards.some((card) => card.id === dataCard.id)) {
            return {
              ...list,
              cards: list.cards.filter((card) => card.id !== dataCard.id),
            };
          }
          return list;
        });
        setDataList(updatedLists);
        const res = await deleteCard(idBoard, dataCard.id);
        if (res.removed === 1) setDataCard(res);
      } catch (error) {
        console.error("Error: Unable to store data on the card", error);
        setDataList(dataList);
      }
    },
    [dataCard?.id, dataList, idBoard, setDataCard, setDataList],
  );

  const handleSendToBoard = async () => {
    setUpdatedBtnCard(listBtnCard);
    resendCard(dataCard.id, idBoard)
      .then((res) => {
        setDataList((prev) => {
          const newState = [...prev];
          const colIndex = findColById(newState, dataCard?.listId);
          newState[colIndex].cards = insertAtIndex(
            newState[colIndex].cards,
            dataCard.position,
            dataCard,
          );
          return newState;
        });
        toast.success("Resend to board successfully");
      })
      .catch((err) => {
        toast.error("Resend to board unsuccessfully");
      });
  };

  const handleDeleteCard = useCallback(() => {
    if (
      !getCardPermissionByUser("delete") ||
      !getCardPermissionByUser("update")
    ) {
      toast.error("You don't have permission to delete this card.");
      return;
    }
    setIsShowBoardCard(!isShowBoardCard);
    setLoadingDelete(true);
    destroyCard(idBoard, dataCard?.id)
      .then((res) => {
        toast.success("Delete card successfully");
      })
      .catch((err) => {
        toast.error("Delete card unsuccessfully");
      })
      .finally(() => {
        setLoadingDelete(false);
      });
    setUpdatedBtnCard(listBtnCard);

    // eslint-disable-next-line
  }, [dataCard, idBoard]);

  const handleClickBtn = (e, item) => {
    setNumberShow(item.id);
    if (item.id === 1) {
      setIsJoin(!isJoin);
      setIsFollowing(!isJoin);
      handleJoinIntoCard(userData);
    }
    if (item.id === 12) {
      getCardPermissionByUser("update")
        ? handleArchived(item.id)
        : toast.error("You don't have permission to archive this card.");
    }
    if (item.id === 13) {
      getCardPermissionByUser("restore")
        ? handleSendToBoard()
        : toast.error("You don't have permission to restore this card.");
    }
    if (item.id === 14) {
      handleShowMenuBtnCard(e);
    } else if ([2, 3, 4, 5, 6, 7].includes(item.id)) {
      handleShowMenuBtnCard(e);
    }
  };

  const loading =
    !dataCard || !cardComments || isLoadingComments || isLoadingTags;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[400]">
        <div
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#fff6 #00000026",
            overflowY: "auto",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="max-h-[80vh] overflow-y-auto overflow-x-hidden absolute flex flex-col justify-between w-[700px] bg-white rounded-lg font-medium text-xs z-[100]"
        >
          {loading && <Loading className="absolute" />}
          {chooseColorBackground && (
            <div
              style={{
                backgroundImage: chooseColorBackground.startsWith("http")
                  ? `url(${chooseColorBackground})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: chooseColorBackground.startsWith("#")
                  ? chooseColorBackground
                  : "",
              }}
              className={`w-full min-h-[150px] rounded-t-l-[8px]`}
            />
          )}
          <div className="flex justify-between font-medium text-[12px] p-2 z-500 w-full">
            <div className="flex-1 p-2">
              <div className="flex p-2">
                <div>
                  <FeaturedPlayListIcon fontSize="small" />
                </div>
                <div className="flex-1 ml-4">
                  <div className="text-[16px] mb-2">
                    {dataCard?.title || "No Title"}
                  </div>
                  <div className="flex items-center text-[12px] mb-6">
                    <span className="mr-2 font-normal">in the list</span>
                    <div className="cursor-pointer text-[12px] px-1 bg-gray-300 rounded-[2px] font-bold">
                      {dataList?.title || "No Title"}
                    </div>
                    {isFollowing && (
                      <RemoveRedEyeOutlinedIcon
                        className="ml-2"
                        style={{ fontSize: "16px" }}
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center">
                    {membersInCard && membersInCard?.length !== 0 && (
                      <ItemPerson
                        membersInCard={membersInCard}
                        handleShowMenuBtnCard={handleShowMenuBtnCard}
                      />
                    )}
                    {labelOfCard?.length > 0 && (
                      <div className="mb-2 mr-2">
                        <div className="flex items-center text-[12px] mb-2">
                          <span className="mr-2">Label</span>
                        </div>
                        <div className="flex flex-wrap items-center">
                          {labelOfCard.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                backgroundColor: item.color,
                              }}
                              className={`flex items-center justify-center rounded-[4px] min-w-[32px] h-[32px] px-3 py-2 mb-2 mr-1 font-bold text-white text-[12px] `}
                            >
                              {item.name}
                            </div>
                          ))}
                          <div
                            onClick={ShowDetailNewLabel}
                            className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mb-2 mr-1 font-bold text-[12px] bg-gray-200 hover:bg-gray-300"
                          >
                            <AddIcon style={{ fontSize: "20px" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    {endDateCheck != null && (
                      <div className="mb-2 mr-2">
                        <div className="flex items-center text-[12px] mb-2">
                          <span className="mr-2">Expiration date</span>
                        </div>
                        <li className="flex items-center cursor-pointer">
                          <input
                            checked={checkCompleteEndDate}
                            onChange={() =>
                              setCheckCompleteEndDate(!checkCompleteEndDate)
                            }
                            type="checkbox"
                            className="w-5 h-5 cursor-pointer"
                          />
                          <span
                            onClick={() =>
                              setCheckCompleteEndDate(!checkCompleteEndDate)
                            }
                            className="flex items-center w-full"
                          >
                            <div
                              className={`flex items-center justify-between rounded-[4px] mx-2 p-1 ${checkCompleteEndDate ? "bg-green-200" : checkOverdue ? "bg-red-300" : "bg-gray-300"} hover:opacity-90 cursor-pointer`}
                            >
                              <div className="">{endDateCheck}</div>
                              {checkCompleteEndDate && (
                                <div className="bg-green-500 p-[2px] text-[10px] rounded-[4px] ml-2">
                                  complete
                                </div>
                              )}
                              <KeyboardArrowDownIcon fontSize="small" />
                            </div>
                          </span>
                        </li>
                      </div>
                    )}
                    <div className="mb-2 mr-2">
                      <div className="flex items-center text-[12px] mb-2">
                        <span className="mr-2">Notification</span>
                      </div>
                      <ButtonBoardCard
                        onHandleEvent={handleFollowing}
                        isFollowing={isFollowing}
                        isActive={true}
                        nameBtn={"Following"}
                        className={
                          "w-[120px] justify-center bg-gray-200 hover:bg-gray-300"
                        }
                      >
                        <RemoveRedEyeOutlinedIcon
                          className="ml-1 mr-2"
                          fontSize="small"
                        />
                      </ButtonBoardCard>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-2">
                <div>
                  <SubjectIcon fontSize="small" />
                </div>
                <Description />
              </div>
              {/* SHOW ATTACHMENT */}
              <div className="px-2">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center">
                    <AttachmentIcon />
                    <p className="ml-3">Attachment</p>
                  </div>
                  <div>
                    <button
                      onClick={handleOpenAttach}
                      className="px-4 py-1 bg-gray-300 rounded-sm"
                    >
                      Add
                    </button>
                    {openAttach && (
                      <div>
                        <UploadPoper
                          handleFileChange={handleFileChange}
                          handleCloseAttach={handleCloseAttach}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 ml-6">
                  <Attachment
                    loading={loading}
                    postUploadedFiles={postUploadedFiles}
                    setPostUploadedFiles={setPostUploadedFiles}
                  />
                </div>
              </div>
              {/* WHAT TO DO HIEN THI LEN UI */}
              {listToDo &&
                listToDo.map((item, index) => (
                  <div key={index}>
                    <div className="flex p-2">
                      <div>
                        <CheckBoxOutlinedIcon fontSize="small" />
                      </div>
                      <div className="flex-1 ml-4">
                        <div className="flex justify-between">
                          <div className="text-[16px] mb-2">{item.title}</div>
                          <ButtonBoardCard
                            onHandleEvent={() => handleRemoveToDoList(item)}
                            isActive={true}
                            nameBtn={"Erase"}
                            className={
                              "w-[60px] justify-center bg-gray-200 hover:bg-gray-300"
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-2">
                      <div className="w-[12px] mr-1">{item.percent || 0}%</div>
                      <div className="relative ml-4 flex-1 w-full bg-gray-200 h-[8px] rounded-[4px]">
                        <span
                          style={{ width: `${item.percent}%` }}
                          className={`absolute left-0 top-0 bg-blue-500 max-w-full h-[8px] rounded-[4px] index-50`}
                        ></span>
                      </div>
                    </div>
                    <ul>
                      {item.todoItem.map((dataItem, index) => (
                        <li
                          key={index}
                          className="flex items-center my-2 cursor-pointer"
                        >
                          <input
                            checked={dataItem.checkDone}
                            onChange={() =>
                              handleCheckDoneToDoItem(item, dataItem)
                            }
                            type="checkbox"
                            className="w-5 h-5 mx-2 cursor-pointer"
                          />
                          <span className="flex items-center w-full">
                            <div
                              onClick={() =>
                                handleCheckDoneToDoItem(item, dataItem)
                              }
                              className={`flex-1 hover:bg-gray-300 h-[34px] p-2 rounded-[4px] transition-all duration-50`}
                            >
                              <font>{dataItem.title}</font>
                            </div>
                          </span>
                        </li>
                      ))}
                      <div className="mb-8 ml-2">
                        {!item.isCreateItem ? (
                          <ButtonBoardCard
                            onHandleEvent={() => ShowCreateToDoItem(item)}
                            isActive={true}
                            nameBtn={"Add an item"}
                            className={
                              "w-[120px] justify-center bg-gray-200 hover:bg-gray-300"
                            }
                          />
                        ) : (
                          <div>
                            <div className="border-2 border-gray-500 rounded-[2px] mb-4">
                              <input
                                type="text"
                                placeholder="Add an item"
                                value={inputTitleToDoItem}
                                onChange={(e) => handleChangeInputTodoItem(e)}
                                className="w-full bg-white rounded-[2px] text-base font-[200] px-2 py-1 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <ButtonBoardCard
                                  onHandleEvent={() =>
                                    handleAddToDoItem(inputTitleToDoItem, item)
                                  }
                                  isActive={true}
                                  nameBtn={"More"}
                                  className={
                                    "w-[80px] justify-center bg-blue-500 text-white hover:bg-blue-600"
                                  }
                                />
                                <ButtonBoardCard
                                  onHandleEvent={() => ShowCreateToDoItem(item)}
                                  isActive={true}
                                  nameBtn={"Cancel"}
                                  className={
                                    "w-[80px] ml-2 justify-center bg-gray-100 hover:bg-gray-300"
                                  }
                                />
                              </div>
                              <div className="flex items-center">
                                <ButtonBoardCard
                                  onHandleEvent={ShowCreateToDoItem}
                                  isActive={true}
                                  nameBtn={"Assign"}
                                  className={
                                    "w-[80px] justify-center hover:bg-gray-200"
                                  }
                                >
                                  <Person4OutlinedIcon
                                    style={{
                                      fontSize: "18px",
                                      marginRight: "4px",
                                    }}
                                  />
                                </ButtonBoardCard>
                                <ButtonBoardCard
                                  onHandleEvent={ShowCreateToDoItem}
                                  isActive={true}
                                  nameBtn={"Expiration day"}
                                  className={
                                    "w-[140px] ml-2 justify-center hover:bg-gray-200"
                                  }
                                >
                                  <AccessTimeIcon
                                    style={{
                                      fontSize: "18px",
                                      marginRight: "4px",
                                    }}
                                  />
                                </ButtonBoardCard>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ul>
                  </div>
                ))}

              <div className="flex p-2">
                <div>
                  <FormatListBulletedIcon fontSize="small" />
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between">
                    <div className="text-[16px] mb-2">Work</div>
                    <ButtonBoardCard
                      isActive={true}
                      nameBtn={"Show details"}
                      className={
                        "w-[100px] justify-center bg-gray-200 hover:bg-gray-300"
                      }
                    />
                  </div>
                  <div className="flex items-center text-[12px] mb-2"></div>
                  <div className="flex items-center text-[12px] mb-2"></div>
                </div>
              </div>
              {/* POST COMMENTS */}
              <div className="flex w-full">
                <WriteComment
                  setEditorInstance={setEditorInstance}
                  setContent={setContent}
                  loading={loading}
                  handleFileChange={handleFileChange}
                  content={content}
                  isSaving={isSaving}
                />
              </div>
              {/* SHOW COMMENT */}
              {getCommentPermissionByUser("list") &&
                listComment.map((item) => (
                  <CardComments item={item} key={item.id} />
                ))}
            </div>
            <div className="min-w-[180px]">
              <div className="relative flex flex-col items-center mx-2 mt-16 mb-4">
                {updatedBtnCard?.map((item, index) => (
                  <ButtonBoardCard
                    onHandleEvent={(e) => handleClickBtn(e, item)}
                    key={index}
                    nameBtn={item.nameBtn}
                    item={item}
                  >
                    {item.Icon}
                  </ButtonBoardCard>
                ))}
              </div>
              <div className="flex items-center text-[12px] mb-2"></div>
              <div className="flex items-center text-[12px] mb-2"></div>
            </div>
          </div>
          <CloseIcon
            onClick={() => handleCloseBoardCard(dataCard)}
            className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
          />
        </div>
        {isShowMenuBtnCard && numberShow === 2 && (
          <MemberMenu
            onAddMember={handleAddMember}
            membersInCard={membersInCard}
            updatedBtnCard={updatedBtnCard}
            setUpdatedBtnCard={setUpdatedBtnCard}
            setMembersInCard={setMembersInCard}
            handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard}
          />
        )}
        {isShowMenuBtnCard && numberShow === 3 && (
          <>
            {!isCreateLabel && (
              <AddLabelInCard
                position={position}
                labelOfCard={labelOfCard}
                listColorLabel={listColorLabel}
                handleAddLabel={handleAddLabel}
                ShowUpdateLabel={ShowUpdateLabel}
                ShowDetailNewLabel={ShowDetailNewLabel}
                handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard}
              />
            )}
            {isCreateLabel && (
              <CreateLabel
                position={position}
                tag={tag}
                isUpdateLabel={isUpdateLabel}
                handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard}
                ShowDetailNewLabel={ShowDetailNewLabel}
                chooseColorLabel={chooseColorLabel}
                handleChangeInputLabel={handleChangeInputLabel}
                inputTitleLabel={inputTitleLabel}
                handleChooseColor={handleChooseColor}
                handleCreateNewLabel={handleCreateNewLabel}
                handleRemoveLabel={handleRemoveLabel}
                onUpdateLabel={handleUpdateLabel}
              />
            )}
          </>
        )}
        {isShowMenuBtnCard && numberShow === 4 && (
          <ToDoMenu
            position={position}
            inputTitleToDo={inputTitleToDo}
            handleChangeInputTodo={handleChangeInputTodo}
            handleCreateNewToDoList={handleCreateNewToDoList}
            handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard}
          />
        )}
        {isShowMenuBtnCard && numberShow === 5 && (
          <CalendarPopper
            position={position}
            handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard}
            setEndDateCheck={setEndDateCheck}
            dataCard={dataCard}
          />
        )}
        {isShowMenuBtnCard && numberShow === 6 && (
          <UploadFile
            position={position}
            handleFileChange={handleFileChange}
            handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard}
          />
        )}
        {isShowMenuBtnCard && numberShow === 7 && (
          <BackgroundPhoto
            position={position}
            handleCloseShowMenuBtnCard={handleCloseBtnPhoto}
            ShowDetailNewLabel={ShowDetailNewLabel}
            background={chooseColorBackground}
            chooseBackground={handleChooseColorBackground}
            postUploadedFiles={postUploadedFiles}
            setPostUploadedFiles={setPostUploadedFiles}
            handleUploadFile={handleFileChange}
          />
        )}
        {isShowMenuBtnCard && numberShow === 14 && (
          <DeleteCard
            position={position}
            title={"Do you want to delete the card?"}
            description={
              "All activity on the card will be removed from your activity feed and you won't be able to reopen the card. There's no way to undo it. Are you sure?"
            }
            nameBtn={"Delete"}
            onClickConfirm={handleDeleteCard}
            onClose={handleCloseShowMenuBtnCard}
            loading={loadingDelete}
          />
        )}
      </div>
    </>
  );
};
