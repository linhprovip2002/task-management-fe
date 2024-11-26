import axios from "axios";
import Cookies from "js-cookie";

export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refreshToken") || "";
  try {
    const response = await axios.get(`${'https://api-task-management-production.up.railway.app/api'}/auth/refresh`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    Cookies.set("authToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    console.error("Unable to refresh token", error);
    return null;
  }
};
