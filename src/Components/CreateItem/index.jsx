import CloseIcon from '@mui/icons-material/Close';

export const CreateItem = ({
  index,
  isList = false,
  descriptionCard,
  nameBtn,
  placeHolderText,
  onAdd,
  onChangeTitle,
  onShow,
}) => {
  return (
    <>
      <div className="flex items-center">
        <input
          autoFocus
          placeholder={placeHolderText}
          type="text"
          onChange={onChangeTitle}
          className={`${isList ? 'outline-gray-500 mt-2' : 'pb-6'} flex-1 max-w-full bg-white rounded-[8px] text-[12px] font-[400] p-2  m-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
      <div className="flex items-center">
        <div
          onClick={() => onAdd({ descriptionCard: descriptionCard }, index)}
          className="max-w-20 px-3 py-2 my-2 ml-1 rounded-[4px] bg-gray-600 hover:bg-gray-700 transition-bg duration-300"
        >
          <span className="text-[14px] font-medium text-white">{nameBtn}</span>
        </div>
        <div className="hover:bg-gray-300 ml-2 p-[8px] rounded-[4px]">
          <CloseIcon onClick={onShow} className=" p-[2px] rounded-[4px]" />
        </div>
      </div>
    </>
  );
};
