import request from "../request";

export async function createBoard(boardData) {
  try {
    const response = await request.post("/board", boardData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get All board
export async function getBoard(limit, page) {
  try {
    const response = await request.get(`/board?limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get board theo id
export async function getBoardId(id) {
  try {
    const response = await request.get(`/board/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete board theo di
export async function deleteBoardId(id) {
  try {
    const response = await request.delete(`/board/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function getWorkspaceById(id) {
  return request.get(`/workspace/${id}`);
}
