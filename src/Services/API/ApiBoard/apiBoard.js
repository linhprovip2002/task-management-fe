import request from "../request";

export async function createBoard(boardData) {
  try {
    const response = await request.post("/board", boardData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// get All board
export async function getBoard(limit, page) {
  try {
    const response = await request.get(`/board?limit=${limit}&page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get board theo id
export async function getBoardId(id) {
  try {
    const response = await request.get(`/board/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("board id: " + response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete board theo di
export async function deleteBoardId(id) {
  try {
    const response = await request.delete(`/board/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
