import request from "../request";

export async function createBoard(boardData) {
  try {
    console.log('in bbbbbbb', boardData);
    const response = await request.post("/board", boardData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('in', response.data);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBoard({ limit = 10, page = 1 } = {}) {
  try {
    const response = await request.get(`/board`, {
      params: { limit, page }
    });
    console.log('in ra danh sach board', response.data.data);
    
    return response.data.data;
  } catch (error) {
    throw error;
  }
}