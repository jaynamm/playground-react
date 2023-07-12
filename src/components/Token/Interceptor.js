import axios from 'axios';
axios.interceptors.request.use(
  function (request) {
    console.log('send request');
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
    console.log(response.headers.responsemessage);
    if (response.status === 401 && response.headers.responsemessage === 'ACCESS TOKEN EXPIRED') {
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
    if (response.status === 406) {
      alert('다시 로그인 해주세요.');
      window.location.href = '/';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return Promise.reject(error);
  }
);
export default axios;
