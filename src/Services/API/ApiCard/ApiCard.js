import request from "../request";

export async function createCardByIdList(dataCard) {
  try {
    const response = await request.post(`/card`, dataCard, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCardByIdList(id) {
  try {
    const response = await request.get(`/list/${id}/cards`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
