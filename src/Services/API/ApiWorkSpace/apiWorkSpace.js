import request from "../request";

export async function getWorkSpace({ limit = 10, page = 1 } = {}) {
  try {
    const response = await request.get(`/workspace`, {
      params: { limit, page },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getWorkspaceById(id) {
  try {
    const response = await request.get(`/workspace/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateWorkspace({ id, title, description }) {
  try {
    const response = await request.patch(`/workspace/${id}`, {
      title,
      description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteWorkspace(id) {
  try {
    const response = await request.delete(`/workspace/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}