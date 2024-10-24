import request from "../request";

export async function createCardByIdList(dataCard) {
  try {
    const response = await request.post(`/card`, dataCard);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCardByIdList(id) {
  return await request.get(`/board/{boardId}/list/${id}/cards`);
}

export async function getAllUserByIdCard(id) {
  return await request.get(`/card/${id}/members`);
}
