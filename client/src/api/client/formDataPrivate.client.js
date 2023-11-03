import axios from 'axios';
import queryString from 'query-string';

export const formDatePrivateClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('access')}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

formDatePrivateClient.interceptors.request.use(async (config) => config);

formDatePrivateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default formDatePrivateClient;
