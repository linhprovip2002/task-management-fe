import React from 'react';

export const Board = ({ board }) => {
  return (
    <>
      <div className="w-[12rem] h-[110px] rounded-lg border-blue-300 bg-slate-200 hover:brightness-95 brightness-80 hover:cursor-pointer">
        <div
          className="w-[12rem] rounded-lg h-[110px]"
          style={{
            backgroundColor: board.backgroundColor, // Áp dụng màu nền đã chọn
            backgroundImage: board.coverUrl ? `url(${board.coverUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        >
          {/* <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="svg" width="186" height="103" /> */}
          <p className='justify-start p-2 ml-1 font-bold text-white flext text-md'>{board.title}</p>
        </div>
      </div>
    </>
  );
};
