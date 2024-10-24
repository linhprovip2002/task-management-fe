import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getBoard, getBoardId } from "../../Services/API/ApiBoard/apiBoard";
import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";

function DropItemChoose({ info, itemChooseToMove, data, position, onChoose }) {
  let { dataBoard } = useListBoardContext();

  const [dataAllBoard, setDataAllBoard] = useState([]);
  const [dataPosiontionBoard, setDataPosiontionBoard] = useState([]);
  const [choosedBoard, setchoosedBoard] = useState(dataBoard?.id);
  const [titleBoard, setTitleBoard] = useState(dataBoard?.title);
  const [positionBoard, setpositionBoard] = useState(data?.position);

  const handleChooseMoveList = (e) => {
    itemChooseToMove = itemChooseToMove.map((item) => {
      if (item.id === info.id) {
        return (item.isShow = !item.isShow);
      } else {
        return (item.isShow = false);
      }
    });
    if (onChoose) {
      onChoose(e);
    }
  };

  const handleActive = (item) => {
    itemChooseToMove = itemChooseToMove.map((chooseMove) => {
      return (chooseMove.isShow = false);
    });
    setchoosedBoard(item.id);
    setTitleBoard(item.title);
  };

  const handleActivePosition = (item) => {
    itemChooseToMove = itemChooseToMove.map((chooseMove) => {
      return (chooseMove.isShow = false);
    });
    setpositionBoard(item.position);
  };

  useEffect(() => {
    const getAllBoard = async () => {
      try {
        const res = await getBoard(50, 1);
        setDataAllBoard(res.data);
      } catch (err) {
        console.error("Error fetching board data: ", err);
      }
    };
    getAllBoard();
  }, []);

  useEffect(() => {
    const getAllPositionByIdBoard = async () => {
      try {
        const res = await getBoardId(choosedBoard);
        setDataPosiontionBoard(res?.lists);
      } catch (err) {
        console.error("Error fetching board data: ", err);
      }
    };
    getAllPositionByIdBoard();
  }, [choosedBoard]);

  return (
    <>
      <div className="mx-2 mt-2 py-1 text-[14px]">{info.title || "No title"}</div>
      <div
        onClick={handleChooseMoveList}
        className={`flex items-center justify-between rounded-[4px] mx-2 p-2 hover:ring-1 hover:ring-gray-500 hover:bg-gray-100 cursor-pointer  active:ring-blue-500`}
      >
        {info.id === 0 && <div className="">{titleBoard}</div>}
        {info.id === 1 && <div className="">{positionBoard}</div>}
        <KeyboardArrowDownIcon fontSize="small" />
      </div>

      {info.isShow && info.id === 0 && (
        <div
          style={{ top: position.top - 170, left: position.left - 480 }}
          className="absolute bottom-[-14] left-2 w-[230px] bg-white rounded-[8px] py-2 font-medium text-[12px] shadow-lg z-50"
        >
          {dataAllBoard.map((item, index) => (
            <div
              key={index}
              onClick={() => handleActive(item)}
              className={`relative p-2 bg-white rounded transition duration-200 after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-blue-500 after:opacity-0 ${choosedBoard === item.id ? "after:opacity-100 hover:bg-blue-100 bg-blue-200 active:after:opacity-100 text-blue-900" : "hover:after:opacity-100 hover:bg-gray-100 active:after:opacity-100"}`}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}

      {info.isShow && info.id === 1 && (
        <div
          style={{ top: position.top - 170, left: position.left - 480 }}
          className="absolute bottom-[-14] left-2 w-[230px] bg-white rounded-[8px] py-2 font-medium text-[12px] shadow-lg z-50"
        >
          {dataPosiontionBoard.map((item, index) => (
            <div
              key={index}
              onClick={() => handleActivePosition(item)}
              className={`relative p-2 bg-white rounded transition duration-200 after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-blue-500 after:opacity-0 ${positionBoard === item.position ? "after:opacity-100 hover:bg-blue-100 bg-blue-200 active:after:opacity-100 text-blue-900" : "hover:after:opacity-100 hover:bg-gray-100 active:after:opacity-100"}`}
            >
              {item.position}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default React.memo(DropItemChoose);
