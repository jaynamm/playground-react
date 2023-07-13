import React, { useEffect, useState } from 'react';
import Header from '../components/Base/Header';
import axios from '../components/Token/Interceptor';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Footer from '../components/Base/Footer';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import '../styles/Qna/Qna.css';

const Qna = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/qna/question/list',
    })
      .then((res) => {
        console.log(res.data.content);
        setQuestions(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickCreateQnaHandler = () => {
    navigate('/qna/write');
  };

  const onClickQnaViewHandler = (questionId) => {
    console.log(questionId);

    console.log(`/qna/view/${questionId}`);

    navigate(`/qna/view/${questionId}`, {
      state: {
        id: questionId,
      },
    });
    // navigate(`/qna/view/${questionId}`)
  };

  return (
    <div>
      <Header />

      <div align="center" className="notice-board">
        <div className="notice-title">Q & A</div>
        <table className="notice-table">
          <thead>
            <TableRow className="noticeLabel">
              <TableCell>글 번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성자</TableCell>
              {/* <th>조회수</th> */}
              <TableCell>작성일시</TableCell>
            </TableRow>
          </thead>
          <TableBody>
            {questions.map((item) => (
              <TableRow key={item.id} onClick={() => onClickQnaViewHandler(item.id)} className="notice-table-row">
                <TableCell className="notice-id">{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.member.name}</TableCell>
                {/* <td>{item.viewCount}</td> */}
                <TableCell className="notice-createdDate">
                  <Moment format="YYYY년 MM월 DD일 HH:mm">{item.createdDate}</Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
        <div className="buttonContainer">
          <Button
            variant="contained"
            size="large"
            color="inherit"
            onClick={() => {
              onClickCreateQnaHandler();
            }}
          >
            질문하기
          </Button>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Qna;
