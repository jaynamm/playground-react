import axios from '../Token/Interceptor';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
// import Comments from './Comments';
import Moment from 'react-moment';
import Header from '../../components/Base/Header';
import Button from '@mui/material/Button';
import '../../styles/Notice/NoticeView.css';
import { Height } from '@mui/icons-material';

export const QnaView = () => {
  const location = useLocation();
  const getId = location.state.id;
  const navigate = useNavigate();
  const [questionViewData, setQuestionViewData] = useState(null);
  const [content, setContent] = useState('');
  const [questionId, setQuestionId] = useState('');
  // const [comments, setComments] = useState([]);
  const [editButton, setEditButton] = useState();

  useEffect(() => {
    axios
      .get(`/api/qna/question/view/${getId}`)
      .then((response) => {
        console.log(response.data);
        setQuestionViewData(response.data.data.question);
        setQuestionId(response.data.data.question.id);
        setEditButton(!response.data.responseMessage.includes('QUESTION_WRITER_ACCESS_FAILED'));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getId]);

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

  const qnaModifyHandler = () => {
    navigate('/qna/qnaModify', { state: questionViewData });
  };

  const onClickCreateAnswer = () => {
    console.log('답변 작성하기!');
    console.log(content);

    const data = {
      questionId: questionId,
      content: content,
    };
    axios
      .post('/api/qna/answer/write', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        alert('작성했습니다.');
        window.location.reload();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('글을 작성하지 못했습니다.');
      });
  };

  return (
    <div>
      <Header />
      {questionViewData && (
        <div align="center" className="notice-view-board">
          <div className="notice-title">Q n A</div>
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
                    <Moment format="YYYY년 MM월 DD일 HH:mm">{questionViewData.createdDate}</Moment>
                  </td>
                </tr>
              </tr>
              <tr className="view-content">
                <td>{questionViewData.content}</td>
              </tr>
            </tbody>
          </table>
          <div className="view-buttons">
            {editButton && (
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  color="inherit"
                  onClick={qnaModifyHandler}
                  sx={{ marginRight: '15px' }}
                >
                  수정하기
                </Button>

                <Button
                  variant="contained"
                  size="medium"
                  color="error"
                  onClick={qnaDeleteHandler}
                  sx={{ marginLeft: '10px' }}
                >
                  삭제하기
                </Button>
              </div>
            )}
          </div>
          <Button
            variant="contained"
            size="medium"
            color="inherit"
            onClick={() => {
              navigate('/qna');
            }}
          >
            목록보기
          </Button>
        </div>
      )}
      <div>
        <table className="qna-view-table">
          <tbody>
            <TextField
              className="qna-content"
              // id="outlined-multiline-static"
              label="내용"
              multiline
              rows={1}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              variant="contained"
              size="large"
              color="success"
              onClick={onClickCreateAnswer}
              sx={{ marginLeft: '15px', marginTop: '6px' }}
            >
              답변 작성
            </Button>
          </tbody>
        </table>
      </div>
    </div>
  );
};
