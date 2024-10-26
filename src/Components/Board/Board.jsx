import React from "react";
import { Link } from "react-router-dom";

export const Board = ({ board, idWorkSpace }) => {
  return (
    <>
      <Link
        to={`/workspace/${idWorkSpace}/board/${board.id}`}
        className="w-[12rem] h-[110px] rounded-lg border-blue-300 bg-slate-200 hover:brightness-95 brightness-80 hover:cursor-pointer"
      >
        <div
          className="w-[12rem] rounded-lg h-[110px]"
          style={{
            backgroundColor: board.backgroundColor, // Áp dụng màu nền đã chọn
            backgroundImage: board.coverUrl ? `url(${board.coverUrl})` : "none",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <p className="justify-start p-2 ml-1 font-bold text-white flext text-md">{board.title}</p>
        </div>
      </Link>
    </>
  );
};
