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

export async function getBoard(limit, page) {
  try {
    const response = await request.get(`/board?limit=${limit}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('phan trang board', response);
    
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
