import React from 'react';
import '../../styles/Main.css';
import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import logout from '../Login/LogOut';
import axios from 'axios';

const action = () => {
  <logout />;
};
//로그아웃 기능

export default function Nav() {
  return (
    <header>
      <nav>
        <div className="bar">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo">Play</div>
          </Link>
          <div className="menu">
            <ul>
              <li>
                <Link to="/notice"> 공지사항 </Link>
              </li>
              <li>
                <Link to="/qna"> Q&A </Link>
              </li>
              <li>
                <Link to="/home"> 실시간 인기게시물 </Link>
              </li>
              <li>
                <a>사이드 프로젝트</a>
              </li>
              <li>
                <a>채용정보</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="icon">
          <ul>
            <li>
              <button>
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
                <i className="fa-regular fa-bell"></i>
              </button>
            </li>
            {/* <li><button><i class="fa-solid fa-user"></i></button></li> */}

            <div className="dropdown">
              <button data-bs-toggle="dropdown" aria-expanded="false">
                <li>
                  <i class="fa-solid fa-user"></i>
                </li>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/mypage" class="dropdown-item" style={{ textDecoration: 'none' }}>
                    프로필
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" onClick={action}>
                    <Link to="/logout">로그아웃</Link>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item">고객센터</a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}
