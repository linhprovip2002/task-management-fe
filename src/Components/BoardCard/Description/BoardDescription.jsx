import { useEffect, useState } from "react";
import { TextEditor } from "../../TextEditor/TextEditor";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetBoardById } from "../../../Hooks";
import { updateBoard } from "../../../Services/API/ApiBoard/apiBoard";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryKeys } from "../../../constants";

export const BoardDescription = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  const { idBoard } = useParams();
  const { data: boardData } = useGetBoardById(idBoard);
  const [loading, setLoading] = useState(false);
  // console.log(boardData);
  useEffect(() => {
    if (boardData) setDescription(boardData.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardData?.description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateBoard(idBoard, { description });
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_BOARD_BY_ID],
      });
    } catch (error) {
      toast.error(`Error updating board description`);
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <form className="flex-1 ml-4" onSubmit={handleSubmit}>
      <div className="text-base mb-2">Description</div>
      {isEditing ? (
        <>
          <TextEditor
            loading={loading}
            setLoading={setLoading}
            setIsEditing={setIsEditing}
            value={description}
            onChange={(value) => {
              setDescription(value);
            }}
          />
          <div className="flex items-center justify-between mt-2">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              sx={{ textTransform: "none" }}
              disabled={!description}
            >
              Save
            </Button>
            <div className="ml-4"></div>
            <Button
              onClick={() => setIsEditing(false)}
              size="small"
              sx={{ textTransform: "none" }}
              className="text-white bg-blue-500 hover:bg-blue-500 hover:text-white px-1"
            >
              Discard Change
            </Button>
          </div>
        </>
      ) : (
        <div
          className="bg-gray-200 hover:bg-gray-300 cursor-pointer w-full text-sm mb-2 p-3 rounded-md"
          onClick={() => setIsEditing(true)}
        >
          {description ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            "Add more detailed description..."
          )}
        </div>
      )}
    </form>
  );
};
