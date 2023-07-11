import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Base/Header';
import axios from '../Token/Interceptor';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../styles/Notice/NoticeModify.css';

export default function QnaModify() {
  const location = useLocation();
  const questionViewData = location.state;
  console.log(questionViewData);
  const [memberId, setMemberId] = useState(questionViewData.id);
  const [title, setTitle] = useState(questionViewData.title);
  const [content, setContent] = useState(questionViewData.content);
  const navigate = useNavigate();

  const modifyCompleteHandler = () => {
    if (title.length === 0 || content.length === 0) {
      alert('제목과 내용을 입력하세요.');
      return;
    }

    const data = {
      id: memberId,
      title: title,
      content: content,
    };

    axios
      .post('/api/qna/question/modify', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        const responseData = response.data.question;

        alert('글을 수정했습니다.');
        navigate('/qna', { state: responseData });
      })
      .catch((error) => {
        console.log(error);
        alert('글을 수정하지 못했습니다.');
      });
  };

  return (
    <div>
      <Header />
      <div align="center" className="notice-modify-board">
        <div className="notice-title">Q n A</div>
        <table className="notice-modify-table">
          <tbody>
            <tr>
              <td>
                <TextField
                  className="modify-title"
                  id="outlined-multiline-static"
                  label="제목"
                  multiline
                  rows={1}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  sx={{ marginRight: '66%', marginTop: '3%' }}
                  disabled
                  defaultValue={`작성자 :   ${questionViewData?.member?.name}`}
                />
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  className="modify-content"
                  id="outlined-multiline-static"
                  label="내용"
                  multiline
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="noticeMDbutton">
          <Button variant="contained" size="medium" color="inherit" onClick={() => modifyCompleteHandler()}>
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
