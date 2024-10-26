import request from "../request"

// upload 1 file
export function apiUploadFile(formData) {
  return request.post('upload/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

//upload multi file
export function apiUploadMultiFile(formData) {
  return request.post('upload/multiple-files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}