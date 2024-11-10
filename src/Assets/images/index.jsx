import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";

export const ImageIcon = ({ width = 24, height = 24, className = {} }) => {
  const { dataBoard } = useListBoardContext();

  return (
    <div
      style={{
        backgroundColor: !dataBoard.coverUrl && dataBoard.backgroundColor ? dataBoard.backgroundColor : "transparent",
        backgroundImage: dataBoard.coverUrl
          ? `url(${dataBoard.coverUrl})`
          : dataBoard.backgroundColor
            ? "none"
            : `url(https://trello.com/assets/707f35bc691220846678.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
      }}
      className={`relative ${className}`}
    ></div>
  );
};
