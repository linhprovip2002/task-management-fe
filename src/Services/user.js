import request from "./API/request";

const baseURL = "http://localhost:3001/api/user";

class UserServices {
  createUser(userData) {}

  async getUser({ limit, page, name }) {
    const response = await request({
      method: "GET",
      baseURL,
      params: {
        ...(limit && { limit }),
        ...(page && { page }),
        ...(name && { name })
      }
    });
    return response.data;
  }

  // Method to get a user by ID
  async getUserById(id) {
    const response = await request({
      method: "GET",
      baseURL,
      params: {
        ...(id && { id })
      }
    });
    return response.data;
  }

  // Method to update a user by ID
  updateUser(userId, updatedData) {}

  // Method to delete a user by ID
  deleteUser(userId) {}
}

const userServices = new UserServices();

export default userServices;
