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

export async function getBoard({ limit = 10, page = 1 } = {}) {
  try {
    const response = await request.get(`/board`, {
      params: { limit, page },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
}
