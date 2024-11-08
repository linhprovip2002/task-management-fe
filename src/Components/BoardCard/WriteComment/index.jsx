import React, { useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { useStorage } from "../../../Contexts";
import { useGetUserProfile } from "../../../Hooks";
import { Editor } from "@tinymce/tinymce-react";
// import tinymce from 'tinymce/tinymce';

const WriteComment = ({
  content,
  setContent,
  loading,
  handlePostComment,
  upFileComment = [],
  setUpFileComment,
  handleFileCommentChange,
  setEditorInstance,
}) => {
  const { userData, isLoggedIn } = useStorage();
  const { userProfile } = useGetUserProfile(isLoggedIn);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleEditorChange = (content) => {
    setContent(content);
  };

  return (
    <div>
      <div className="flex justify-between mr-2">
        {userData?.avatarUrl ? (
          <Avatar sx={{ width: "30px", height: "30px" }} alt={userData?.name} src={userData?.avatarUrl} />
        ) : (
          <div className="flex items-center justify-center bg-orange-400 rounded-full w-9 h-9">
            {userProfile?.name[0] || " "}
          </div>
        )}
        <div className="ml-4">
          <div className="border-gray-300 rounded-sm ">
            <div className="w-[428px] h-full">
              {isFocused ? (
                <Editor
                  apiKey="qibz0pdsl3j3pwij2g3sw1414jdo15snwf06ohs4j3rolood"
                  value={content}
                  init={{
                    // automatic_uploads: true,
                    images_upload_url:"https://api-task-management-production.up.railway.app/api/upload/file",
                    height: 220,
                    width: "100%",
                    menubar: false,
                    forced_root_block: false,
                    referrer_policy: 'origin',
                    plugins: [
                      'advlist', // Advanced list plugin
                      'autolink', // Automatic linking plugin
                      'lists', // List plugin
                      'link', // Link plugin
                      'image', // Image plugin
                    ],
                    // file_picker_callback: (cb, value, meta) => {
                    //   const input = document.createElement('input');
                    //   input.setAttribute('type', 'file');
                    //   input.setAttribute('accept', 'image/*');
                  
                    //   input.addEventListener('change', (e) => {
                    //     const file = e.target.files[0];
                  
                    //     const reader = new FileReader();
                    //     reader.addEventListener('load', () => {
                    //       const id = 'blobid' + (new Date()).getTime();
                    //       const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                    //       const base64 = reader.result.split(',')[1];
                    //       const blobInfo = blobCache.create(id, file, base64);
                    //       blobCache.add(blobInfo);
                  
                    //       cb(blobInfo.blobUri(), { title: file.name });
                    //     });
                    //     reader.readAsDataURL(file);
                    //   });
                  
                    //   input.click();
                    // },
                    toolbar:
                      "undo redo bold italic alignleft aligncenter alignright | link image media | selectfile",

                  }}
                  onEditorChange={handleEditorChange}
                  onFocus={handleFocus}
                />
              ) : (
                <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                size="medium"
                label="Write a comment..."
                variant="outlined"
                onFocus={handleFocus}
              />
              )}
            </div>
          </div>

          <div className="mt-2">
            {isFocused && (
              <Button
                onClick={handlePostComment}
                variant="contained"
                color="primary"
                disabled={!content}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;
