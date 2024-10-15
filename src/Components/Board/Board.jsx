import React from 'react';

export const Board = ({ board }) => {
  return (
    <>
      <div className="w-40 h-20 border-blue-300 bg-slate-200 hover:brightness-95 hover:cursor-pointer">
        <div
          className="w-[12rem] rounded-lg h-[110px] flex justify-center"
          style={{
            backgroundColor: board.backgroundColor, // Áp dụng màu nền đã chọn
          }}
        >
          <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="svg" width="186" height="103" />
        </div>
      </div>
    </>
  );
};
