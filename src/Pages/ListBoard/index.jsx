import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { ImageIcon } from '../../Assets/images';
import { ConvertHiDotsVertical } from '../../Components/HiDotsVertical';
import {
  ArrowDown,
  StarIcon,
  TwoUserIcon,
  MissileIcon,
  LightningIcon,
  AddIcon,
  TemplateCardIcon,
  ListIcon,
  FilterIcon,
  ShareIconRegular,
} from '../../Components/Icons';
import ImageBG from '../../Assets/images/sourceImages/image.png';
import ItemList from '../../Components/ItemList';

function ListBoard() {
  const [value, setValue] = useState('Backlog');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="max-w-[260px] w-full bg-gray-100">
        <div className="pl-4 py-4 flex items-center">
          <div className="rounded-[4px] px-3 font-bold text-white text-[20px] bg-gradient-to-b from-green-400 to-blue-500">
            B
          </div>
          <div className="flex-1 ml-2 text-[18px] font-medium">BKDN</div>
          <div className="mr-4 p-2 rounded-[4px] hover:bg-gray-300 cursor-pointer">
            <ArrowDown width={16} height={16} className={'rotate-90 text-gray-100'} />
          </div>
        </div>
        <div className="group flex items-center">
          <div className="flex-1 text-[16px] font-medium py-2 pl-4 ">Các bảng của bạn</div>
          <ConvertHiDotsVertical className={'mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'} />
        </div>
        <div className="relative flex items-center pl-4 py-2 bg-gray-200 cursor-pointer group">
          <div className="rounded-[4px] font-bold text-white text-[20px]">
            <ImageIcon width={24} height={20} className={'rounded-[2px]'} />
          </div>
          <div className="flex-1 ml-2 text-[18px] font-medium">BKDN</div>
          <ConvertHiDotsVertical
            className={
              'absolute p-2 right-8 opacity-0 group-hover:opacity-100 hover:bg-gray-300 rounded-[2px] transition-opacity duration-300'
            }
          />
          <div className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <StarIcon className={'hover:w-[18px] hover:h-[18px]'} width={16} height={16} />
          </div>
        </div>
      </div>
      {/* list board */}
      <div
        className="flex-grow"
        style={{
          backgroundImage: `url(${ImageBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex items-center justify-between h-[32px] p-6 bg-gray-100">
          <div className="flex items-center">
            <div className="text-black p-2 font-bold text-[20px]">KTPM</div>
            <Tippy
              content={
                <span className="text-[12px] max-w-[150px]">
                  Dánh hoặc bỏ đánh dấu sao bảng này. Bảng được đánh dấu sao sẽ hiện ở đầu danh sách Bảng.
                </span>
              }
              arrow={false}
              placement="bottom"
            >
              <div className="rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
                <StarIcon width={16} height={16} />
              </div>
            </Tippy>
            <Tippy
              content={<span className="text-[12px] max-w-[150px]">Khả năng xem</span>}
              arrow={false}
              placement="bottom"
            >
              <div className="rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
                <TwoUserIcon width={16} height={16} />
              </div>
            </Tippy>
            {/* button */}
            <Tippy content={<span className="text-[12px] max-w-[150px]">Bảng</span>} arrow={false} placement="bottom">
              <div className="flex items-center px-3 py-1 ml-2 rounded-[4px] bg-gray-600 hover:bg-gray-700 transition-bg duration-300">
                <ListIcon width={16} height={16} className={'mr-2 text-white'} />
                <span className="text-[16px] font-medium text-white">Bảng</span>
              </div>
            </Tippy>
            <Tippy
              content={<span className="text-[12px] max-w-[150px]">Tùy chỉnh chế độ xem</span>}
              arrow={false}
              placement="bottom"
            >
              <div className="mr-4 p-2 ml-2 rounded-[4px] hover:bg-gray-300 bg-gray-300 cursor-pointer">
                <ArrowDown width={16} height={16} className={'text-gray-100'} />
              </div>
            </Tippy>
          </div>
          <div className="flex items-center">
            <Tippy
              content={<span className="text-[12px] max-w-[150px]">Tiện ích bổ sung</span>}
              arrow={false}
              placement="bottom"
            >
              <div className="rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
                <MissileIcon width={16} height={16} />
              </div>
            </Tippy>
            <Tippy
              content={<span className="text-[12px] max-w-[150px]">Tự động hóa</span>}
              arrow={false}
              placement="bottom"
            >
              <div className="rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
                <LightningIcon width={16} height={16} />
              </div>
            </Tippy>
            <Tippy
              content={<span className="text-[12px] max-w-[150px]">Thẻ lọc bảng</span>}
              arrow={false}
              placement="bottom"
            >
              <div className="flex items-center px-3 py-1 ml-2 rounded-[4px] hover:bg-gray-300 transition-bg duration-300">
                <FilterIcon width={16} height={16} className={'mr-2'} />
                <span className="text-[16px] font-medium">Bộ lọc</span>
              </div>
            </Tippy>
            <Tippy
              content={<span className="text-[12px] max-w-[150px]">Chia sẽ bảng</span>}
              arrow={false}
              placement="bottom"
            >
              <div className="flex items-center px-3 py-1 ml-2 rounded-[4px] bg-gray-600 hover:bg-gray-700 transition-bg duration-300">
                <ShareIconRegular width={16} height={16} className={'mr-2 text-white'} />
                <span className="text-[16px] font-medium text-white">Chia sẽ</span>
              </div>
            </Tippy>
            <div className="rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
              <ConvertHiDotsVertical className={'group-hover:opacity-100 transition-opacity duration-300'} />
            </div>
          </div>
        </div>

        {/* list */}
        <div className="relative h-[90vh]">
          <div
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#fff6 #00000026',
            }}
            className="absolute h-full top-0 left-0 right-0 mb-2 pb-2 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin scrollbar-thumb-white scrollbar-track-black"
          >
            <div className="my-4 px-[4px] flex">
              <div className="flex flex-nowrap">
                <div className="px-[8px]">
                  <div className="flex flex-wrap flex-col w-[248px] bg-gray-100 rounded-[12px] p-2 transition-opacity duration-300">
                    <div className="flex items-center bg-gray-100">
                      <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        className="flex-1 max-w-[200px] bg-gray-100 rounded-[8px] text-[16px] font-[500] px-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Tippy
                        content={<span className="text-[12px] max-w-[150px]">Thao tác</span>}
                        arrow={false}
                        placement="bottom"
                      >
                        <div>
                          <ConvertHiDotsVertical
                            className={
                              'p-2 group-hover:opacity-100 hover:bg-gray-300 rounded-[8px] transition-opacity duration-300'
                            }
                          />
                        </div>
                      </Tippy>
                    </div>
                    {/* List board */}
                    <ItemList />
                    <div className="flex items-center pt-[8px]">
                      <div className="flex flex-1 items-center rounded-[8px] hover:bg-gray-300 cursor-pointer">
                        <div className=" rounded-[4px] p-2 hover:bg-gray-300 transition-opacity duration-300">
                          <AddIcon width={16} height={16} />
                        </div>
                        <div className="text-[16px] font-medium">Thêm thẻ</div>
                      </div>
                      <Tippy
                        content={<span className="text-[12px] max-w-[150px]">Tạo từ mẫu...</span>}
                        arrow={false}
                        placement="bottom"
                      >
                        <div>
                          <TemplateCardIcon
                            width={32}
                            height={32}
                            className={
                              'p-2 group-hover:opacity-100 hover:bg-gray-300 rounded-[8px] transition-opacity duration-300'
                            }
                          />
                        </div>
                      </Tippy>
                    </div>
                  </div>
                </div>
                <div className="px-[8px]">
                  <div className="flex items-center w-[248px] rounded-[12px] bg-gray-100 p-[6px] hover:bg-gray-300 cursor-pointer">
                    <div className="rounded-[4px] p-2 hover:bg-gray-300 transition-opacity duration-300">
                      <AddIcon width={16} height={16} />
                    </div>
                    <div className="text-[16px] font-medium">Thêm danh sách khác</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBoard;
