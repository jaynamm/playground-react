import React from 'react';
// import { useEffect, useState } from 'react'
// import axios from 'axios'
import Header from "../Base/Header";
import Footer from "../Base/Footer";
// import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import '../../styles/Mypage.css';
const MyPageModify = () =>{
    return (
        <div>
        <Header />
        <div className='container' id='profile'>
            <div className='profile_image'>
                <Avatar src="/broken-image.jpg" id="image" />
            </div>
            <div className='table profile_info'>
                <table>
                    <tr id="firstrow"><td>  </td>
                        <td id='modify_button'>
                            <button type="submit" className="btn btn-primary"
                            >
                                수정
                            </button>
                        </td>
                    </tr>
                    <tr><td>이름 : 유수빈(유수빈)</td></tr>
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
        <div className='space'>

            </div>
        <Footer/>
        </div>
    );
}
    export default MyPageModify;


