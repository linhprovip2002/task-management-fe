import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { ButtonBoardCard } from "../ButtonBoardCard";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return daysArray;
  };

  const daysArray = getDaysInMonth(currentDate);

  const monthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <ButtonBoardCard
          className={"w-[18px] h-[24px] hover:bg-gray-300 justify-center"}
          isActive={true}
          onHandleEvent={handlePrevMonth}
        >
          <KeyboardArrowLeftIcon />
        </ButtonBoardCard>
        <span className="text-xl font-bold">{monthYear}</span>
        <ButtonBoardCard
          className={"w-[18px] h-[24px] hover:bg-gray-300 justify-center"}
          isActive={true}
          onHandleEvent={handleNextMonth}
        >
          <ChevronRightIcon />
        </ButtonBoardCard>
      </div>

      <div className="grid grid-cols-7 gap-2">
        <div className="font-bold text-center">Sun</div>
        <div className="font-bold text-center">Mon</div>
        <div className="font-bold text-center">Tue</div>
        <div className="font-bold text-center">Wed</div>
        <div className="font-bold text-center">Thu</div>
        <div className="font-bold text-center">Fri</div>
        <div className="font-bold text-center">Sat</div>

        {daysArray.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center px-3 py-1 hover:bg-gray-200 rounded-[2px] cursor-pointer"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
