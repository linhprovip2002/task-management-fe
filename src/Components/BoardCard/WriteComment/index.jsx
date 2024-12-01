import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { useStorage } from "../../../Contexts";
import { useGetCardById } from "../../../Hooks";
import { TextEditor } from "../../TextEditor/TextEditor";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { postComment } from "../../../Services/API/ApiComment";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryKeys } from "../../../constants";
import { stringAvatar } from "../../../Utils/color";
import { useGetBoardPermission } from "../../../Hooks/useBoardPermission";

const WriteComment = () => {
  const queryClient = useQueryClient();
  const { idBoard } = useParams();
  const { userData } = useStorage();
  const { getCommentPermissionByUser } = useGetBoardPermission();

  const method = useForm();
  const { setValue, handleSubmit, reset, watch } = method;

  const textEditorRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardId = localStorage.getItem("cardId");
  const { data: dataCard } = useGetCardById(idBoard, cardId);

  useEffect(() => {
    if (isEditMode && textEditorRef.current) {
      textEditorRef.current.focus();
    }
  }, [isEditMode]);

  const handleFocus = () => {
    setIsEditMode(true);
  };

  const handlePostComment = async (data, e) => {
    e.preventDefault();
    const { content } = data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img");
    const imageUrls = Array.from(images).map((img) => img.src);
    const params = {
      content: content,
      files: imageUrls,
      cardId: dataCard.id,
    };

    try {
      setLoading(true);
      await postComment(idBoard, params);
      reset();

      queryClient.invalidateQueries([EQueryKeys.GET_CARD_COMMENT, cardId]);
    } catch (err) {
      toast.error("Cannot create comment");
      console.error("Lỗi khi đăng comment:", err);
    } finally {
      setLoading(false);
    }
  };

  return getCommentPermissionByUser("create") ? (
    <form
      className="flex justify-between mr-2"
      onSubmit={handleSubmit(handlePostComment)}
    >
      {loading && <Loading className="bg-white bg-opacity-10 z-1" />}
      <Avatar
        {...stringAvatar(userData?.name)}
        alt={userData?.name}
        src={userData?.avatarUrl || ""}
      />
      <div className="ml-4">
        <div className="border-gray-300 rounded-sm ">
          <div className="w-[428px] h-full">
            {isEditMode ? (
              <TextEditor
                ref={textEditorRef}
                value={watch("content")}
                onChange={(value) => {
                  setValue("content", value);
                }}
                loading={loading}
                setLoading={setLoading}
                placeholder="Write your message..."
              />
            ) : (
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                label="Write a comment..."
                variant="outlined"
                onFocus={handleFocus}
              />
            )}
          </div>
        </div>

        <div className="flex items-center mt-2">
          {isEditMode && (
            <div className="flex items-center justify-between">
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
              {/* <Button
                onClick={handleCloseComment}
                className="text-white bg-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Discard Change
              </Button> */}
            </div>
          )}
        </div>
      </div>
    </form>
  ) : (
    <></>
  );
};

export default WriteComment;
