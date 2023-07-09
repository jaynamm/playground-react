import React, { useEffect, useState } from 'react';
import axios from '../components/Token/Interceptor';
import Header from '../components/Base/Header';
import { useNavigate } from 'react-router-dom';
import '../styles/Notice/Notice.css';
import Moment from 'react-moment';
import Footer from '../components/Base/Footer';

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
      .get('/api/notice') // Assuming the API endpoint is correct
      .then((res) => {
        console.log(res.data);
        setNotices(res.data.data); // Update the state with the data array
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
            <tr className="notice-label">
              <th>글 번호</th>
              <th>제목</th>
              <th>작성자</th>
              {/* <th>조회수</th> */}
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {notice.map((item) => (
              <tr key={item.id} onClick={() => noticeViewHandler(item.id)} className="notice-table-row">
                <th className="notice-id">{item.id}</th>
                <th>{item.title}</th>
                <th>{item.member.name}</th>
                {/* <td>{item.viewCount}</td> */}
                <th className="notice-createdDate">
                  <Moment format="YYYY-MM-DD HH:mm:ss">{item.createdDate}</Moment>
                </th>
              </tr>
            ))}
          </tbody>
        </table>{' '}
        <br />
        {/* <Link to="write">
          <button type="button" className="btn btn-primary-notice">
            글쓰기
          </button>
        </Link> */}
      </div>
      <Footer />
    </div>
  );
};
export default Notice;
