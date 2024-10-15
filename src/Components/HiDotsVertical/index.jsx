import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { ItemMenu } from '../ItemMenu';

export const ConvertHiDotsVertical = ({
  tippyName,
  name,
  className,
  type,
  listCount,
  onShowAddCard,
  onActiveMonitor,
}) => {
  const [isCollapsed, setIsCollapse] = useState(false);
  const [isLeaveBoard, setIsLeaveBoard] = useState(false);
  const [activeCollectTable, setActiveCollectTable] = useState(0);
  const [activeCollectOperation, setActiveCollectOperation] = useState(null);
  const [titleName, settitleName] = useState('Sort by alphabetical order');
  const [nameList, setNameList] = useState(name);
  const nameOperations = [
    'Add card',
    'Copy list',
    'Move list',
    'Move all cards in this list',
    'Sort by...',
    'Monitor',
    'Save this list',
    'Store all tags in this list',
  ];

  const collectTypeSort = [
    'Date Create (Most Recent First)',
    'Date Create (Farthest Before)',
    'Card Name (in alphabetical order)',
  ];

  const toggleCollape = () => {
    setIsCollapse(!isCollapsed);
    if (isLeaveBoard) {
      setIsLeaveBoard(!isLeaveBoard);
    }
  };

  const handleLeaveBoard = () => {
    setIsLeaveBoard(!isLeaveBoard);
  };

  const handleCopyList = () => {
    console.log(nameList);
  };

  const handleShow = (index) => {
    toggleCollape();
    setActiveCollectOperation(index);
    handleLeaveBoard();

    switch (index) {
      case 0:
        onShowAddCard(index);
        break;
      case 5:
        onActiveMonitor();
        break;
      default:
        break;
    }
  };

  const handleActive = (index, title) => {
    setActiveCollectTable(index);
    settitleName(title);
  };

  return (
    <div>
      <Tippy content={<span className="text-[12px] max-w-[150px]">{tippyName}</span>} arrow={false} placement="bottom">
        <div className={className} onClick={toggleCollape}>
          <HiDotsVertical size={16} className="text-gray-700 rotate-90" />
        </div>
      </Tippy>

      {type === 'navbarTable' && (
        <>
          {isCollapsed && (
            <div className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50">
              <div className="text-center p-2 mx-8">Your tables</div>
              <div className="mx-2 py-1">Arrange</div>
              <div
                onClick={handleLeaveBoard}
                className={`flex items-center justify-between rounded-[4px] mx-2 p-2 hover:ring-1 hover:ring-gray-500 hover:bg-gray-100 cursor-pointer  active:ring-blue-500`}
              >
                <div className="">{titleName}</div>
                <KeyboardArrowDownIcon fontSize="small" />
              </div>
              <CloseIcon
                onClick={toggleCollape}
                className="absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
              />
              {isLeaveBoard && (
                <div className="absolute bottom-[-14] left-2 w-[230px] bg-white rounded-[8px] py-2 font-medium text-[12px] shadow-lg z-50">
                  <div
                    onClick={() => handleActive(0, 'Sort by alphabetical order')}
                    className={`relative p-2 bg-white rounded transition duration-200 after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-blue-500 after:opacity-0 ${activeCollectTable === 0 ? 'after:opacity-100 hover:bg-blue-100 bg-blue-200 active:after:opacity-100 text-blue-900' : 'hover:after:opacity-100 hover:bg-gray-100 active:after:opacity-100'}`}
                  >
                    Sort by alphabetical order
                  </div>
                  <div
                    onClick={() => handleActive(1, 'Sort by most recent')}
                    className={`relative p-2 bg-white rounded transition duration-200 after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-blue-500 after:opacity-0 ${activeCollectTable === 1 ? 'after:opacity-100 hover:bg-blue-100 bg-blue-200 active:after:opacity-100 text-blue-900' : 'hover:after:opacity-100 hover:bg-gray-100 active:after:opacity-100'}`}
                  >
                    Sort by most recent
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {type === 'navbarBoard' && (
        <>
          {isCollapsed && (
            <div className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50">
              <div className="text-center p-2 mx-8">KTPM</div>
              <div onClick={handleLeaveBoard} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                <div className="">Leave the board</div>
                <ChevronRightIcon fontSize="small" />
              </div>
              <CloseIcon
                onClick={toggleCollape}
                className="absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
              />
            </div>
          )}
          {isLeaveBoard && (
            <ItemMenu
              title={'Do you want to leave the board?'}
              description={'You will be removed from all cards in this table'}
              nameBtn={'Leave'}
              onLeaveBoard={handleLeaveBoard}
              onToggleCollape={toggleCollape}
            />
          )}
        </>
      )}

      {type === 'operation' && (
        <>
          {isCollapsed && (
            <div className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50">
              <div className="text-center p-2 mx-8">Operation</div>
              {nameOperations.map((name, index) => (
                <div
                  onClick={() => handleShow(index)}
                  key={index}
                  className="p-2 bg-white rounded transition duration-200 hover:bg-gray-100"
                >
                  {name}
                </div>
              ))}
              <CloseIcon
                onClick={toggleCollape}
                className="absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
              />
            </div>
          )}
          {isLeaveBoard && activeCollectOperation === 1 && (
            <ItemMenu
              title={nameOperations[activeCollectOperation]}
              description={'Name'}
              nameBtn={'Create list'}
              onLeaveBoard={handleLeaveBoard}
              onToggleCollape={toggleCollape}
              onHandleCopyList={handleCopyList}
            >
              <div className="w-full px-4">
                <textarea
                  value={nameList}
                  onChange={(e) => {
                    setNameList(e.target.value);
                  }}
                  className="w-full border-2 border-gray-300 rounded-[4px] p-2"
                />
              </div>
            </ItemMenu>
          )}
          {isLeaveBoard && activeCollectOperation === 2 && (
            <ItemMenu
              title={nameOperations[activeCollectOperation]}
              description={'Name'}
              nameBtn={'Move'}
              onLeaveBoard={handleLeaveBoard}
              onToggleCollape={toggleCollape}
              onHandleCopyList={handleCopyList}
            >
              <div className="w-full px-4">
                <textarea
                  value={nameList}
                  onChange={(e) => {
                    setNameList(e.target.value);
                  }}
                  className="w-full border-2 border-gray-300 rounded-[4px] p-2"
                />
              </div>
            </ItemMenu>
          )}
          {isLeaveBoard && activeCollectOperation === 3 && (
            <ItemMenu
              title={nameOperations[activeCollectOperation]}
              onLeaveBoard={handleLeaveBoard}
              onToggleCollape={toggleCollape}
            >
              {listCount.map((item, index) => (
                <div
                  onClick={item.descriptionCard === nameList ? undefined : () => handleShow(index)}
                  key={index}
                  className={`p-2 bg-white rounded transition duration-200 ${item.descriptionCard === nameList ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100 cursor-pointer'} `}
                >
                  {item.descriptionCard}
                </div>
              ))}
            </ItemMenu>
          )}
          {isLeaveBoard && activeCollectOperation === 4 && (
            <ItemMenu
              title={nameOperations[activeCollectOperation]}
              onLeaveBoard={handleLeaveBoard}
              onToggleCollape={toggleCollape}
            >
              {collectTypeSort.map((nameType, index) => (
                <div
                  onClick={() => handleShow(index)}
                  key={index}
                  className="p-2 bg-white rounded transition duration-200 hover:bg-gray-100 cursor-pointer"
                >
                  {nameType}
                </div>
              ))}
            </ItemMenu>
          )}
          {isLeaveBoard && activeCollectOperation === 7 && (
            <ItemMenu
              title={nameOperations[activeCollectOperation]}
              nameBtn={'Save Tags'}
              onLeaveBoard={handleLeaveBoard}
              onToggleCollape={toggleCollape}
            >
              <div className="w-full px-4">
                <p className="whitespace-normal">Are you sure you want to save all selected tags?</p>
              </div>
            </ItemMenu>
          )}
        </>
      )}
    </div>
  );
};
