import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Base/Header';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Notice/Notice.css';
import Moment from 'react-moment';
import Footer from '../components/Base/Footer';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  const noticeViewHandler = (id) => {
    navigate(`/notice/view/${id}`, {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/notice',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
    })
      .then((res) => {
        console.log(res.data);

        let noticeData = res.data;

        setNotices(noticeData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <div align="center" class="notice-board">
        <div class="notice-title">공지사항</div>
        <table class="notice-table">
          <thead>
            <tr class="notice-label">
              <th>글 번호</th>
              <th>제목</th>
              <th>작성자</th>
              {/* <th>조회수</th> */}
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id} onClick={() => noticeViewHandler(notice.id)} class="notice-table-row">
                <th class="notice-id">{notice.id}</th>
                <th>{notice.title}</th>
                <th>{notice.memberId}</th>
                {/* <th>{notice.viewCount}</th> */}
                <th class="notice-createdDate">
                  <Moment format="YYYY-MM-DD HH:mm:ss">{notice.createdDate}</Moment>
                </th>
              </tr>
            ))}
          </tbody>
        </table>{' '}
        <br />
        <Link to="write">
          <button type="button" class="btn btn-primary-notice">
            글쓰기
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};
export default Notice;
