import axios from 'axios';
axios.interceptors.request.use(
  function (request) {
    console.log("send request")
    request.headers['Authorization'] = localStorage.getItem('accessToken');
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
    const { response, config } = error;
    console.log("error");
    if (response.status === 401) {
      const { data } = await axios.post('/api/refreshtoken', null, {
        headers: {
          'refresh-token': localStorage.getItem('refreshToken'),
        },
      });
      console.log(data);
      //액세스 토큰을 localStorege에 저장
      localStorage.setItem('accessToken', data);
      // 새 액세스 토큰을 header에 저장
      config.headers['Authorization'] = data;
      // 재요청
      return await axios(config);
    }
    return Promise.reject(error);
  }
);
export default axios; 