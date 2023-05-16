import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import Header from "../../components/Base/Header";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function NoticeModify() {
    const location = useLocation();
    const notice = location.state;
    const [noticeId, setNoticeId] = useState(notice.noticeId);
    const [noticeTitle, setNoticeTitle] = useState(notice.title);
    const [noticeContents, setNoticeContents] = useState(notice.contents);
    const navigate = useNavigate();

    const modifyCompleteHandler = () => {
        if (noticeTitle.length === 0 || noticeContents.length === 0){
            alert("제목과 내용을 입력하세요.");
            return;        
    }

    const data = {
        "noticeId" : noticeId,
        "title" : noticeTitle,
        "contents" : noticeContents,
    }

    axios
        .post("/api/notice/modify", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data);
            const responseData = response.date;

            alert("글을 수정했습니다.")
            navigate('/notice', {state:responseData})
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
            alert("글을 수정하지 못했습니다.")
        });
    };
        


    return (
        <div align="center">
        <Header /><br />
        <h1> 제목 : <input 
            className = "noticeTitle"  
            defaultValue= {notice.title}
            onChange={(e) => setNoticeTitle(e.target.value)}
            /> </h1><br/>
        <p>작성자 : {notice.author} </p><br />
        {/* <p>조회수 : {notice.viewCount}</p><br/> */}
        <p>내용 : <textarea
            className = "noticeContents"
            defaultValue= {notice.contents}
            onChange={(e) => setNoticeContents(e.target.value)}
            /><br /><br /></p>
        <p>작성일시 : {notice.uploadTime}</p><br/>
        <button
        type="submit" className="btn btn-primary"
        onClick={() => modifyCompleteHandler()}
        >수정하기</button>
        </div>
    );

};