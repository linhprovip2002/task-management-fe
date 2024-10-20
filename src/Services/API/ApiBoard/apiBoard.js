import request from '../request';

export async function createBoard(boardData) {
  try {
    const response = await request.post('/board', boardData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// get All board
export function getBoard(limit, page) {
  return request.get(`/board?limit=${limit}&page=${page}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// trả về danh sách board theo workspaceId
export function getWorkspaceById(id) {
  return request.get(`/workspace/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// get board theo id
export async function getBoardId(id) {
  return request.get(`/board/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// delete board theo di 
export async function deleteBoardId(id) {
  return request.delete(`/board/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}