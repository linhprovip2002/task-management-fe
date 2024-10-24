import React from "react";

function ItemMember({ item, onHandleAddMember }) {
  return (
    <div
      onClick={() => onHandleAddMember(item)}
      className="flex items-center justify-between cursor-pointer px-1 py-2 bg-white rounded transition duration-200 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] px-3 mr-1 font-bold text-white text-[12px] bg-gradient-to-b from-green-400 to-blue-500">
          PQ
        </div>
        <div>{item.name}</div>
      </div>
    </div>
  );
}

export default React.memo(ItemMember);
