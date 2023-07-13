import React, { useEffect, useState } from 'react';
import axios from '../Token/Interceptor';
import Header from '../../components/Base/Header';
import { useNavigate } from 'react-router-dom';
import '../../styles/Notice/NoticeWrite.css';
import Footer from '../Base/Footer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NoticeWrite() {
  const [title, setTitle] = useState('');
  const [memberId, setMemberId] = useState('kim');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const noticeWriteHandler = () => {
    if (title.length === 0 || content.length === 0) {
      alert('제목과 내용을 입력하세요.');
      return;
    }

    const data = {
      title: title,
      memberId: memberId,
      content: content,
    };

    axios
      .post('/api/notice/write', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        console.log(response.data);
        const responseData = response.data;

        alert('글을 작성했습니다.');
        navigate('/notice', {
          state: responseData,
        });
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
      <div align="center" class="notice-write-board">
        <div class="notice-title">공지사항</div>
        <table class="notice-write-table">
          <tr>
            <TextField
              className="modify-title"
              id="title"
              name="title"
              value={title}
              placeholder="제목을 입력하세요."
              onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </tr>
          <tr>
            <TextField
              className="modify-content"
              id="outlined-multiline-static"
              label="내용"
              multiline
              rows={10}
              onChange={(e) => setContent(e.target.value)}
            />
          </tr>
        </table>
        <div className="noticeMDbutton">
          <Button variant="contained" size="medium" color="inherit" onClick={() => noticeWriteHandler()}>
            작성하기
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
