import axios from 'axios';
import Cookies from 'universal-cookie';

import Singleton from 'lib/singleton';

const axiosInstance = axios.create();
const cookies = new Cookies();

// Request interceptor
axiosInstance.interceptors.request.use(
  (configuration) => {
    const config = configuration;
    const singleton = new Singleton();
    if (singleton.authorization) {
      config.headers.Authorization = `Token ${singleton.authorization}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response.data,
  (error) => {
    if (error.response && error.response.data.detail === 'Invalid token.') {
      const singleton = new Singleton();
      singleton.authorization = null;
      cookies.remove('authToken', { path: '/' });
    }
    return Promise.reject(error.response && error.response.data);
  },
);

export default axiosInstance;
