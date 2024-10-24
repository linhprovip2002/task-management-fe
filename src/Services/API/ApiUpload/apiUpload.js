import request from "../request"

export function uploadFile(formData) {
  return request.post('upload/file', formData);
}