import React, { useEffect, useState } from "react";
import axios from 'axios'
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

export default function NoticeWrite() {
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeAuthor, setNoticeAuthor] = useState('kim');
    const [noticeContents, setNoticeContents] = useState('');
    const navigate = useNavigate();

    const noticeWriteHandler = () => {
        if (noticeTitle.length === 0 || noticeContents.length === 0){
            alert("제목과 내용을 입력하세요.");
            return;
        }

    const data = {
        "title": noticeTitle,
        "author": noticeAuthor,
        "contents": noticeContents,
        };

    axios 
        .post("/api/notice/write", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {             
        console.log(response.data);
        const responseData = response.data;
        
        alert("글을 작성했습니다.")
        navigate('/notice', {
            state : responseData
        })
    })
        .then((result) => {
        console.log(result);
    })
        .catch((error) =>{
        console.log(error);
        alert('글을 작성하지 못했습니다.') 
    });
};


    return(
        <div align="center">
            <Header /><br />
            <input 
            id = "noticeTitle"  
            className = "noticeTitle"  
            placeholder="제목을 입력하세요" 
            onChange={(e) => setNoticeTitle(e.target.value)}
            /> <br /><br />
            <p>작성자 : kim</p><br />
            <textarea 
            id = "noticeContents"
            className = "noticeContents"
            placeholder="내용을 입력하세요."
            onChange={(e) => setNoticeContents(e.target.value)}
            /><br /><br />
            <button 
            type="submit" className="btn btn-primary" 
            onClick={() => noticeWriteHandler()}
            >작성하기
            </button>
        </div>
    );
};
