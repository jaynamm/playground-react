import axios from '../Token/Interceptor';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Header from '../../components/Base/Header';
import Button from '@mui/material/Button';
import '../../styles/Notice/NoticeView.css';
import { Result } from 'postcss';

export const QnaView = () => {
  const location = useLocation();
  const getId = location.state.id;
  const navigate = useNavigate();

  const [questionViewData, setQuestionViewData] = useState(null);
  const [content, setContent] = useState('');
  const [memberId, setMemberId] = useState('');

  useEffect(() => {
    axios
      .get(`/api/qna/question/view/${getId}`)
      .then((response) => {
        setQuestionViewData(response.data.date);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const qnaModifyHandler = () => {
    navigate('/qna/', { state: questionViewData });
  };
  const qnaDeleteHandler = () => {
    const data = {
      id: questionViewData.id,
    };
    axios
      .post('/api/qna/question/delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        const responseData = response.data;
        alert('글을 삭제했습니다.');
        navigate('/qna', { state: responseData });
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('글을 삭제하지 못했습니다.');
      });
  };

  // useEffect(() => {
  //   console.log(`/api/qna/question/view/${getId}`);
  //   axios({
  //     method: 'GET',
  //     url: `/api/qna/question/view/${getId}`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);

  //       setQuestionViewData(res.data.question);

  //       console.log(questionViewData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const onClickCreateAnswer = () => {
    console.log('답변 작성하기!');
    console.log(content);

    axios({
      method: 'POST',
      url: `/api/qna/answer/create/${getId}`,
      data: {
        memberId: memberId,
        content: content,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      {questionViewData && (
        <div align="center" className="notice-view-board">
          <div className="notice-title">공지사항</div>
        </div>
      )}
      {/* <div align="center" className="notice-view-board">
        <div className="notice-title">공지사항</div>
        <table className="notice-view-table">
          <tbody>
            <tr className="notice-view-title">
              <td>{questionViewData.title}</td>
            </tr>
            <tr>
              <div className="view-member-id">
                <td className="view-member-id2">작성자</td>
                <td>{questionViewData.member.name}</td>
              </div>
              <tr className="view-created-date">
                <td className="view-created-date2">작성일시</td>
                <td className="view-created-date3">
                  <Moment format="YYYY-MM-DD HH:mm:ss">{questionViewData.createdDate}</Moment>
                </td>
              </tr>
            </tr>

            <tr className="view-content">
              <td>{questionViewData.content}</td>
            </tr>
          </tbody>
        </table>
        <div className="view-buttons">
          <Button
            variant="contained"
            size="medium"
            color="inherit"
            onClick={onClickCreateAnswer}
            sx={{ marginRight: '15px' }}
          >
            삭제하기
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="inherit"
            onClick={onClickCreateAnswer}
            sx={{ marginRight: '15px' }}
          >
            수정하기
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="inherit"
            onClick={() => {
              navigate('/notice');
            }}
          >
            목록보기
          </Button>
        </div>
      </div> */}
      {/* {questionViewData ? ( // questionViewData가 비어있지 않은 경우에만 렌더링
        <div align="center" className="notice-view-board">
          <div className="notice-title"> 공지사항</div>
          <table className="notice-view-table">
            <tbody></tbody>
          </table>
          <h1>{questionViewData.title}</h1>
          <h3>{questionViewData.memberId}</h3>
          <h3>{questionViewData.content}</h3>
        </div>
      ) : (
        <div>Loading...</div> // 데이터 로딩 중에는 로딩 표시
      )} */}

      <br></br>

      <form>
        <label>답변</label>
        <br></br>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <br></br>
        <label>작성자</label>
        <br></br>
        <input
          id="author"
          name="aurhor"
          value={memberId}
          onChange={(e) => {
            setMemberId(e.target.value);
          }}
        />
        <br></br>

        <Button variant="contained" size="medium" color="inherit">
          <Link to="/qna">질문 목록으로 돌아가기</Link>
        </Button>

        <Button variant="contained" size="medium" color="inherit" onClick={onClickCreateAnswer}>
          작성하기
        </Button>
      </form>
    </div>
  );
};
