import axios from 'axios';
const API_AUTH = 'http://localhost:5000/api/comment';
export const postComment = async (payload) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    };

    const res = await axios.post(`${API_AUTH}/add-comment`, payload, config);
    return { res };
  } catch (error) {
    return { error };
  }
};

export const getCommentOfProductID = async (productID) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    };

    const res = await axios.get(`${API_AUTH}/get-comment/${productID}`, config);
    return { res };
  } catch (error) {
    return { error };
  }
};
