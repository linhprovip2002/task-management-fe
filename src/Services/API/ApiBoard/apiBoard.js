import request from "../request";

export async function createBoard(boardData) {
  try {
    const response = await request.post("/board", boardData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function getWorkspaceById(id) {
  return request.get(`/workspace/${id}`);
}

// get All board
export async function getBoard(options) {
  try {
    const response = await request.get(`/board`, {
      params: {
        ...options,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBoardById(boardId) {
  try {
    const response = await request.get(`/board/${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBoardId(boardId) {
  try {
    const response = await request.delete(`/board/${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllMembersByIdBoard(boardId) {
  return await request.get(`/board/${boardId}/members`);
}

export async function updateMemberRole(boardId, userId, roleId) {
  return await request.put(`/board/${boardId}/members`, {
    userId,
    roleId,
  });
}

export async function getAllTagByIdBoard(boardId) {
  return await request.get(`/board/${boardId}/tag`);
}

export async function AddTagInCard(boardId, cardId, tagId) {
  return await request.post(`/board/${boardId}/tag/assign`, {
    cardId: cardId,
    tagId: tagId,
  });
}

export async function RemoveTagInCard(boardId, cardId, tagId) {
  return await request.delete(`/board/${boardId}/tag/remove-on-card`, {
    data: {
      cardId: cardId,
      tagId: tagId,
    },
  });
}

export async function leaveBoard(boardId) {
  return await request.delete(`/board/${boardId}/members`);
}

export async function removeMember(userId, boardId) {
  return await request.delete(`/board/${boardId}/members/${userId}`);
}

export async function addMemberIntoBoard(userId, boardId) {
  return await request.post(`/board/${boardId}/members`, {
    userId: userId,
    roleId: 3,
  });
}
export async function updateBoard(boardId, data) {
  return await request.patch(`/board/${boardId}`, data);
}

export async function getActivities({ boardId, page, perPage }) {
  const response = await request.get(
    `/board/${boardId}/activities?page=${page}&limit=${perPage}`,
  );
  return response?.data;
}

export async function getArchivedBoards(workspaceId) {
  const response = await request.get(`board/archived/${workspaceId}`);
  return response?.data;
}

export async function reOpenBoard(boardId) {
  const response = await request.post(`/board/${boardId}/reopen`);
  return response?.data;
}

export async function destroyBoard(boardId) {
  const response = await request.delete(`/board/${boardId}/destroy`);
  return response?.data;
}
