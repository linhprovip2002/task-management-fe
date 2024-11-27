import CheckIcon from "@mui/icons-material/Check";

export const ButtonBoardCard = ({
  isActive = false,
  isFollowing,
  className,
  nameBtn,
  onHandleEvent,
  item = null,
  children,
}) => {
  return (
    <div
      onClick={onHandleEvent}
      style={{ backgroundColor: item?.color || "", color: item?.color && "#fff" }}
      className={`hover:opacity-90 ${isActive ? className : "min-w-full m-1 bg-gray-200 hover:bg-gray-300"} cursor-pointer flex items-center px-2 py-[6px] rounded-[4px] `}
    >
      {children}
      <div className="text-[14px]">{nameBtn}</div>
      {isFollowing && <CheckIcon className="ml-1" style={{ fontSize: "16px" }} />}
    </div>
  );
};
