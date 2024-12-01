import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import PropTypes from "prop-types";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Avatar from "@mui/material/Avatar";

import { stringAvatar } from "../../Utils/color";
import {
  EditIcon,
  AttachmentIcon,
  DescriptionIcon,
} from "../../Components/Icons";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBoardPermission } from "../../Hooks/useBoardPermission";
import "./ItemList.css";

function ItemList({
  id,
  item,
  dataCard,
  isFollowing = false,
  isArchived = false,
}) {
  const navigate = useNavigate();
  const { id: idWorkSpace, idBoard } = useParams();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { type: "CARD" },
  });

  const {
    handleShowBoardCard,
    handleShowBoardEdit,
    isShowBoardCard,
    toggleCardEditModal,
    setToggleCardEditModal,
    setIsShowBoardCard,
  } = useListBoardContext();
  const { getCardPermissionByUser } = useGetBoardPermission();

  const [checkOverdue, setCheckOverdue] = useState(false);
  const [checkCompleteEndDate, setCheckCompleteEndDate] = useState(false);
  const [endDateCheck, setEndDateCheck] = useState(null);
  useEffect(() => {
    if (!dataCard || dataCard.endDate == null) {
      setEndDateCheck(null);
      return;
    }
    const endDate = new Date(dataCard.endDate);
    const currentDate = new Date();
    // overdue time
    const isOverdue = endDate < currentDate;
    setCheckOverdue(isOverdue);
    const day = endDate.getUTCDate().toString().padStart(2, "0");
    const month = (endDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const formattedDate = `${day}thg${month}`;
    setEndDateCheck(formattedDate);
  }, [dataCard]);

  const handleGetDataCardDetail = (dataCard) => {
    setIsShowBoardCard(!isShowBoardCard);
    handleShowBoardCard(dataCard);
  };

  const handleToggleBoardEdit = (e, item, dataCard) => {
    setToggleCardEditModal(!toggleCardEditModal);
    handleShowBoardEdit(e, item, dataCard);
  };

  useEffect(() => {
    if (!dataCard) {
      navigate(`/workspace/${idWorkSpace}/board/${idBoard}`);
    }
    // eslint-disable-next-line
  }, [dataCard]);

  const itemStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    display: "flex",
    borderRadius: 5,
    userSelect: "none",
    boxSizing: "border-box",
    opacity: isDragging ? "0.8" : 1,
  };

  return (
    <div
      style={itemStyle}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="relative group bg-white rounded-[8px] my-2 shadow-md hover:ring-1 hover:ring-blue-500 cursor-pointer"
    >
      <div
        onClick={() => handleGetDataCardDetail(dataCard)}
        className="flex flex-col justify-center min-h-[40px] w-full"
      >
        {dataCard?.coverUrl && (
          <div
            style={{
              backgroundImage: dataCard?.coverUrl.startsWith("http")
                ? `url(${dataCard?.coverUrl})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: dataCard?.coverUrl.startsWith("#")
                ? dataCard?.coverUrl
                : "",
            }}
            className={`w-full min-h-[80px] rounded-t-[6px]`}
          />
        )}
        <div className="flex flex-col mx-[12px]">
          <div className="flex items-center flex-wrap mt-2">
            {dataCard?.tagCards?.length > 0 &&
              dataCard?.tagCards.map((tagCard, index) =>
                tagCard?.tag?.color ? (
                  <div
                    key={index}
                    style={{
                      backgroundColor: tagCard.tag.color,
                    }}
                    className={`hover:opacity-90 mr-1 mb-1 h-[8px] w-[40px] rounded-[4px] transition-all duration-50`}
                  />
                ) : null,
              )}
          </div>
          <div className="text-[14px] font-[400] text-black-500 py-[4px] whitespace-normal">
            {dataCard?.title}
          </div>
          <div className="flex items-center justify-between w-full flex-wrap">
            <div className="flex items-center flex-wrap pb-2">
              {endDateCheck != null && (
                <div onClick={(e) => e.stopPropagation()}>
                  <div
                    className={`parent-group flex items-center text-[12px] 
        ${checkCompleteEndDate ? "bg-green-300" : checkOverdue ? "bg-red-100" : "bg-gray-300"}
        cursor-pointer rounded-[4px] p-1 hover:opacity-90 relative`}
                  >
                    <label className="flex items-center">
                      <div className="flex items-center cursor-pointer justify-center w-[20px] h-[20px] relative">
                        <AccessTimeIcon
                          style={{ fontSize: "16px" }}
                          className="child-hidden"
                        />
                        <input
                          type="checkbox"
                          checked={checkCompleteEndDate}
                          onChange={() =>
                            setCheckCompleteEndDate(!checkCompleteEndDate)
                          }
                          className="w-[12px] h-[12px] hidden child-visible"
                        />
                      </div>
                      <div className="cursor-pointer">{endDateCheck}</div>
                    </label>
                  </div>
                </div>
              )}
              {isFollowing && (
                <Tippy
                  content={
                    <span className="text-[12px] max-w-[150px]">
                      You are following this tag
                    </span>
                  }
                  arrow={false}
                  placement="bottom"
                >
                  <div className="">
                    <RemoveRedEyeOutlinedIcon className={"p-[4px] "} />
                  </div>
                </Tippy>
              )}
              {dataCard?.description && (
                <Tippy
                  content={
                    <span className="text-[12px] max-w-[150px]">
                      The card already has a description
                    </span>
                  }
                  arrow={false}
                  placement="bottom"
                >
                  <div className="">
                    <DescriptionIcon className={"p-[4px] "} />
                  </div>
                </Tippy>
              )}
              {dataCard?.comments?.length > 0 && (
                <Tippy
                  content={
                    <span className="text-[12px] max-w-[150px]">Comment</span>
                  }
                  arrow={false}
                  placement="bottom"
                >
                  <div className="flex items-center ">
                    <SmsOutlinedIcon className={"p-[4px] ml-[2px]"} />
                    <div className="text-[12px] font-[400] text-black-500 py-[4px]">
                      {dataCard?.comments?.length}
                    </div>
                  </div>
                </Tippy>
              )}
              {dataCard?.files?.length > 0 && (
                <Tippy
                  content={
                    <span className="text-[12px] max-w-[150px]">
                      Attachments
                    </span>
                  }
                  arrow={false}
                  placement="bottom"
                >
                  <div className="flex items-center ">
                    <AttachmentIcon className={"p-[4px] ml-[2px]"} />
                    <div className="text-[12px] font-[400] text-black-500 py-[4px]">
                      {dataCard?.files?.length}
                    </div>
                  </div>
                </Tippy>
              )}
              {isArchived && (
                <Tippy
                  content={
                    <span className="text-[12px] max-w-[150px]">
                      Attachments
                    </span>
                  }
                  arrow={false}
                  placement="bottom"
                >
                  <div className="flex items-center ">
                    <InventoryIcon className={"p-[4px] ml-[2px]"} />
                    <div className="text-[12px] font-[400] text-black-500 py-[4px]">
                      Archived
                    </div>
                  </div>
                </Tippy>
              )}
            </div>
            <div className="flex flex-1 items-center justify-end w-full">
              {dataCard?.members?.length > 0 &&
                dataCard?.members?.map((member, index) => (
                  <div key={index} className="flex items-center flex-wrap pb-2">
                    <Avatar
                      {...stringAvatar(member.user?.name)}
                      alt={member.user?.name}
                      src={member.user?.avatarUrl || ""}
                      sx={{ width: 24, height: 24, marginLeft: "8px" }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {getCardPermissionByUser("update") &&
        (isArchived || (
          <Tippy
            content={
              <span className="text-[12px] max-w-[150px]">Edit card</span>
            }
            arrow={false}
            placement="bottom"
          >
            <div
              onClick={(e) => {
                handleToggleBoardEdit(e, item, dataCard);
              }}
              className="absolute right-1 top-1 rounded-[50%] p-2 hover:bg-gray-100 bg-white group-hover:opacity-100 opacity-0 transition-opacity duration-300"
            >
              <EditIcon width={16} height={16} />
            </div>
          </Tippy>
        ))}
    </div>
  );
}

ItemList.propTypes = {
  isArchived: PropTypes.bool,
};
export default React.memo(ItemList);
