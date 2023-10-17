import axios from 'axios';

const string = 'http://localhost:5000/api/product';
export const getAllProduct = (page, limit) =>
  axios.get(`${string}/getAllProduct?page=${page}&limit=${limit}`);

export const getProductById = (_id) => axios.get(`${string}/${_id}`);

export const getProductFilter = (keyword, price, category, page, limit) =>
  axios.get(
    `${string}/search?keyword=${keyword}&price=${price}&category=${category}&page=${page}&limit=${limit}`
  );

export const getProducts = (keyword, price, category, page, limit) =>
  axios.get(
    `${string}/get-products?keyword=${keyword}&price=${price}&category=${category}&page=${page}&limit=${limit}`
  );

export const getTopProducts = () => axios.get(`${string}/get-top-products`);
export const getCategoriesProduct = (name) =>
  axios.get(`${string}/category?category=${name}`);
