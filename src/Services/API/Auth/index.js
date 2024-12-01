import request from "../request";

export const SignIn = async (email, password) => {
  try {
    const res = await request.post("/auth/signin", {
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const SignUp = async (userName, email, password) => {
  try {
    const res = await request.post("/auth/signup", {
      name: userName,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export async function getProfile() {
  try {
    const res = await request.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function requestForgotPassowrd(email) {
  const response = await request.get(`/auth/forgot-password/${email}`);
  return response?.data;
}

export async function resetPassowrd({ email, token, password }) {
  const response = await request.post(`/auth/reset-password`, {
    email: email,
    resetPasswordToken: token,
    password: password,
  });
  return response?.data;
}
