import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import Avvvatars from 'avvvatars-react';
import React, { useState } from 'react';
import axios from '../Token/Interceptor';

export const QnaComment = ({ comment }) => {
  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  const calcCommentDatetime = detailDate(new Date(comment.createdDate));

  const [isVisible, setIsVisible] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);

  // 댓글 수정
  const onclickModifyHandler = () => {
    setIsVisible(!isVisible);
  };

  // 댓글 삭제
  const onclickDeleteHandler = (contentId) => {
    axios
      .post(
        '/api/qna/answer/delete',
        {
          id: contentId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert('댓글이 삭제되었습니다.');
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('댓글을 삭제하는데 실패하였습니다.');
      })
      .finally(() => {
        window.location.reload();
      });
  };

  // 댓글 내용 수정
  const onModifySaveHandler = () => {
    axios
      .post(
        '/api/qna/answer/modify',
        {
          id: comment.id,
          content: commentContent,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert('댓글이 수정되었습니다.');
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('댓글을 수정하는데 실패하였습니다.');
      })
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <div>
      <Paper
        sx={{
          p: 1,
          margin: 'auto',
          marginBottom: '1%',
          maxWidth: '75%',
          flexGrow: 1,
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={30} sm container>
            <Grid item xs className="flex justify-between">
              <div className="flex mt-2" style={{ textAlign: 'center', marginInline: '10px' }}>
                <Typography className="m-2" gutterBottom component="div">
                  <Avvvatars value={comment.userId} style="shape" size={30} />{' '}
                </Typography>
                <Typography
                  className="m-2"
                  gutterBottom
                  component="div"
                  style={{ fontSize: '14px', alignSelf: 'center' }}
                >
                  {' '}
                  {comment.nickname}{' '}
                </Typography>
                <Typography className="m-3" gutterBottom component="div" style={{ fontSize: '12px' }}>
                  {' '}
                  {calcCommentDatetime}{' '}
                </Typography>
              </div>

              {isVisible ? (
                <div className="flex" style={{ marginBlock: '10px' }}>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      onModifySaveHandler();
                    }}
                    sx={{ mr: '5px' }}
                  >
                    {' '}
                    완료{' '}
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => setIsVisible(false)}
                    sx={{ mr: '5px' }}
                  >
                    {' '}
                    취소{' '}
                  </Button>
                </div>
              ) : comment.editable ? (
                <div className="flex" style={{ marginBlock: '10px' }}>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => onclickModifyHandler()}
                    sx={{ mr: '5px' }}
                  >
                    {' '}
                    수정{' '}
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => onclickDeleteHandler(comment.id)}
                    sx={{ mr: '5px' }}
                  >
                    {' '}
                    삭제{' '}
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{ marginInline: '10px', marginTop: '5px' }}>
          {isVisible ? (
            <div className="mb-4 pr-5 pl-11">
              <div className="w-full">
                <TextField
                  multiline
                  fullWidth
                  defaultValue={commentContent}
                  onChange={(e) => {
                    setCommentContent(e.target.value);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 pr-5 pl-11">
              <Typography
                className="m-2"
                gutterBottom
                component="div"
                variant="body1"
                style={{ whiteSpace: 'pre-line', overflowWrap: "break-word" }}
              >
                {comment.content}
              </Typography>
            </div>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default QnaComment;
