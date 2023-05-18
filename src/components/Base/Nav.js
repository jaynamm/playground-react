import React from 'react'
import '../../styles/Main.css';
import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';

const action = () => {
    localStorage.removeItem('token');
    return redirect('/.signin')
}

export default function Nav() {
    return (
        <header>
        <nav>
            <div className='bar'>
                <div className="logo">Play</div>
                <div className="menu">
                    <ul>
                    <li><Link to="/notice"><a>공지사항</a></Link></li>
                        <li><a href="#">PlayGround Q&A</a></li>
                        <li><a href="#">실시간 인기게시물</a></li>
                        <li><a href="#">사이드 프로젝트</a></li>
                        <li><a href="#">채용정보</a></li>
                    </ul>
                </div>
            </div>

            <div className='icon'>
                <ul>
                    <li><button><i class="fa-solid fa-magnifying-glass"></i></button></li>
                    <li><button><i class="fa-regular fa-comment-dots"></i></button></li>
                    <li><button><i class="fa-regular fa-bell"></i></button></li>
                    {/* <li><button><i class="fa-solid fa-user"></i></button></li> */}
                    

                        <div class="dropdown">
                            <button data-bs-toggle="dropdown" aria-expanded="false">
                            <li><i class="fa-solid fa-user"></i></li>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">프로필</a></li>
                                <li><a class="dropdown-item" href="/" onClick={action}>로그아웃</a></li>
                                <li><a class="dropdown-item" href="#">고객센터</a></li>
                            </ul>
                        </div>

                </ul>
            </div>
            
        </nav>
        </header>
    )
}
