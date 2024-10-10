export const ButtonBoardCard = ({ isActive = false, className, nameBtn, children }) => {
  return (
    <div
      className={`${isActive ? className : 'min-w-full'} flex items-center m-1 px-2 py-[6px] bg-gray-200 rounded-[4px] hover:bg-gray-300`}
    >
      {children}
      <div className="text-[14px]">{nameBtn}</div>
    </div>
  );
};
