import React, { useEffect, useState } from 'react';
import '../../styles/Main.css';
import { Link } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';
// import { redirect } from 'react-router-dom';
// import axios from '../Token/Interceptor';
import base64 from 'base-64';
import Avvvatars from 'avvvatars-react';

const action = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
//로그아웃 기능

export default function Nav() {
  const [userId, setUserId] = useState("");
  const jwtToken = localStorage.getItem("accessToken"); // localStorage 에 있는 토큰 가져오기
  let payload = jwtToken.substring(jwtToken.indexOf('.')+1,jwtToken.lastIndexOf('.'));  // payload 추출하기
  let decodeMemberInfo = JSON.parse(base64.decode(payload)); // 디코딩 후 JSON 타입으로 파싱

  useEffect(() => {
    setUserId(decodeMemberInfo.sub);
  }, [])

  return (
    <header style={{ zIndex: 100 }}>
      <nav>
        <div className="bar">
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <div className="logo">Play</div>
          </Link>
          <div className="menu">
            <ul className="topTitle">
              <li>
                <Link to="/notice"> 공지사항 </Link>
              </li>
              <li>
                <Link to="/qna"> Q&A </Link>
              </li>
              <li>
                <Link to="/home">실시간 인기게시물</Link>
              </li>
              <li>
                <Link to="/recommend">채용 추천</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="icon">
          <ul className="topTitle">
            <li>
              {/* <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </li>
            <li>
              <button>
                <i className="fa-regular fa-comment-dots"></i>
              </button>
            </li>
            <li>
              <button>
                <i class="fa-regular fa-bell"></i>
              </button> */}
            </li>
            {/* <li><button><i class="fa-solid fa-user"></i></button></li> */}

            <div className="dropdown">
              <button data-bs-toggle="dropdown" aria-expanded="false">
                <li>
                  <Avvvatars value={userId} style="shape" size={40}/>
                </li>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <Link to="/mypage" className="dropdown-item" style={{ textDecoration: 'none' }}>
                    프로필
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item">
                    <Link to="/" onClick={action}>
                      로그아웃
                    </Link>
                  </a>
                </li>
                {/* <li>
                  <a className="dropdown-item" href="#">
                    고객센터
                  </a>
                </li> */}
              </ul>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}
