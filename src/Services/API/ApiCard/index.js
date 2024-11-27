import request from "../request";

export async function createCardByIdList(boardId, dataCard) {
  try {
    const response = await request.post(`/board/${boardId}/card`, dataCard);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCardByList(id, boardId) {
  return await request.get(`/board/${boardId}/list/${id}/cards`);
}

export function getCardById(boardId, id) {
  return request.get(`board/${boardId}/card/${id}`);
}

export async function getAllUserByIdCard(id) {
  return await request.get(`/card/${id}/members`);
}

export async function updateCard(boardId, id, data) {
  return await request.patch(`board/${boardId}/card/${id}`, data);
}

export async function deleteCard(boardId, cardId) {
  try {
    const response = await request.delete(`/board/${boardId}/card/${cardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function JoinToCard(idCard, idUser, boardId) {
  return await request.post(`/board/${boardId}/card/${idCard}/assign`, {
    userId: idUser,
  });
}

export async function RemoveUserToCard(boardId, idCard, idUser) {
  return await request.delete(`/board/${boardId}/card/${idCard}/members/${idUser}`);
}

export async function changePositionCard({ cardId, overListId, position, boardId }) {
  const response = await request.post(`/board/${boardId}/card/${cardId}/move`, {
    listId2: overListId,
    position,
  });
  return response?.data;
}

export async function getArchivedCards(boardId) {
  const response = await request.get(`/board/${boardId}/cards/archived`);
  return response?.data;
}

export async function destroyCard(cardId) {
  const response = await request.delete(`/card/${cardId}/destroy`);
  return response?.data;
}

export async function resendCard(cardId, boardId) {
  const response = await request.patch(`/board/${boardId}/card/${cardId}/restore`);
  return response?.data;
}
