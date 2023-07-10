import React, { useEffect, useState } from 'react';
import axios from '../components/Token/Interceptor';
import Header from '../components/Base/Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Notice/Notice.css';
import Moment from 'react-moment';
import Footer from '../components/Base/Footer';
import Button from '@mui/material/Button';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Notice = () => {
  const [notice, setNotices] = useState([]);
  const navigate = useNavigate();

  const noticeViewHandler = (id) => {
    navigate(`/notice/view/${id}`, {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    axios
      .get('/api/notice')
      .then((res) => {
        console.log(res.data);
        setNotices(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Header />
      <div align="center" className="notice-board">
        <div className="notice-title">공지사항</div>
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
            {notice.map((item) => (
              <TableRow key={item.id} onClick={() => noticeViewHandler(item.id)} className="notice-table-row">
                <TableCell className="notice-id">{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.member.name}</TableCell>
                {/* <td>{item.viewCount}</td> */}
                <TableCell className="notice-createdDate">
                  <Moment format="YYYY-MM-DD HH:mm:ss">{item.createdDate}</Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
        <div className="buttonContainer">
          <Button variant="contained" size="large" color="inherit">
            <Link to="write">글쓰기</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Notice;
