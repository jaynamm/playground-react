import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const NoticeView = () =>{
    const location = useLocation();
    const notice = location.state;
    const navigate = useNavigate();

    const noticeModifyHandler = () => {
        navigate('/notice/modify', {state:notice})
    }

    const noticeDeleteHandler = () => {
        const data = {
            "noticeId" : notice.noticeId,
        }
        axios
            .post("/api/notice/delete", JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data);
                const responseData = response.data;
    
                alert("글을 삭제했습니다.")
                navigate('/notice', {state:responseData})
            })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
                alert("글을 삭제하지 못했습니다.")
            });

    };

    
    return (
        <div align="center">
        <Header /><br />
        <h1> 제목 : {notice.title} </h1><br/>
        <p>작성자 : {notice.author}</p> <br/>
        {/* <p>조회수 : {notice.viewCount}</p><br/> */}
        <p>내용 : {notice.contents}</p><br/>
        <p>작성일시 : {notice.uploadTime}</p><br/>

        <button 
        type="submit" className="btn btn-primary"
        onClick={() => noticeModifyHandler()}
        >수정하기
        </button>

        <button
        type="submit" className="btn btn-primary"
        onClick={() => noticeDeleteHandler()}
        >삭제하기
        </button>

        </div>
    );
}
    export default NoticeView;

