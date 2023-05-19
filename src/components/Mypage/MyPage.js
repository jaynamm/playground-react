import React from 'react';
// import { useEffect, useState } from 'react'
// import axios from 'axios'
import Footer from '../Base/Footer';
import Header from "../Base/Header";
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import '../../styles/Mypage.css';
const MyPage = () =>{
    const location = useLocation();
    const member = location.state;   // notice 가 mypage로 바뀜
    const navigate = useNavigate();
    const myPageModifyHandler = () => {
        navigate('/mypage/modify', {state:member})
    }
    const myFeedDetailHandler = () => {
        navigate('/feed/list/:id', {state:member})
    }
    // const myCommentDetailHandler = () => {
    //     navigate('/feed/Comment/list/:id', {state:member})
    // }
    const myQnaDetailHandler = () => {
        navigate('/qna/question/list/:id', {state:member})
    }
    const myQnaAnswerDetailHandler = () => {
        navigate('/qna/answer/list/{id}', {state:member})
    }
    return (
        <div>
            <Header />
            <div className='title'>
                마이 페이지
            </div>
            <div className='container' id='profile'>
                <div className='profile_image'>
                    <Avatar src="/broken-image.jpg" id="image" />
                </div>
                <div className='table profile_info'>
                    <table>
                        <tr id="firstrow"><td>  </td>
                            <td id='modify_button'>
                                <button type="submit" className="btn btn-primary"
                                onClick={() => myPageModifyHandler()}>
                                    수정
                                </button>
                            </td>
                        </tr>
                        <tr><td>이름 : 유수빈 (유수빈)</td></tr>
                        <tr><td>이메일 : aaaaaa@aaa.aaa</td> </tr>
                        <tr><td>교육과정 : 빅데이터 </td></tr>
                        <tr><td> 가입날짜: 2023.05.17 </td></tr>
                        {/* <thead> 이름 : {member.name} ({member.nickname})</thead>
                            <tr className='modify_button'>
                                <button type="submit" className="btn btn-primary"
                                onClick={() => myPageModifyHandler()}>
                                    수정하기
                                </button>
                            </tr>
                            <tr><td>이메일 {member.email}</td> </tr>
                            <tr><td>교육과정 : {member.curriculum}</td></tr>
                            <tr><td> 가입날짜: {member.createdDate} </td></tr> */}
                    </table>
                </div>
            </div>
            <div className='container' id="preview">
                <h1>MY FEED</h1>
                <table>
                    <tr>
                        <th className='contentContainer'>
                            <div className='content'>나 오늘 라면 먹음</div>
                            <div id="createdDate">작성일자: feed.createdDate</div>
                        </th>
                        <th className='contentContainer'>
                            <div className='content'>
                                어려서부터 우리 집은 가난했었고 남들 다하는 외식 몇 번 한 적이 없었고 일터에 나가신 어머니 집에 없으면
                                언제나 혼자서 끓여먹었던 라면
                                그러다 라면이 너무 지겨워서
                                맛있는 것 좀 먹자고 대들었었어
                            </div>
                            <div id="createdDate">작성일자: feed.createdDate</div>
                        </th>
                    </tr>
                    <tr>
                        <th className='contentContainer'>
                            <div className='content'>난 오늘 버거킹 불고기 와퍼 먹을 예정</div>
                            <div id="createdDate">작성일자: feed.createdDate</div>
                        </th>
                        <th className='contentContainer'>
                            <div className='content'>신전 떡볶이 순한맛 + 김말이 + 김밥 먹고싶다</div>
                            <div id="createdDate">작성일자: feed.createdDate</div>
                        </th>
                    </tr>
                </table>
                <div style={{alignSelf:"center", padding:"5px"}}>
                    <button type="submit" className="btn btn-primary"
                    onClick={() => myFeedDetailHandler()} >
                        더보기
                </button>
                </div>
            </div>
            <div className='container' id="preview">
                <h1>MY QUESTIONS</h1>
                <table>
                    <tr>
                        <th className='contentContainer'>
                            <div className='content'>내일 점심 뭐 먹지?</div>
                            <div id="createdDate">작성일자: question.createdDate</div>
                        </th>
                        <th className='contentContainer'>
                            <div className='content'>
                                내일 햄버거 먹을 사람? (내일 되면 내가 먹고싶지 않을지도)
                            </div>
                            <div id="createdDate">작성일자: question.createdDate</div>
                        </th>
                    </tr>
                    <tr>
                        <th className='contentContainer'>
                            <div className='content'>오늘 몇시까지 공부하실예정?</div>
                            <div id="createdDate">작성일자: question.createdDate</div>
                        </th>
                        <th className='contentContainer'>
                            <div className='content'>이번주에 놀러가실 분?</div>
                            <div id="createdDate">작성일자: question.createdDate</div>
                        </th>
                    </tr>
                </table>
                <div style={{alignSelf:"center", padding:"5px"}}>
                    <button type="submit" className="btn btn-primary"
                    onClick={() => myQnaDetailHandler()} >
                        더보기
                    </button>
                </div>
            </div>
            <div className='container' id="preview">
                <h1>MY ANSWERS</h1>
                <table>
                    <tr>
                        <th className='contentContainer'>
                            <div className='content'>저는 선택장애 입니다.</div>
                            <div id="createdDate">작성일자: answer.createdDate</div>
                        </th>
                        <th className='contentContainer'>
                            <div className='content'>
                                제가 내일 같이 햄버거 먹겠슴돠!
                            </div>
                            <div id="createdDate">작성일자: answer.createdDate</div>
                        </th>
                    </tr>
                    <tr>
                        <th className='contentContainer'>
                            <div className='content'>한 8 시?</div>
                            <div id="createdDate">작성일자: answer.createdDate</div>
                        </th>
                        <th className='contentContainer'>
                            <div className='content'>저요!</div>
                            <div id="createdDate">작성일자: answer.createdDate</div>
                        </th>
                    </tr>
                </table>
                <div style={{alignSelf:"center", padding:"5px"}}>
                    <button type="submit" className="btn btn-primary"
                    onClick={() => myQnaAnswerDetailHandler()} >
                        더보기
                            </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
    export default MyPage;







