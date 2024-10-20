import request from "../request";

export async function getListByBoardID(id) {
  const response = await request.get(`/board/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response?.data;
}

export async function CreateList(newData) {
  const response = await request.post(`/list`, newData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response?.data;
}
