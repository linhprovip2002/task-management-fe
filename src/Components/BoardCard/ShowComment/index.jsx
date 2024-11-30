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
import { EQueryKeys } from "../../../constants";
import { useGetBoardPermission } from "../../../Hooks/useBoardPermission";

export const CardComments = ({ item }) => {
  const queryClient = useQueryClient();
  const { idBoard } = useParams();
  const { setPostUploadedFiles } = useListBoardContext();
  const { getCommentPermissionByUser } = useGetBoardPermission();
  const { userData } = useStorage();

  const [loading, setLoading] = useState(false);
  const [openImagePreview, setOpenImagePreview] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const cardId = +localStorage.getItem("cardId");

  const method = useForm({
    defaultValues: {
      content: item.content || "",
    },
  });
  const { setValue, watch, handleSubmit } = method;

  useEffect(() => {
    setValue("content", item.content);
    // eslint-disable-next-line
  }, [item.content]);

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
      cardId: cardId,
    };

    try {
      const response = await updateComment(idBoard, item.id, params);
      const newComment = response.data;
      setValue("content", newComment.content);
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_CARD_COMMENT],
      });
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
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_CARD_COMMENT],
      });
      toast.success("Deleted comment successfully!");
    } catch (err) {
      toast.error("Cannot delete comment");
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

    images.forEach((img, index) => {
      img.setAttribute("data-index", index.toString());
      img.style.cursor = "pointer";
    });

    return { __html: doc.body.innerHTML };
    // eslint-disable-next-line
  }, [item.content]);

  const handleImageClick = (event) => {
    const target = event.target;
    console.log("target", target.tagName.src);
    if (target.tagName === "IMG" && target.dataset.index) {
      setValue("selectedImgUrl", target.src);
      setOpenImagePreview(true);
    }
  };
  console.log();
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
                  onClick={handleImageClick}
                  className="p-3 my-2 w-full  bg-white border border-gray-300 rounded-md max-w-[400px] break-words"
                />
                <div className="flex mt-2 space-x-4 text-sm text-gray-500">
                  {getCommentPermissionByUser("update") && (
                    <button
                      onClick={() => setCanEdit(true)}
                      className="hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  {getCommentPermissionByUser("delete") && (
                    <>
                      <span>•</span>
                      <button
                        onClick={() => handleDeleteComment(item.id)}
                        type="button"
                        className="hover:underline hover:text-red-500"
                      >
                        Delete
                      </button>
                    </>
                  )}
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
