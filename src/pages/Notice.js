import React, { useEffect, useState } from 'react';
import axios from '../components/Token/Interceptor';
import Header from '../components/Base/Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Notice/Notice.css';
import Moment from 'react-moment';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Notice = () => {
  const [notice, setNotices] = useState([]);
  const navigate = useNavigate();
  const [editButton, setEditButton] = useState();
  const [totalPages, setTotalPages] = useState(1);

  const noticeViewHandler = (id) => {
    navigate(`/notice/view/${id}`, {
      state: {
        id: id,
      },
    });
  };

  const pageButtonHandler = async (event, page) => {
    const noticePage = await axios.get(
        '/api/notice', {
          params: {
            page: page - 1
          }
        });
    setNotices(noticePage.data.data.content);
  };

  useEffect(() => {
    axios
      .get('/api/notice')
      .then((res) => {
        console.log(res.data);
        setNotices(res.data.data.content);
        setEditButton(!res.data.responseMessage.includes('NOTICE_USER_ACCESS'));
        setTotalPages(res.data.data.totalPages);
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
              <TableCell>작성일시</TableCell>
            </TableRow>
          </thead>
          <TableBody>
            {notice.map((item) => (
              <TableRow key={item.id} onClick={() => noticeViewHandler(item.id)} className="notice-table-row">
                <TableCell className="notice-id">{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.member.name}</TableCell>
                <TableCell className="notice-createdDate">
                  <Moment format="YYYY년 MM월 DD일 HH:mm">{item.createdDate}</Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
        {editButton && (
          <div className="buttonContainer">
            <Link to="write">
              <Button variant="contained" size="large" color="inherit">
                글쓰기
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Stack spacing={2} alignItems="center">
        <Pagination count={totalPages} onChange={pageButtonHandler}/>
      </Stack>
    </div>
  );
};
export default Notice;
