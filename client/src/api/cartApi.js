import axios from 'axios';
const API_AUTH = 'http://localhost:5000/api/auth';
export const addCart = async (payload) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    };

    const res = await axios.post(`${API_AUTH}/addCart`, payload, config);
    return { res };
  } catch (error) {
    return { error };
  }
};
export const getCart = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    };

    const res = await axios.get(`${API_AUTH}/get-carts`, config);
    return { res };
  } catch (error) {
    return { error };
  }
};

export const removeCart = async (_id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    };

    const res = await axios.delete(`${API_AUTH}/remote/cart/${_id}`, config);
    return { res };
  } catch (error) {
    return { error };
  }
};

export const orderProduct = async (payload) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    };

    const res = await axios.post(`${API_AUTH}/buy`, payload, config);
    return { res };
  } catch (error) {
    return { error };
  }
};

export const getOrderProducts = async (typeStatus) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    };

    const res = await axios.get(
      `${API_AUTH}/get-order-products?typeStatus=${typeStatus}`,
      config
    );
    return { res };
  } catch (error) {
    return { error };
  }
};

export const cancelOrder = async (payload) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    };

    const res = await axios.put(`${API_AUTH}/cancel-order`, payload, config);
    return { res };
  } catch (error) {
    return { error };
  }
};
