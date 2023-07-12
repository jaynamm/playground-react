import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Base/Header';
import axios from '../Token/Interceptor';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../styles/Notice/NoticeModify.css';

export default function NoticeModify() {
  const location = useLocation();
  const notice = location.state;
  const [id, setId] = useState(notice.id);
  const [title, setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);
  const navigate = useNavigate();

  const modifyCompleteHandler = () => {
    if (title.length === 0 || content.length === 0) {
      alert('제목과 내용을 입력하세요.');
      return;
    }

    const data = {
      id: id,
      title: title,
      content: content,
    };

    axios
      .post('/api/notice/modify', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        const responseData = response.date;

        alert('글을 수정했습니다.');
        navigate('/notice', { state: responseData });
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('글을 수정하지 못했습니다.');
      });
  };

  return (
    <div>
      <Header />
      <div align="center" class="notice-modify-board">
        <div className="notice-title">공지사항</div>
        <table className="notice-modify-table">
          <tr>
            <TextField
              className="modify-title"
              id="outlined-multiline-static"
              label="제목"
              multiline
              rows={1}
              defaultValue={notice.title}
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
              defaultValue={notice.content}
              onChange={(e) => setContent(e.target.value)}
            />
          </tr>
        </table>
        <div className="noticeMDbutton">
          <Button variant="contained" size="medium" color="inherit" onClick={() => modifyCompleteHandler()}>
            수정하기
          </Button>
          <Button variant="contained" size="medium" color="error" sx={{ marginLeft: '10px' }}>
            <Link to="/notice">취소하기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
