import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { updateBoard } from "../../Services/API/ApiBoard/apiBoard";

export const Board = ({ board }) => {
  const [isFavorite, setIsFavorite] = useState(board.isFavorite);
  const [open, setOpen] = useState(false);
  const { id: workspaceId } = useParams();

  const getStar = useMemo(() => {
    return isFavorite ? (
      <StarIcon fontSize="small" />
    ) : (
      <StarBorderIcon fontSize="small" />
    );
  }, [isFavorite]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    await updateBoard(board.id, { ...board, isFavorite: !isFavorite });
    // handle toggle favorite
  };

  return (
    <>
      <Link
        to={`/workspace/${workspaceId}/board/${board.id}`}
        className="relative w-[12rem] h-[110px] rounded-lg hover:brightness-95 brightness-80 hover:cursor-pointer"
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <>
          <div
            className="w-full h-full rounded-lg"
            style={{
              backgroundColor: board.backgroundColor,
              backgroundImage: board.coverUrl
                ? `url(${board.coverUrl})`
                : "none",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center"
            }}
          >
            <p className="justify-start p-2 ml-1 font-bold text-white flext text-md">
              {board.title}
            </p>
          </div>
          {(open || isFavorite) && (
            <div className="absolute inset-0 bg-white bg-opacity-10 z-10">
              <div
                className="absolute bottom-2 right-2 text-yellow-400"
                onClick={handleToggleFavorite}
              >
                {getStar}
              </div>
            </div>
          )}
        </>
      </Link>
    </>
  );
};
