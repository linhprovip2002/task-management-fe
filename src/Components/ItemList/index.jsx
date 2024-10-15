import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { EditIcon, AttachmentIcon, DescriptionIcon } from '../../Components/Icons';

function ItemList({
  imageSrc,
  descriptionCard,
  isDescriptionIcon = false,
  isAttachment = false,
  attachmentCount,
  onShowBoardCard,
  onShowBoardEdit,
}) {
  return (
    <div className="relative group bg-white rounded-[8px] my-2 shadow-md hover:ring-1 hover:ring-blue-500 cursor-pointer">
      <div onClick={onShowBoardCard} className="flex flex-col justify-center min-h-[40px]">
        {imageSrc && (
          <div className="w-full min-h-[20px]">
            <img src={imageSrc} alt="" className="w-full h-full object-cover rounded-tl-[8px] rounded-tr-[8px]" />
          </div>
        )}
        <div className="flex flex-col  mx-[12px]">
          <div className="text-[16px] font-[400] text-black-500 py-[4px] whitespace-normal">{descriptionCard}</div>
          <div className="flex items-center">
            {isDescriptionIcon && (
              <Tippy
                content={<span className="text-[12px] max-w-[150px]">The card already has a description</span>}
                arrow={false}
                placement="bottom"
              >
                <div className="pb-2">
                  <DescriptionIcon className={'p-[4px] '} />
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
                  <AttachmentIcon className={'p-[4px] ml-[2px]'} />
                  <div className="text-[12px] font-[400] text-black-500 py-[4px]">{attachmentCount}</div>
                </div>
              </Tippy>
            )}
          </div>
        </div>
      </div>
      <Tippy content={<span className="text-[12px] max-w-[150px]">Edit card</span>} arrow={false} placement="bottom">
        <div
          onClick={onShowBoardEdit}
          className="absolute right-1 top-1 rounded-[50%] p-2 hover:bg-gray-100 bg-white group-hover:opacity-100 opacity-0 transition-opacity duration-300"
        >
          <EditIcon width={16} height={16} />
        </div>
      </Tippy>
    </div>
  );
}

export default ItemList;
