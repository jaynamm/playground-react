import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    // 토큰이 존재한다면
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== '/singin' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const response = await instance.post('리프레시토큰URL', {
            refreshToken: localStorage.getItem('refreshToken'),
          });
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          window.location.reload();
          return instance(originalConfig);
        } catch (_error) {
          localStorage.removeItem('Token');
          window.location.href = '/home';
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
