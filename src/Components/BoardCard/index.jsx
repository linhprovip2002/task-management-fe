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
  // AttachmentOutlined,
} from "@mui/icons-material";
import { useState } from "react";

import { listColorLabel } from "./constans/list.constans";
import { ButtonBoardCard } from "../ButtonBoardCard";
import MemberMenu from "../MemberMenuOfBoard";
import ToDoMenu from "../ToDoMenuOfBoard";
import { listLabelAdd } from "./constans/list.constans";
import { listBtnCard } from "./constans/list.constans";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import ItemPerson from "../ItemPerson";
import { useStorage } from "../../Contexts";
import AddLabelInCard from "./AddLabelInCard";
import CreateLabel from "./CreateLabel";
import UploadFile from "../Modals/UploadFile";
import { toast } from "react-toastify";
import { apiUploadMultiFile } from "../../Services/API/ApiUpload/apiUpload";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Attachment from "./Attachment";
import CalendarPopper from "./CalendarPopper";

export const BoardCard = () => {
  const {
    handleShowBoardCard,
    membersBoard,
    setMembersBoard,
    dataList,
    dataCard,
    position,
    setPosition,
    setMembersInCard,
    membersInCard,
  } = useListBoardContext();
  const { userData } = useStorage();
  const [listLabel, setListLabel] = useState(listLabelAdd);
  const [listToDo, setListToDo] = useState([]);
  const [countLabel, setCountLabel] = useState([]);
  const [chooseColorLabel, setChooseColorLabel] = useState(listColorLabel[0]);
  const [inputTitleLabel, setInputTitleLabel] = useState("");
  const [inputTitleToDo, setInputTitleToDo] = useState("What to do");
  const [inputTitleToDoItem, setInputTitleToDoItem] = useState("");
  const [numberShow, setNumberShow] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isCreateLabel, setIsCreateLabel] = useState(false);
  const [isUpdateLabel, setIsUpdateLabel] = useState(false);
  const [isShowMenuBtnCard, setIsShowMenuBtnCard] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  // eslint-disable-next-line
  const [openPoper, setOpenPoper] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // handle open, close poper delete image
  const handleOpenPoper = () => setOpenPoper(true);
  const handleClosePoper = () => setOpenPoper(false);

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
      setUploadedFiles([...response.data, ...uploadedFiles]);
      return response.data;
    } catch (error) {
      toast.error("Upload failed!");
    }
  };

  // handle date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  };

  // handle delete image

  // handle show and hide images
  const handleShowImage = () => setShowImage(true);
  const handleHideImage = () => setShowImage(false);
  const fileToShow = showImage ? uploadedFiles : uploadedFiles.slice(0, 4);
  const quantityFile = +(uploadedFiles.length - 4);

  const handleFollowing = () => {
    setIsFollowing(!isFollowing);
  };

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

  const ShowDetailNewLabel = () => {
    setIsCreateLabel(!isCreateLabel);
    if (isUpdateLabel) {
      setIsUpdateLabel(!isUpdateLabel);
    }
  };

  const ShowUpdateLabel = (item) => {
    ShowDetailNewLabel();
    setIsUpdateLabel(!isUpdateLabel);
    setChooseColorLabel(item);
    setInputTitleLabel(item.title);
  };

  const handleCreateNewLabel = (dataColor, titleLabel = "") => {
    const dataLabel = {
      id: dataColor.id,
      title: titleLabel,
      color: dataColor.color,
    };
    setListLabel((prev) => {
      if (prev.some((item) => item.id === dataLabel.id)) {
        const itemLabel = prev.find((item) => item.id === dataLabel.id);
        if (itemLabel.title !== dataLabel.title || itemLabel.color !== dataLabel.color) {
          return prev.map((item) =>
            item.id === dataLabel.id ? { ...item, color: dataLabel.color, title: dataLabel.title } : item,
          );
        }
        return prev;
      } else {
        return [...prev, dataLabel];
      }
    });
    ShowDetailNewLabel();
    setInputTitleLabel("");
    handleAddLabel(dataLabel);
  };

  const handleCreateNewToDoList = (nameItem, dataCopy = null) => {
    const dataToDo = {
      id: listToDo.length + 1,
      title: nameItem,
      todoItem: [],
      percent: 0,
    };
    setListToDo((prev) => {
      if (prev.some((item) => item.id === dataToDo.id)) {
        // const itemLabel = prev.find((item) => item.id === dataToDo.id);
        // if (itemLabel.title !== dataToDo.title) {
        //   return prev.map((item) => (item.id === dataToDo.id ? { ...item, title: dataToDo.title } : item));
        // }
        return prev;
      } else {
        return [...prev, dataToDo];
      }
    });
    handleCloseShowMenuBtnCard();
  };

  const handleRemoveToDoList = (item) => {
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

  const handleAddLabel = (item) => {
    setCountLabel((prevCountLabel) => {
      if (prevCountLabel.some((i) => i.id === item.id)) {
        return prevCountLabel.filter((i) => i.id !== item.id);
      } else {
        return [...prevCountLabel, item];
      }
    });
  };

  const handleCheckDoneToDoItem = (Item, todoItemList) => {
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

          const checkDoneCount = updatedTodoItems.filter((i) => i.checkDone).length;
          const percent = Math.round((100 * checkDoneCount) / updatedTodoItems.length) || 0;
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

  const handleAddMember = async (item) => {
    try {
      const member = await item;
      console.log(member);
      if (membersInCard.some((item) => item.id === member.id)) {
        setMembersInCard(membersInCard.filter((item) => item.id !== member.id));
        listBtnCard.forEach((item) => {
          if (item.id === 1) {
            item.nameBtn = "Join";
          }
        });
      } else {
        setMembersInCard([...membersInCard, member]);
        listBtnCard.forEach((item) => {
          if (item.id === 1) {
            item.nameBtn = "Leave";
          }
        });
      }
      if (membersBoard.some((item) => item.id === member.id)) {
        setMembersBoard(membersBoard.filter((item) => item.id !== member.id));
      } else {
        setMembersBoard([...membersBoard, member]);
      }
    } catch (error) {
      console.error("Error handling member:", error);
    }
  };

  const handleClickBtn = (e, item) => {
    setNumberShow(item.id);
    switch (item.id) {
      case 1:
        setIsJoin(!isJoin);
        setIsFollowing(!isJoin);
        handleAddMember(userData);
        break;
      case 2:
      case 3:
      case 4:
      case 5:
        handleShowMenuBtnCard(e);
        break;
      case 6:
        handleShowMenuBtnCard(e);
        break;
      default:
        break;
    }
  };
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 overflow-auto z-[999]">
      <div className="mt-20 mb-10">
        <div className="relative flex justify-between min-w-[700px] bg-white rounded-[8px] p-2 font-medium text-[12px] z-500">
          <div className="flex-1 p-2">
            <div className="flex p-2">
              <div>
                <FeaturedPlayListIcon fontSize="small" />
              </div>
              <div className="flex-1 ml-4">
                <div className="text-[16px] mb-2">{dataCard.title}</div>
                <div className="flex items-center text-[12px] mb-6">
                  <span className="mr-2 font-normal">in the list</span>
                  <div className="cursor-pointer text-[12px] px-1 bg-gray-300 rounded-[2px] font-bold">
                    {dataList?.title}
                  </div>
                  {isFollowing && <RemoveRedEyeOutlinedIcon className="ml-2" style={{ fontSize: "16px" }} />}
                </div>
                <div className="flex items-center">
                  {membersInCard.length !== 0 && <ItemPerson handleShowMenuBtnCard={handleShowMenuBtnCard} />}
                  {countLabel.length !== 0 && (
                    <div className="mr-2">
                      <div className="flex items-center text-[12px] mb-2">
                        <span className="mr-2">Label</span>
                      </div>
                      <div className="relative flex items-center justify-center">
                        {countLabel.map((item, index) => (
                          <div
                            key={item.id}
                            className={`${item.color} flex items-center justify-center rounded-[4px] h-[32px] px-3 mr-1 font-bold text-white text-[12px] `}
                          >
                            {item.title}
                          </div>
                        ))}
                        <div
                          onClick={ShowDetailNewLabel}
                          className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mr-1 font-bold text-[12px] bg-gray-200 hover:bg-gray-300"
                        >
                          <AddIcon style={{ fontSize: "20px" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mr-2">
                    <div className="flex items-center text-[12px] mb-2">
                      <span className="mr-2">Notification</span>
                    </div>
                    <ButtonBoardCard
                      onHandleEvent={handleFollowing}
                      isFollowing={isFollowing}
                      isActive={true}
                      nameBtn={"Following"}
                      className={"w-[120px] justify-center bg-gray-200 hover:bg-gray-300"}
                    >
                      <RemoveRedEyeOutlinedIcon className="ml-1 mr-2" fontSize="small" />
                    </ButtonBoardCard>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex p-2">
              <div>
                <SubjectIcon fontSize="small" />
              </div>
              <div className="flex-1 ml-4">
                <div className="text-[16px] mb-2">Describe</div>
                <div className="bg-gray-200 hover:bg-gray-300 cursor-pointer w-full text-[14px] mb-2 p-2 pb-6 rounded-[4px]">
                  <div>Add more detailed description...</div>
                </div>
              </div>
            </div>
            {/* SHOW ATTACHMENT */}
            <div className="px-2">
              <div className="flex items-center justify-between ">
                <div className="flex items-center">
                  <AttachmentIcon />
                  <p className="ml-3">Attachment</p>
                </div>
                <button className="px-4 py-1 bg-gray-300 rounded-sm">Add</button>
              </div>
              <div className="p-2 ml-6">
                <Attachment
                  uploadedFiles={uploadedFiles}
                  showImage={showImage}
                  fileToShow={fileToShow}
                  open={handleOpenPoper}
                  handleClose={handleClosePoper}
                  formatDate={formatDate}
                  handleShowImage={handleShowImage}
                  handleHideImage={handleHideImage}
                  quantityFile={quantityFile}
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
                          className={"w-[60px] justify-center bg-gray-200 hover:bg-gray-300"}
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
                      <li key={index} className="flex items-center my-2 cursor-pointer">
                        <input
                          checked={dataItem.checkDone}
                          onChange={() => handleCheckDoneToDoItem(item, dataItem)}
                          type="checkbox"
                          className="w-5 h-5 mx-2 cursor-pointer"
                        />
                        <span className="flex items-center w-full">
                          <div
                            onClick={() => handleCheckDoneToDoItem(item, dataItem)}
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
                          className={"w-[120px] justify-center bg-gray-200 hover:bg-gray-300"}
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
                                onHandleEvent={() => handleAddToDoItem(inputTitleToDoItem, item)}
                                isActive={true}
                                nameBtn={"More"}
                                className={"w-[80px] justify-center bg-blue-500 text-white hover:bg-blue-600"}
                              />
                              <ButtonBoardCard
                                onHandleEvent={() => ShowCreateToDoItem(item)}
                                isActive={true}
                                nameBtn={"Cancel"}
                                className={"w-[80px] ml-2 justify-center bg-gray-100 hover:bg-gray-300"}
                              />
                            </div>
                            <div className="flex items-center">
                              <ButtonBoardCard
                                onHandleEvent={ShowCreateToDoItem}
                                isActive={true}
                                nameBtn={"Assign"}
                                className={"w-[80px] justify-center hover:bg-gray-200"}
                              >
                                <Person4OutlinedIcon style={{ fontSize: "18px", marginRight: "4px" }} />
                              </ButtonBoardCard>
                              <ButtonBoardCard
                                onHandleEvent={ShowCreateToDoItem}
                                isActive={true}
                                nameBtn={"Expiration day"}
                                className={"w-[140px] ml-2 justify-center hover:bg-gray-200"}
                              >
                                <AccessTimeIcon style={{ fontSize: "18px", marginRight: "4px" }} />
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
                    className={"w-[100px] justify-center bg-gray-200 hover:bg-gray-300"}
                  />
                </div>
                <div className="flex items-center text-[12px] mb-2">dfdfdfdfdfdfd</div>
                <div className="flex items-center text-[12px] mb-2"></div>
              </div>
            </div>
          </div>
          <div className="min-w-[180px]">
            <div className="relative flex flex-col items-center mx-2 mt-16 mb-4">
              {listBtnCard.map((item, index) => (
                <ButtonBoardCard onHandleEvent={(e) => handleClickBtn(e, item)} key={index} nameBtn={item.nameBtn}>
                  {item.Icon}
                </ButtonBoardCard>
              ))}
            </div>
          </div>
          <CloseIcon
            onClick={handleShowBoardCard}
            className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
          />
        </div>
      </div>
      {isShowMenuBtnCard && numberShow === 2 && (
        <MemberMenu onAddMember={handleAddMember} handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard} />
      )}
      {isShowMenuBtnCard && numberShow === 3 && (
        <>
          {!isCreateLabel && (
            <AddLabelInCard
              position={position}
              countLabel={countLabel}
              listLabel={listLabel}
              handleAddLabel={handleAddLabel}
              ShowUpdateLabel={ShowUpdateLabel}
              ShowDetailNewLabel={ShowDetailNewLabel}
              handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard}
            />
          )}
          {isCreateLabel && (
            <CreateLabel
              position={position}
              isUpdateLabel={isUpdateLabel}
              handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard}
              ShowDetailNewLabel={ShowDetailNewLabel}
              chooseColorLabel={chooseColorLabel}
              handleChangeInputLabel={handleChangeInputLabel}
              inputTitleLabel={inputTitleLabel}
              handleChooseColor={handleChooseColor}
              handleCreateNewLabel={handleCreateNewLabel}
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
        <CalendarPopper position={position} handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard} />
      )}
      {isShowMenuBtnCard && numberShow === 6 && (
        <UploadFile
          position={position}
          handleFileChange={handleFileChange}
          handleCloseShowMenuBtnCard={handleCloseShowMenuBtnCard}
        />
      )}
    </div>
  );
};
