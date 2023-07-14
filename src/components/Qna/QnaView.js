import axios from '../Token/Interceptor';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Moment from 'react-moment';
import Header from '../../components/Base/Header';
import '../../styles/Notice/NoticeView.css';
import { QnaComment } from './QnaComment';
import Avvvatars from 'avvvatars-react';
import { Box, Typography } from '@mui/material';
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

export const QnaView = () => {
  const location = useLocation();
  const getId = location.state.id;
  const navigate = useNavigate();
  const [questionViewData, setQuestionViewData] = useState(null);
  const [content, setContent] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [editButton, setEditButton] = useState();
  const [qnaComment, setQnaComment] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const lastFeedRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/qna/question/view/${getId}`)
      .then((response) => {
        console.log(response.data);
        setQuestionViewData(response.data.data.question);
        setQuestionId(response.data.data.question.id);
        setEditButton(!response.data.responseMessage.includes('QUESTION_WRITER_ACCESS_FAILED'));
        setQnaComment(response.data.data.answers.content);
        setTotalPages(response.data.data.answers.totalPages);
        setTotalElements(response.data.data.answers.totalElements);
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
    navigate('/qna/qnaModify', {
      state: {
        questionViewData: questionViewData,
        id: questionId,
      },
    });
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


  const pageButtonHandler = async (event, page) => {
    const answerPage = await axios.post(
        '/api/qna/answer/list',
        { id: getId },
        { params: { page: page - 1 }}
    );
    setQnaComment(answerPage.data.content);
  };

  return (
    <div>
      <Header />
      {questionViewData && (
        <div align="center" className="notice-view-board">
          <div className="notice-title">질문 상세보기</div>
          <table className="notice-view-table">
            <tbody>
              <tr className="notice-view-title">
                <td>{questionViewData.title}</td>
              </tr>
              <tr>
                <div className="flex view-member-id">
                  <td className="view-member-id2"> 작성자 </td>
                  {/* <td style={{ textAlign: "center", align: "center", paddingInline: "5px" }} ><Avvvatars value={questionViewData.member.userid} style="shape" size={20}/></td> */}
                  <td style={{ paddingLeft: '3px' }}> {questionViewData.member.nickname} </td>
                </div>
                <tr className="view-created-date">
                  <td className="view-created-date2">작성일시</td>
                  <td className="view-created-date3">
                    <Moment format="YYYY년 MM월 DD일 HH시 mm분">{questionViewData.createdDate}</Moment>
                  </td>
                </tr>
              </tr>
              <tr className="view-content">
                <td>
                  <Typography
                    className="m-2"
                    gutterBottom
                    component="div"
                    variant="body1"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {questionViewData.content}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between" style={{ width: '90%' }}>
            <div>
              <Button
                variant="contained"
                size="medium"
                color="inherit"
                onClick={() => {
                  navigate('/qna');
                }}
              >
                {' '}
                목록보기{' '}
              </Button>
            </div>
            {editButton && (
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  color="inherit"
                  onClick={qnaModifyHandler}
                  sx={{ marginRight: '10px' }}
                >
                  {' '}
                  수정하기{' '}
                </Button>
                <Button variant="contained" size="medium" color="error" onClick={qnaDeleteHandler}>
                  {' '}
                  삭제하기{' '}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <Paper
          sx={{
            p: 4,
            margin: 'auto',
            maxWidth: '75%',
            flexGrow: 1,
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
          }}
        >
          <Grid item xs={45} sm container>
            <Grid item container direction="column" spacing={4}>
              <Grid item direction="column" sx={{ textAlign: 'right' }}>
                <TextField
                  label="답변을 남겨주세요"
                  multiline
                  fullWidth
                  maxWidth="100%"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  onClick={onClickCreateAnswer}
                  sx={{ marginTop: '5px' }}
                >
                  작성
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <br></br>
        <br></br>
        <Box sx={{ p: 1, margin: 'auto', marginBottom: '10px', maxWidth: '75%', flexGrow: 1, textAlign: 'center' }}>
          <b>총 {totalElements} 개의 답변이 있습니다.</b>
          <hr style={{ border: 'none', borderTop: '1px solid black', margin: '20px' }} />
        </Box>
        <br></br>
        {qnaComment.map((comment) => {
          if (qnaComment.length > 0) {
            return (
              <div key={comment.id}>
                <QnaComment comment={comment} />
              </div>
            );
          }
        })}
        ;
        <Stack spacing={2} alignItems="center">
          <Pagination count={totalPages} onChange={pageButtonHandler}/>
        </Stack>
      </div>
    </div>
  );
};
