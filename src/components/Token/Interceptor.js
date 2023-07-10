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
      const message = response.data.responsemessage;
      if (message === "COMMENT_MODIFY_FAILED") {
        alert("댓글을 수정하지 못했습니다.");
      } else if (message === "COMMENT_DELETE_FAILED") {
        alert("댓글을 삭제하지 못헀습니다");
      } else if (message === "FEED_MODIFY_FAILED"){
        alert("피드를 수정하지 못했습니다.");
      } else if (message === "FEED_DELETE_FAILED"){
        alert("피드를 삭제하지 못했습니다.");
      } else if (message === "NOT_FOUND_USER"){
        alert("사용자를 찾을 수 없습니다.");
      } else if (message === "NOTICE_USER_ACCESS"){
        alert("공지사항 글을 작성할 수 없습니다.");
      } else if (message === "NOTICE_WRITER_ACCESS_FAILED"){
        alert("공지사항 글을 수정할 수 없습니다.");
      } else if (message === "NOTICE_DELETE_FAILED"){
        alert("공지사항 글을 삭제할 수 없습니다.");
      } else if (message === "ANSWER_MODIFY_FAILED"){
        alert("댓글을 수정할 수 없습니다.");
      } else if (message === "ANSWER_DELETE_FAILED"){
        alert("댓글을 삭제할 수 없습니다.");
      } else if (message === "QNA_MODIFY_FAILED"){
        alert("질문을 수정할 수 없습니다.");
      } else if (message === "QNA_DELETE_FAILED"){
        alert("질문을 삭제할 수 없습니다.");
      } else { 
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
    }

    if (response.status === 406){
      alert("다시 로그인 해주세요.");
      window.location.href = '/';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return Promise.reject(error);
  }
);
export default axios; 