import request from "./API/request";

const baseURL = process.env.REACT_APP_API_URL + "/user";

class UserServices {
  createUser(userData) {}

  async getUser({ limit, page, name }) {
    const response = await request({
      method: "GET",
      baseURL,
      params: {
        ...(limit && { limit }),
        ...(page && { page }),
        ...(name && { name }),
      },
    });
    return response.data;
  }

  // Method to get a user by ID
  async getUserById(id) {
    const response = await request({
      method: "GET",
      baseURL: `${baseURL}/${id}`,
    });
    return response.data;
  }

  // Method to update a user by ID
  async updateUser({ name, bio, avatarUrl }) {
    try {
      // Lọc các giá trị undefined
      const body = Object.fromEntries(
        Object.entries({ name, bio, avatarUrl }).filter(([_, value]) => value !== undefined),
      );

      const response = await request.patch(`/auth/me`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Method to delete a user by ID
  deleteUser(userId) {}

  async searchUser(searchValue) {
    return await request.get(`/user?search=${searchValue}`);
  }
}

const userServices = new UserServices();

export default userServices;
