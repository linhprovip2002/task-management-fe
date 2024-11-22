import { useMemo, useState } from "react";
import ReactQuill from "./QuillConfig";
import "react-quill/dist/quill.snow.css";
import { apiUploadFile } from "../../Services/API/ApiUpload/apiUpload";

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image"
];

export const TextEditor = ({ loading, setLoading, ...props }) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "clean", "image"]
        ],
        handlers: {
          image: function () {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files[0];
              if (file) {
                setLoading(true);
                try {
                  const response = await apiUploadFile(file);
                  const url = response.data.location;
                  const range = this.quill.getSelection();
                  this.quill.insertEmbed(range.index, "image", url);
                } catch (error) {
                  console.error("Image upload failed", error);
                } finally {
                  setLoading(false);
                }
              }
            };
          }
        }
      }
    }),
    []
  );

  return (
    <ReactQuill
      readOnly={loading || props.readOnly}
      placeholder="Write something..."
      modules={modules}
      formats={formats}
      theme={props.theme || "snow"}
      {...props}
    />
  );
};
