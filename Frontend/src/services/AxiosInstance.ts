import axios from 'axios';
import envConfig from '../config';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config
    if (config.url) {
      const token = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
      if (config.url && envConfig.baseUrl) {
        config.url = envConfig.baseUrl + config.url;
      }
      return config;
    } else {
      return Promise.reject('');
    }
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
