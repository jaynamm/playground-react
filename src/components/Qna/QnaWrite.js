import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Base/Header';
import Footer from '../Base/Footer';
import axios from '../Token/Interceptor';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../styles/Qna/QnaWrite.css';

export const QnaWrite = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [memberId, setMemberId] = useState('');
  const [content, setContent] = useState('');

  const onSubmitQnaHandler = () => {
    axios({
      method: 'POST',
      url: '/api/qna/question/write',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        title: title,
        memberId: memberId,
        content: content,
      },
    })
      .then((res) => {
        console.log(res.data);

        alert('질문 등록이 완료되었습니다.');

        navigate('/qna');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div align="center" class="notice-modify-board">
        <div className="notice-title">Q n A</div>
        <table className="notice-modify-table">
          <tr>
            <TextField
              className="modify-title"
              id="title"
              name="title"
              value={title}
              placeholder="제목을 입력하세요."
              onChange={(e) => setTitle(e.target.value)}
            />
          </tr>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <tr>
            <TextField
              className="modify-content"
              id="outlined-multiline-static"
              label="내용"
              multiline
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </tr>
        </table>
        <div className="noticeMDbutton">
          <Button variant="contained" color="inherit" onClick={() => onSubmitQnaHandler()}>
            작성하기
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
