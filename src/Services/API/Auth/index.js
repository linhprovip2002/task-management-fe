import request from '../request';

export const Signin = async (email, password) => {
  try {
    const res = await request.post('/auth/signin', { email: email, password: password });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const Signup = async (userName, email, password) => {
  try {
    const res = await request.post('/auth/signup', {
      name: userName,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
