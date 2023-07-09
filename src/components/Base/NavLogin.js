import React from 'react';
import '../../styles/Main.css';
import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import axios from '../Token/Interceptor';

export default function Nav() {
  return (
    <header>
      <nav>
        <div className="bar">
          <Link to="/" style={{ textDecoration: 'none' }}>
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
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
