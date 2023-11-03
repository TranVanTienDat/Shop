import axios from 'axios';
import queryString from 'query-string';

export const privateClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: {
  //   'content-type': 'application/json',
  //   Authorization: `Bearer ${localStorage.getItem('access')}`,
  // },
  paramsSerializer: (params) => queryString.stringify(params),
});

// privateClient.interceptors.request.use(async (config) => config);

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    },
  };
});

privateClient.interceptors.response.use(
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

export default privateClient;
