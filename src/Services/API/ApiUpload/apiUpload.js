import request from "../request";

// upload 1 file
export function apiUploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  return request.post("upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//upload multi file
export function apiUploadMultiFile(formData) {
  return request.post("upload/multiple-files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// api assign file, get file
export function apiAssignFile(id, boardId, urls) {
  return request.post(`board/${boardId}/card/${id}/attach-file`, {
    urls: urls,
  });
}

//delete file id
export function apiDeleteFile(boardId, id, fileId) {
  return request.delete(`/board/${boardId}/card/${id}/delete-file/${fileId}`);
}
