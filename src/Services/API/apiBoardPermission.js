import request from "./request";

export const getBoardPermission = async (boardId) => {
  try {
    const response = await request.get(`/board/${boardId}/permission`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateBoardPermission = async (boardId) => {
  try {
    const response = await request.put(`/board/${boardId}/permission`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
