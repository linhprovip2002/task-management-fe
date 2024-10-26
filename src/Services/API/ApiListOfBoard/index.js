import request from "../request";

export async function getListByBoardID(id) {
  const response = await request.get(`/board/${id}`);
  return response?.data;
}

export async function CreateList(newData) {
  const response = await request.post(`/board/{boardId}/list`, newData);
  return response?.data;
}
