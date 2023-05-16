import React from 'react'
import '../styles/Main.css';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <header>
            <nav>
                <div className='bar'>
                    <div className="logo">Play</div>
                    <div className="menu">
                        <ul>
                            <li><Link to="/qna">Q&A</Link></li>
                            {/* <li><a href="#">실시간 인기게시물</a></li>
                            <li><a href="#">사이드 프로젝트</a></li>
                            <li><a href="#">채용정보</a></li> */}
                        </ul>
                    </div>
                </div>

                {/* <div className='icon'>
                    <ul>
                        <li><a href='#'><i className="fa-solid fa-magnifying-glass"></i></a></li>
                        <li><a href='#'><i className="fa-regular fa-comment-dots"></i></a></li>
                        <li><a href='#'><i className="fa-regular fa-bell"></i></a></li>
                    </ul>
                </div> */}

                <div className='icon'>
                    <Link to={"/profile"}></Link>
                </div>
            </nav>
        </header>
    )
}
