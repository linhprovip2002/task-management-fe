import request from "../request";

export async function getWorkSpace({ limit = 10, page = 1 } = {}) {
  try {
    const response = await request.get(`/workspace`, {
      params: { limit, page }
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}