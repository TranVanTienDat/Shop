import axios from 'axios';
const API_AUTH = 'http://localhost:5000/api/auth';
export const createUser = (payload) =>
  axios.post(`${API_AUTH}/user/register`, payload);

export const loginUser = (payload) =>
  axios.post(`${API_AUTH}/user/login`, payload);

export const updateUser = (id, payload) =>
  axios.put(`${API_AUTH}/user/${id}`, payload);

export const updatePassword = (id, payload) =>
  axios.put(`${API_AUTH}/user/password/${id}`, payload);

export const forgotPassword = (payload) =>
  axios.post(`${API_AUTH}/user/forgot-password`, payload);

export const deleteUser = (id) =>
  axios.delete(`${API_AUTH}/user/deleteUser/${id}`);

export const getUserData = async () => {
  const authToken = localStorage.getItem('access');

  if (!authToken) {
    throw new Error('Unauthorized');
  }

  try {
    const response = await axios.get(`${API_AUTH}/user/getAuth`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data.user;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};
