import React, { useEffect, useState } from "react";
import axios from 'axios'
import NoticeView from "./NoticeView"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Notice = () =>  {

    const [noticeId, setNoticeId] = useState('');
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate();

    const noticeViewHandler = () => {

        axios({
            method: 'POST',
            url : "/api/notice/view",
            data : {
                "noticeId" : noticeId,
            },
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then((res) => {
            console.log(res.data);
            navigate('view',{state : res.data})            
        })
        .catch((err) => {
            console.log(err);
        })
    };

    useEffect(() => {
        axios({
            method: 'GET',
            url : "/api/notice",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data);

                let noticeData = res.data;

                setNotices(noticeData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div align="center">
            <Header /><br />
            <h2>공지사항</h2 ><br />
            <table>
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        {/* <th>조회수</th> */}
                        <th>작성일시</th>
                    </tr>
                </thead>
                <tbody>
                    {notices.map((notice) => (
                        <tr key={notice.noticeId} 
                            onClick={() => noticeViewHandler(setNoticeId(notice.noticeId))}> 
                            <th>{notice.noticeId}</th>
                            <th>{notice.title}</th>
                            <th>{notice.author}</th>
                            {/* <th>{notice.viewCount}</th> */}
                            <th>{notice.uploadTime}</th>
                        </tr>
                    ))}
                </tbody>
            </table> <br />
            <Link to="write"><button type="button" class="btn btn-primary">글쓰기</button></Link>
        </div>    


    );
}
export default Notice;

