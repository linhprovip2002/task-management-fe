import React, { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Calendar from "../../Calendar/index";
import { updateCard } from "../../../Services/API/ApiCard";
import ClickAway from "../ClickAway";
import { getCurrentDate, getCurrentTime } from "../WriteComment/helpers/formatDate";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryKeys } from "../../../constants";
import { useParams } from "react-router-dom";

function CalendarPopper({ position, handleCloseShowMenuBtnCard, setEndDateCheck, dataCard }) {
  const queryClient = useQueryClient();
  const { idBoard } = useParams();
  const [startDate, setStartDate] = useState("NNNN/T/N");
  const [isChecked, setIsChecked] = useState(false);
  const [expirationDate, setExpirationDate] = useState(() => {
    if (dataCard.endDate) {
      const dateObj = new Date(dataCard.endDate);
      const date = dateObj.toISOString().split("T")[0];
      return date;
    } else {
      return getCurrentDate();
    }
  });
  const [previousDate, setPreviousDate] = useState(getCurrentDate());
  const [expirationTime, setExpirationTime] = useState(() => {
    if (dataCard.endDate) {
      const dateObj = new Date(dataCard.endDate);
      const date = dateObj.toISOString().split("T")[1].slice(0, 5);
      return date;
    } else {
      return getCurrentTime();
    }
  });
  const [previousTime, setPreviousTime] = useState(getCurrentTime());

  const handleChangeDay = useCallback((choosedDay) => {
    setExpirationDate(choosedDay);
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleChangeTime = (e) => {
    const newTime = e.target.value;
    setExpirationTime(newTime);
  };

  const handleChangeDateExp = (e) => {
    const newDate = e.target.value;
    setExpirationDate(newDate);
  };

  const handleBlurTime = () => {
    const timePattern = /^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/;

    if (timePattern.test(expirationTime)) {
      setPreviousTime(expirationTime);
    } else {
      setExpirationTime(previousTime);
    }
  };

  const handleBlurDateExp = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (datePattern.test(expirationDate)) {
      setPreviousDate(expirationDate);
    } else {
      setExpirationDate(previousDate);
    }
  };

  const handleSaveExpirationDate = async () => {
    try {
      handleCloseShowMenuBtnCard();
      const month = expirationDate.split("-")[1];
      const day = expirationDate.split("-")[2];
      const [hours, minutes] = expirationTime.split(":");
      const data = {
        startDate: dataCard.startDate,
        endDate: `${expirationDate}T${expirationTime}`,
        // listId: dataList.id
      };
      setEndDateCheck(`${hours}:${minutes} ${day}thg${month}`);
      const res = await updateCard(idBoard, dataCard.id, data);
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_CARD_BY_ID, dataCard.id],
      });
      return res;
    } catch (error) {
      setEndDateCheck(null);
      console.error("Error setup expiration date in card detail: ", error);
    }
  };

  const handleRemoveExpirationDate = async () => {
    try {
      handleCloseShowMenuBtnCard();

      const data = {
        startDate: dataCard.startDate,
        endDate: null,
      };
      setEndDateCheck(data.endDate);
      const res = await updateCard(idBoard, dataCard.id, data);
      return res;
    } catch (error) {
      console.error("Error setup expiration date in card detail: ", error);
    }
  };

  const handleClickAway = () => {
    handleCloseShowMenuBtnCard();
  };

  return (
    <ClickAway onClickAway={handleClickAway}>
      <div
        style={{ top: position.top - 200, left: position.left }}
        className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-50 shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
      >
        <div className="p-2 mx-8 text-center">Day</div>
        <div
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#fff6 #00000026",
            overflowY: "auto",
            maxHeight: "400px",
          }}
          className="px-2"
        >
          <div className="px-1 py-2">
            <Calendar onChange={handleChangeDay} />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Start date</label>
              <div className="flex items-center justifyContent-center my-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="block p-2 mr-2 rounded-md shadow-sm"
                />
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 ${isChecked ? "" : "opacity-50 cursor-not-allowed"}`}
                  disabled={!isChecked}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Expiration date</label>
              <div className="flex items-center justifyContent-center my-2">
                <input
                  type="text"
                  value={expirationDate}
                  onChange={(e) => handleChangeDateExp(e)}
                  onBlur={handleBlurDateExp}
                  className="block w-full mx-1 p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={expirationTime}
                  onChange={(e) => handleChangeTime(e)}
                  onBlur={handleBlurTime}
                  className="block w-full mx-1 p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <button
              onClick={handleSaveExpirationDate}
              className="w-full mb-2 px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded hover:bg-green-500 transition-all duration-0.3s"
            >
              Save
            </button>
            <button
              onClick={handleRemoveExpirationDate}
              className="w-full mb-2 px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-700 transition-all duration-0.3s"
            >
              Remove
            </button>
          </div>
          <CloseIcon
            onClick={handleCloseShowMenuBtnCard}
            className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100"
          />
        </div>
      </div>
    </ClickAway>
  );
}

export default React.memo(CalendarPopper);
