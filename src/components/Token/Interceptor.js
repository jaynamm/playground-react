import axios from 'axios';

axios.interceptors.request.use(
  function (request) {
    request.headers['accessToken'] = localStorage.getItem('accessToken');
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const [response, config] = error;
    if (response.status === 401) {
      const { data } = await axios.get('/api', {
        baseURL: 'http://localhost:3000',
        params: {
          //refresh Token으로 재발급 요청 401에러가 뜨면?
          token: localStorage.getItem('refreshToken'),
        },
      });
      const { accessToken } = data;
      //액세스 토큰을 localStorege에 저장
      localStorage.setItem('accessToken', accessToken);
      // 새 액세스 토큰을 header에 저장
      config.headers['accessToken'] = accessToken;
      // 재요청
      return await axios(config);
    }
    return Promise.reject(error);
  }
);
export default axios;
