import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  Person4Outlined as Person4OutlinedIcon,
  Label as LabelIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  ArrowForwardOutlined as ArrowForwardOutlinedIcon,
  ContentCopyOutlined as ContentCopyOutlinedIcon,
  SaveAsOutlined as SaveAsOutlinedIcon,
  BackupTableOutlined as BackupTableOutlinedIcon,
} from "@mui/icons-material";

import { AttachmentIcon, DescriptionIcon } from "../../Components/Icons";
import { ButtonBoardCard } from "../ButtonBoardCard";
import { useState } from "react";

export const EditCard = ({
  position,
  data,
  imageSrc,
  isDescriptionIcon = false,
  isAttachment = false,
  attachmentCount,
  onShowBoardCard,
  onShowBoardEdit,
}) => {
  const listBtnCard = [
    {
      id: 1,
      nameBtn: "Open Card",
      Icon: <SaveAsOutlinedIcon className="mr-2 ml-1" fontSize="small" />,
    },
    {
      id: 2,
      nameBtn: "Edit label",
      Icon: <LabelIcon className="mr-2 ml-1" fontSize="small" />,
    },
    {
      id: 3,
      nameBtn: "Change Membership",
      Icon: <Person4OutlinedIcon className="mr-2 ml-1" fontSize="small" />,
    },
    {
      id: 4,
      nameBtn: "Change cover",
      Icon: <SaveAsOutlinedIcon className="mr-2 ml-1" fontSize="small" />,
    },
    {
      id: 5,
      nameBtn: "Edit date",
      Icon: <AccessTimeOutlinedIcon className="mr-2 ml-1" fontSize="small" />,
    },
    {
      id: 6,
      nameBtn: "Move",
      Icon: <ArrowForwardOutlinedIcon className="mr-2 ml-1" fontSize="small" />,
    },
    {
      id: 7,
      nameBtn: "Copy",
      Icon: <ContentCopyOutlinedIcon className="mr-2 ml-1" fontSize="small" />,
    },
    {
      id: 8,
      nameBtn: "Storage",
      Icon: <BackupTableOutlinedIcon className="mr-2 ml-1" fontSize="small" />,
    },
  ];

  const [inputTitle, setInputTitle] = useState(data.descriptionCard);
  const handleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleClickBtn = (item) => {
    switch (item.id) {
      case 1:
        onShowBoardCard(data);
        break;
      default:
        break;
    }
  };
  return (
    <div
      onClick={onShowBoardEdit}
      className="absolute top-0 left-0 flex w-full h-full bg-black bg-opacity-50 overflow-auto z-50"
    >
      <div className="mt-20 mb-10">
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ top: position.top - 40, left: position.left - 200 }}
          className="absolute flex justify-between min-w-[240px] bg-white rounded-[8px] p-2 font-medium text-[12px] z-500"
        >
          <div className="flex flex-col justify-center min-h-[40px]">
            {imageSrc && (
              <div className="w-full min-h-[20px]">
                <img src={imageSrc} alt="" className="w-full h-full object-cover rounded-tl-[8px] rounded-tr-[8px]" />
              </div>
            )}
            <div className="flex flex-col">
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => handleChange(e)}
                className="flex-1 p-2 rounded-[8px] text-[16px] font-[500] cursor-pointer whitespace-normal"
              />
              <div className="flex items-center">
                {isDescriptionIcon && (
                  <Tippy
                    content={<span className="text-[12px] max-w-[150px]">The card already has a description</span>}
                    arrow={false}
                    placement="bottom"
                  >
                    <div className="pb-2">
                      <DescriptionIcon className={"p-[4px] "} />
                    </div>
                  </Tippy>
                )}
                {isAttachment && (
                  <Tippy
                    content={<span className="text-[12px] max-w-[150px]">Attachments</span>}
                    arrow={false}
                    placement="bottom"
                  >
                    <div className="flex items-center pb-2">
                      <AttachmentIcon className={"p-[4px] ml-[2px]"} />
                      <div className="text-[12px] font-[400] text-black-500 py-[4px]">{attachmentCount}</div>
                    </div>
                  </Tippy>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ top: position.top - 40, left: position.left + 50 }}
          className="absolute flex flex-col"
        >
          {listBtnCard.map((item, index) => (
            <ButtonBoardCard
              key={index}
              onHandleEvent={() => handleClickBtn(item)}
              isActive={true}
              nameBtn={item.nameBtn}
              className={"bg-white hover:bg-gray-300 mb-1"}
            >
              {item.Icon}
            </ButtonBoardCard>
          ))}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ top: position.top + 20, left: position.left - 200 }}
          className="absolute flex flex-col"
        >
          <ButtonBoardCard
            isActive={true}
            nameBtn={"Save"}
            className={"text-white font-[500] bg-blue-500 hover:bg-gray-300 mb-1"}
          />
        </div>
      </div>
    </div>
  );
};
