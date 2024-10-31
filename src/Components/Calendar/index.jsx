import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

// Tùy chỉnh lịch
const CustomDateCalendar = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "4px",
  height: "100%",
  paddingBottom: "16px",
  "& .day": {
    borderRadius: "50%",
    width: "100%",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: theme.palette.common.white,
    transition: "background-color 0.3s ease",
    "&.selected": {
      backgroundColor: "rgba(0, 123, 255, 0.8)",
      color: theme.palette.common.white,
    },
    "&:hover": {
      backgroundColor: "rgba(0, 123, 255, 0.3)",
    },
    "&.not-current-month": {
      backgroundColor: "rgba(128, 128, 128, 0.2)",
      color: "rgba(0, 0, 0, 0.5)",
    },
    "&.today": {
      border: "2px solid rgba(0, 123, 255, 0.5)",
    },
  },
  "& .header": {
    fontWeight: "bold",
    textAlign: "center",
    padding: "8px 0",
  },
}));

const CustomStack = styled("div")(() => ({
  maxHeight: "400px",
  height: "100%",
  width: "100%",
}));

// Tùy chỉnh nút
const CustomButton = styled("button")(({ theme }) => ({
  fontSize: "16px",
  padding: "2px 8px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  backgroundColor: theme.palette.common.white,
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(128, 128, 128, 0.2)",
  },
}));

function Calendar({ onChange }) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    onChange(newValue.format("YYYY-MM-DD"));
  };

  const getDaysInMonth = () => {
    const monthStart = currentDate.startOf("month");
    const monthEnd = currentDate.endOf("month");
    const days = [];

    // Bắt đầu từ ngày đầu tiên của tuần
    let currentDay = monthStart.startOf("week").subtract(-1, "day");

    // Chạy cho đến khi hiện tại vượt quá cuối tuần của tháng
    while (currentDay.isBefore(monthEnd.endOf("week").add(2, "day"), "day")) {
      days.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    return days;
  };

  // Tạo tiêu đề cho các ngày trong tuần
  const renderWeekDaysHeader = () => {
    const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    return (
      <div style={{ display: "contents" }}>
        {weekdays.map((day, index) => (
          <div key={index} className="header">
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ width: "100%" }} components={["DateCalendar"]}>
        <CustomStack sx={{ width: "100%" }}>
          <DemoItem sx={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
              <CustomButton onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}>{"<"}</CustomButton>
              <div>{currentDate.format("MMMM YYYY")}</div>
              <CustomButton onClick={() => setCurrentDate(currentDate.add(1, "month"))}>{">"}</CustomButton>
            </div>

            <CustomDateCalendar>
              {renderWeekDaysHeader()}
              {getDaysInMonth().map((day) => (
                <div
                  key={day.format("YYYY-MM-DD")}
                  className={`day ${day.isSame(selectedDate, "day") ? "selected" : ""} ${
                    !day.isSame(currentDate, "month") ? "not-current-month" : ""
                  } ${day.isSame(dayjs(), "day") ? "today" : ""}`} // Thêm class "today" cho ngày hiện tại
                  onClick={() => {
                    if (!day.isSame(currentDate, "month")) {
                      setCurrentDate(day);
                      setSelectedDate(day);
                    } else {
                      handleDateChange(day);
                    }
                  }}
                >
                  {day.date()}
                </div>
              ))}
            </CustomDateCalendar>
          </DemoItem>
        </CustomStack>
      </DemoContainer>
    </LocalizationProvider>
  );
}

Calendar.propTypes = {
  onChange: PropTypes.func,
};

export default React.memo(Calendar);
