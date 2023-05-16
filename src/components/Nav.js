import React from 'react'
// import '../styles/Home.css';

export default function Nav() {
    return (
        <header>
        <nav>
            <div className='bar'>
                <div className="logo">Play</div>
                <div className="menu">
                    <ul>
                        <li><a href="#">PlayGround Q&A</a></li>
                        <li><a href="#">실시간 인기게시물</a></li>
                        <li><a href="#">사이드 프로젝트</a></li>
                        <li><a href="#">채용정보</a></li>
                    </ul>
                </div>
            </div>

            <div className='icon'>
                <ul>
                    <li><a href='#'><i class="fa-solid fa-magnifying-glass"></i></a></li>
                    <li><a href='#'><i class="fa-regular fa-comment-dots"></i></a></li>
                    <li><a href='#'><i class="fa-regular fa-bell"></i></a></li>
                </ul>
            </div>
        </nav>
        </header>
    )
}
