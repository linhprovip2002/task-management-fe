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
import ItemList from '../../Components/ItemList';
import { CreateItem } from '../../Components/CreateItem';
import { BoardCard } from '../../Components/BoardCard';

function ListBoard() {
  const [nameTitle, setNameTitle] = useState('');
  const [isClosedNavBar, setIsCloseNavBar] = useState(false);
  const [isShowBoardCard, setIsShowBoardCard] = useState(false);
  const [isShowAddList, setIsShowAddList] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  // {
  //   imageSrc: ImageBG,
  //   descriptionCard: 'phomai phomai phomai phomai phomaiphomai phomai phomai phomai phomai',
  //   isAttachment: true,
  //   isDescriptionIcon: true,
  //   attachmentCount: 1,
  // },

  const [listCount, setListCount] = useState([]);

  const handleShowBoardCard = () => {
    setIsShowBoardCard(!isShowBoardCard);
  };

  const handleChange = (e, index) => {
    const newList = [...listCount];
    newList[index].descriptionCard = e.target.value;
    setListCount(newList);
  };

  const handleChangeTitleCard = (e) => {
    setNameTitle(e.target.value);
  };

  const handleClosedNavBar = () => {
    setIsCloseNavBar(!isClosedNavBar);
  };

  const handleShowAddCard = (index) => {
    setActiveIndex(index);
    const newList = [...listCount];
    newList[index].isShowAddCard = !newList[index].isShowAddCard;
    setListCount(newList);
  };

  const handleShowAddList = () => {
    setIsShowAddList(!isShowAddList);
  };

  const handleAddCard = (newData, index) => {
    const newList = [...listCount];
    if (newData.descriptionCard) {
      newList[index].cardCounts = [...newList[index].cardCounts, newData];
    }
    newList[index].isShowAddCard = !newList[index].isShowAddCard;
    setListCount(newList);
    setNameTitle('');
  };

  const handleAddList = (newData) => {
    if (newData.descriptionCard) {
      const newListItem = {
        descriptionCard: newData.descriptionCard,
        cardCounts: [],
      };
      setListCount((prev) => [...prev, newListItem]);
    }
    setIsShowAddList(!isShowAddList);
    setNameTitle('');
  };

  return (
    <>
      <div className="w-[100wh] h-[91vh] flex">
        <div
          onClick={isClosedNavBar ? handleClosedNavBar : undefined}
          className={`${isClosedNavBar ? 'max-w-[20px] w-full relative hover:bg-gray-200 border-r-[1px] border-gray-300' : 'max-w-[260px] w-full'} bg-gray-100`}
        >
          {isClosedNavBar ? (
            <div
              onClick={handleClosedNavBar}
              className="absolute top-3 left-2 p-1 rounded-[50%] bg-gray-300 hover:bg-gray-200 cursor-pointer"
            >
              <ArrowDown width={16} height={16} className={'rotate-90 text-gray-100'} />
            </div>
          ) : (
            <>
              <div className="pl-4 py-4 flex items-center">
                <div className="rounded-[4px] px-3 font-bold text-white text-[20px] bg-gradient-to-b from-green-400 to-blue-500">
                  B
                </div>
                <div className="flex-1 ml-2 text-[18px] font-medium">BKDN</div>
                <div onClick={handleClosedNavBar} className="mr-4 p-2 rounded-[4px] hover:bg-gray-300 cursor-pointer">
                  <ArrowDown width={16} height={16} className={'rotate-90 text-gray-100'} />
                </div>
              </div>
              <div className="group flex items-center">
                <div className="flex-1 text-[16px] font-medium py-2 pl-4 ">Your tables</div>
                <ConvertHiDotsVertical
                  type={'navbarTable'}
                  className={'mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'}
                />
              </div>
              <div className="relative flex items-center pl-4 py-2 bg-gray-200 cursor-pointer group">
                <div className="rounded-[4px] font-bold text-white text-[20px]">
                  <ImageIcon width={24} height={20} className={'rounded-[2px]'} />
                </div>
                <div className=" flex-1 ml-2 text-[18px] font-medium">KTPM</div>
                <ConvertHiDotsVertical
                  type={'navbarBoard'}
                  className={
                    'p-2 mr-8 right-8 opacity-0 group-hover:opacity-100 hover:bg-gray-300 rounded-[2px] transition-opacity duration-300'
                  }
                />
                <div className="absolute right-0 mr-3 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <StarIcon className={'hover:w-[18px] hover:h-[18px]'} width={16} height={16} />
                </div>
              </div>
            </>
          )}
        </div>
        {/* list board */}
        <div
          className="flex-grow"
          style={{
            backgroundImage: `url(https://trello.com/assets/707f35bc691220846678.svg)`,
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
                    Star or unstar this tables. Starred tables will appear at the top of the tables list.
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
                content={<span className="text-[12px] max-w-[150px]">Viewability</span>}
                arrow={false}
                placement="bottom"
              >
                <div className="rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
                  <TwoUserIcon width={16} height={16} />
                </div>
              </Tippy>
              {/* button */}
              <Tippy
                content={<span className="text-[12px] max-w-[150px]">Board</span>}
                arrow={false}
                placement="bottom"
              >
                <div className="flex items-center px-3 py-1 ml-2 rounded-[4px] bg-gray-600 hover:bg-gray-700 transition-bg duration-300">
                  <ListIcon width={16} height={16} className={'mr-2 text-white'} />
                  <span className="text-[16px] font-medium text-white">Board</span>
                </div>
              </Tippy>
              <Tippy
                content={<span className="text-[12px] max-w-[150px]">Customize view</span>}
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
                content={<span className="text-[12px] max-w-[150px]">Additional utilities</span>}
                arrow={false}
                placement="bottom"
              >
                <div className="rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
                  <MissileIcon width={16} height={16} />
                </div>
              </Tippy>
              <Tippy
                content={<span className="text-[12px] max-w-[150px]">Automation</span>}
                arrow={false}
                placement="bottom"
              >
                <div className="rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
                  <LightningIcon width={16} height={16} />
                </div>
              </Tippy>
              <Tippy
                content={<span className="text-[12px] max-w-[150px]">Table filter tags</span>}
                arrow={false}
                placement="bottom"
              >
                <div className="flex items-center px-3 py-1 ml-2 rounded-[4px] hover:bg-gray-300 transition-bg duration-300">
                  <FilterIcon width={16} height={16} className={'mr-2'} />
                  <span className="text-[16px] font-medium">Filter</span>
                </div>
              </Tippy>
              <Tippy
                content={<span className="text-[12px] max-w-[150px]">Share Board</span>}
                arrow={false}
                placement="bottom"
              >
                <div className="flex items-center px-3 py-1 ml-2 rounded-[4px] bg-gray-600 hover:bg-gray-700 transition-bg duration-300">
                  <ShareIconRegular width={16} height={16} className={'mr-2 text-white'} />
                  <span className="text-[16px] font-medium text-white">Share</span>
                </div>
              </Tippy>
              <div className="rounded-[4px] p-2 ml-2 hover:bg-gray-300 transition-opacity duration-300">
                <ConvertHiDotsVertical
                  type={''}
                  className={'group-hover:opacity-100 transition-opacity duration-300'}
                />
              </div>
            </div>
          </div>

          {/* list */}
          <div className="relative h-[80vh]">
            <div
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#fff6 #00000026',
              }}
              className="absolute h-full top-0 left-0 right-0 mb-2 pb-2 overflow-x-auto overflow-y-hidden whitespace-nowrap"
            >
              <div className="my-4 px-[4px] flex">
                <div className="flex flex-nowrap">
                  {listCount.map((item, index) => {
                    return (
                      <div key={index} className="px-[8px]">
                        <div className="flex flex-col w-[248px] max-h-[75vh] bg-gray-100 rounded-[12px] p-1 transition-opacity duration-300  ">
                          <div className="flex p-1 items-center bg-gray-100">
                            <input
                              type="text"
                              value={item.descriptionCard}
                              onChange={(e) => handleChange(e, index)}
                              className="flex-1 max-w-[190px] mr-2 bg-gray-100 rounded-[8px] text-[16px] font-[500] px-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Tippy
                              content={<span className="text-[12px] max-w-[150px]">Operation</span>}
                              arrow={false}
                              placement="bottom"
                            >
                              <div>
                                <ConvertHiDotsVertical
                                  indexCard={index}
                                  onShowAddCard={handleShowAddCard}
                                  type={'operation'}
                                  className={
                                    'p-2 group-hover:opacity-100 hover:bg-gray-300 rounded-[8px] transition-opacity duration-300'
                                  }
                                />
                              </div>
                            </Tippy>
                          </div>
                          {/* List board */}
                          <div
                            style={{
                              scrollbarWidth: 'thin',
                              scrollbarColor: '#fff6 #00000026',
                            }}
                            className="flex-1 p-1 overflow-y-auto overflow-x-hidden"
                          >
                            {item.cardCounts.map((card, index) => {
                              return (
                                <ItemList
                                  onShowBoardCard={handleShowBoardCard}
                                  key={index}
                                  imageSrc={card.imageSrc}
                                  descriptionCard={card.descriptionCard}
                                  isAttachment={card.isAttachment}
                                  isDescriptionIcon={card.isDescriptionIcon}
                                  cardCount={card.cardCount}
                                />
                              );
                            })}
                          </div>

                          {item.isShowAddCard && activeIndex === index && (
                            <CreateItem
                              index={index}
                              nameBtn={'Add card'}
                              descriptionCard={nameTitle}
                              placeHolderText={'Enter title or paste link'}
                              onAdd={handleAddCard}
                              onShow={() => handleShowAddCard(index)}
                              onChangeTitle={handleChangeTitleCard}
                            />
                          )}

                          {!item.isShowAddCard && (
                            <div className="flex p-1 items-center pt-[8px]">
                              <div
                                onClick={() => handleShowAddCard(index)}
                                className="flex flex-1 items-center rounded-[8px] hover:bg-gray-300 cursor-pointer"
                              >
                                <div className=" rounded-[4px] p-2 hover:bg-gray-300 transition-opacity duration-300">
                                  <AddIcon width={16} height={16} />
                                </div>
                                <div className="text-[16px] font-medium">Add card</div>
                              </div>
                              <Tippy
                                content={<span className="text-[12px] max-w-[150px]">Create from template...</span>}
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
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div className="px-[8px]">
                    <div
                      onClick={!isShowAddList ? handleShowAddList : null}
                      className={`flex items-center w-[248px] rounded-[12px] bg-gray-100 p-[6px] ${!isShowAddList ? 'hover:bg-gray-300' : ''} cursor-pointer`}
                    >
                      {!isShowAddList ? (
                        <>
                          <div className="rounded-[4px] p-2 hover:bg-gray-300 transition-opacity duration-300">
                            <AddIcon width={16} height={16} />
                          </div>
                          <div className="text-[16px] font-medium">Add another list</div>
                        </>
                      ) : (
                        <div className="w-full">
                          <CreateItem
                            isList={true}
                            nameBtn={'Add list'}
                            descriptionCard={nameTitle}
                            placeHolderText={'Enter list name...'}
                            onAdd={handleAddList}
                            onShow={handleShowAddList}
                            onChangeTitle={handleChangeTitleCard}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowBoardCard && <BoardCard onShowBoardCard={handleShowBoardCard} />}
    </>
  );
}

export default ListBoard;
