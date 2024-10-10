import request from "./API/request";

const baseURL = "http://localhost:3001/api/workspace";

class WorkspaceServices {
  async createWorkspace(workspaceData) {
    const response = await request({
      method: "POST",
      baseURL,
      
      data: JSON.stringify(workspaceData)
    });
    return response.data;
  }

  async getWorkspaceByUser({ limit, page }) {
    const response = await request({
      method: "GET",
      baseURL,
      params: {
        ...(limit && { limit }),
        ...(page && { page })
      }
    });
    return response.data;
  }

  // Method to get a Workspace by ID
  async getWorkspaceById(id) {
    const response = await request({
      method: "GET",
      baseURL,
      params: {
        ...(id && { id })
      }
    });
    return response.data;
  }

  // Method to update a Workspace by ID
  updateWorkspace(workspaceId, updatedData) {}

  // Method to delete a Workspace by ID
  deleteWorkspace(workspaceId) {}
}

const workspaceServices = new WorkspaceServices();

export default workspaceServices;