import request from "../request";

export async function getListByBoardID(id) {
  try {
    const response = await request.get(`/board/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function CreateList(newData) {
  try {
    const response = await request.post(`/list`, newData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
