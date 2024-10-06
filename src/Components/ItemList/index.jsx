import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { EditIcon, AttachmentIcon, DescriptionIcon } from '../../Components/Icons';
import ImageBG from '../../Assets/images/sourceImages/image.png';

function ItemList({ props }) {
  return (
    <div className="relative group bg-white rounded-[8px] my-2 shadow-md hover:ring-1 hover:ring-blue-500 cursor-pointer">
      <div className="flex flex-col min-h-[40px]">
        <div className=" w-full h-[100px]">
          <img src={ImageBG} alt="" className="w-full h-full object-cover rounded-tl-[8px] rounded-tr-[8px]" />
        </div>
        <div className="flex flex-col ml-[12px]">
          <div className="text-[16px] font-[400] text-black-500 py-[4px]">phomai</div>
          <div className="flex items-center">
            <Tippy
              content={<span className="text-[12px] max-w-[150px]">Thẻ đã có miêu tả</span>}
              arrow={false}
              placement="bottom"
            >
              <div>
                <DescriptionIcon className={'p-[4px]'} />
              </div>
            </Tippy>
            <Tippy
              content={<span className="text-[12px] max-w-[150px]">Các tập tin đính kèm</span>}
              arrow={false}
              placement="bottom"
            >
              <div className="flex items-center">
                <AttachmentIcon className={'p-[4px] ml-[2px]'} />
                <div className="text-[12px] font-[400] text-black-500 py-[4px]">1</div>
              </div>
            </Tippy>
          </div>
        </div>
      </div>
      <div className="absolute right-1 top-1 rounded-[50%] p-2 hover:bg-gray-100 bg-white group-hover:opacity-100 opacity-0 transition-opacity duration-300">
        <EditIcon width={16} height={16} />
      </div>
    </div>
  );
}

export default ItemList;
