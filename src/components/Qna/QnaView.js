import axios from '../Token/Interceptor';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

// import Comments from './Comments';
import Moment from 'react-moment';
import Header from '../../components/Base/Header';
// import QnaCommentModify from './QnaCommentModify';
import '../../styles/Notice/NoticeView.css';
import { comment } from 'postcss';

export const QnaView = () => {
  const location = useLocation();
  const getId = location.state.id;
  const navigate = useNavigate();
  const [questionViewData, setQuestionViewData] = useState(null);
  const [content, setContent] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [editButton, setEditButton] = useState();
  const [qnaComment, setQnaComment] = useState([]);
  const [visible, setVisible] = useState(false);

  const QnaCommentModify = () => {
    const [content, setContent] = useState();
    const [getId, setGetId] = useState();

    return (
      <div>
        <TextField
          sx={{ width: '90%' }}
          label="내용"
          multiline
          rows={1}
          onChange={(e) => setContent(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          size="small"
          // onClick={qnaCommentModifyHandler}
          sx={{ marginLeft: '15px', marginTop: '15px' }}
        >
          댓글 수정
        </Button>
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(`/api/qna/question/view/${getId}`)
      .then((response) => {
        console.log(response.data);
        setQuestionViewData(response.data.data.question);
        setQuestionId(response.data.data.question.id);
        setEditButton(!response.data.responseMessage.includes('QUESTION_WRITER_ACCESS_FAILED'));
        setQnaComment(response.data.data.answers.content);
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

  const qnaCommentDeleteHandler = (id) => {
    const data = {
      id: id,
    };

    axios
      .post('/api/qna/answer/delete', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        // const responseData = response.data;
        alert('댓글이 삭제되었습니다.');
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('댓글을 삭제하는데 실패하였습니다.');
      });
  };
  const actions = [
    {
      icon: (
        <CreateIcon
          onClick={() => {
            setVisible(!visible);
          }}
        />
      ),
      name: '수정하기',
    },
    { icon: <DeleteIcon onClick={() => qnaCommentDeleteHandler()} />, name: '삭제하기' },
  ];
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
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: '75%',
            flexGrow: 1,
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={30} sm container>
              <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  <TextField
                    sx={{ width: '90%' }}
                    label="내용"
                    multiline
                    rows={1}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    onClick={onClickCreateAnswer}
                    sx={{ marginLeft: '15px', marginTop: '5px' }}
                  >
                    댓글 작성
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <br></br>
        {qnaComment.map((comment) => (
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              marginBottom: '1%',
              maxWidth: '75%',
              flexGrow: 1,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={30} sm container>
                <Grid item xs container direction="column" spacing={4}>
                  <Grid item xs>
                    <div>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {comment.userId}
                      </Typography>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {comment.content}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid item>
                    <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
                      <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 5, right: -20 }}
                        icon={<SpeedDialIcon />}
                      >
                        {actions.map((action) => (
                          <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}

                            // onClick={action.onClick}
                          />
                        ))}
                      </SpeedDial>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {visible && <QnaCommentModify />}
          </Paper>
        ))}
      </div>
    </div>
  );
};
