import React, { useEffect, useMemo, useState } from "react";
import { useStorage } from "../../../Contexts";
import { Avatar, Button } from "@mui/material";
import "react-medium-image-zoom/dist/styles.css";
import { deleteComment, updateComment } from "../../../Services/API/ApiComment";
import { toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";
import { PreviewImageModal } from "../../Modals/PreviewImageModal";
import { useListBoardContext } from "../../../Pages/ListBoard/ListBoardContext";
import { formatDate } from "../WriteComment/helpers/formatDate";
import { TextEditor } from "../../TextEditor/TextEditor";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../../Loading";

export const CardComments = ({ item }) => {
  const queryClient = useQueryClient();
  const { idBoard } = useParams();
  const { setPostUploadedFiles } = useListBoardContext();
  const [loading, setLoading] = useState(false);
  const { userData } = useStorage();

  const [openImagePreview, setOpenImagePreview] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const cardId = localStorage.getItem("cardId");

  const method = useForm({
    defaultValues: {
      content: item.content || ""
    }
  });
  const { setValue, watch, handleSubmit } = method;

  useEffect(() => {
    setValue("content", item.content);
    // eslint-disable-next-line
  }, [item.content]);

  // const handleImageClick = (url) => {
  //   console.log("url", url);
  //   setValue("selectedImgUrl", url);
  //   setOpenImagePreview(true);
  // };

  const handleUpdateComment = async (data, e) => {
    e.preventDefault();
    const { content } = data;
    setLoading(true);

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img");
    const imageUrls = Array.from(images).map((img) => img.src);

    const params = {
      content: content,
      files: imageUrls,
      cardId: cardId
    };

    try {
      const response = await updateComment(idBoard, item.id, params);
      const newComment = response.data;
      setValue("content", newComment.content);
      setPostUploadedFiles((prev) => [...prev, ...newComment.files]);
    } catch (err) {
      toast.error("Cannot Update comment");
      console.error("Comment error: ", err);
    } finally {
      setCanEdit(false);
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(idBoard, commentId);
      queryClient.invalidateQueries(["GET_CARD_COMMENT", cardId]);
      toast.success("Deleted comment successfully!");
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleCloseImageClick = () => {
    setOpenImagePreview(false);
    setValue("selectedImgUrl", "");
  };

  const renderContent = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(item.content, "text/html");
    const images = doc.querySelectorAll("img");

    images.forEach((img) => {
      img.style.cursor = "pointer";
      img.onclick = () => {
        setValue("selectedImgUrl", img.src);
        setOpenImagePreview(true);
      };
    });

    return { __html: doc.body.innerHTML };
    // eslint-disable-next-line
  }, [item.content]);

  return (
    <FormProvider {...method}>
      <div className="flex p-4 my-4 gap-4 rounded-md bg-gray-50" key={item.id}>
        <Avatar
          sx={{ width: "30px", height: "30px" }}
          src={userData?.avatarUrl}
        >
          {userData?.name[0] || " "}
        </Avatar>
        <div className="w-full">
          <div className="flex items-center w-full mb-4">
            <span className="mr-4 text-[14px] font-medium">
              {userData.name}
            </span>
            <p className="text-[14px] font-normal text-gray-500">
              Created {formatDate(item.createdAt)}
            </p>
          </div>
          <form onSubmit={handleSubmit(handleUpdateComment)}>
            {canEdit ? (
              <>
                <TextEditor
                  value={watch("content")}
                  onChange={(value) => {
                    setValue("content", value);
                  }}
                  loading={loading}
                  setLoading={setLoading}
                  placeholder="Write your message..."
                />
                <div className="flex items-center justify-between mt-2">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ textTransform: "none" }}
                    disabled={!watch("content") || loading}
                  >
                    Save
                  </Button>
                  <div className="ml-4"></div>
                  <Button
                    onClick={() => setCanEdit(false)}
                    size="small"
                    sx={{ textTransform: "none" }}
                    className="text-white bg-blue-500 hover:bg-blue-500 hover:text-white px-1"
                  >
                    Discard Change
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div
                  dangerouslySetInnerHTML={renderContent}
                  className="p-3 my-2 w-full  bg-white border border-gray-300 rounded-md max-w-[400px] break-words"
                />
                <div className="flex mt-2 space-x-4 text-sm text-gray-500">
                  <button
                    onClick={() => setCanEdit(true)}
                    className="hover:underline"
                  >
                    Edit
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => handleDeleteComment(item.id)}
                    type="button"
                    className="hover:underline hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      {!userData ||
        (loading && <Loading className="bg-white bg-opacity-10 z-1" />)}
      {
        <PreviewImageModal
          open={openImagePreview}
          handleCloseImageClick={handleCloseImageClick}
        />
      }
    </FormProvider>
  );
};
