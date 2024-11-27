import { useEffect, useState } from "react";
import { TextEditor } from "../../TextEditor/TextEditor";
import { Button } from "@mui/material";
import { updateCard } from "../../../Services/API/ApiCard";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCardById } from "../../../Hooks";

export const Description = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  const cardId = localStorage.getItem("cardId");
  const { idBoard } = useParams();
  const { data, refetch } = useGetCardById(idBoard, cardId);

  useEffect(() => {
    if (data) setDescription(data.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.description)]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateCard(idBoard, cardId, { description });
      refetch();
    } catch (error) {
      toast.error("Error updating card description");
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
