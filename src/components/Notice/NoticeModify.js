import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import Header from "../../components/Base/Header";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../../styles/Notice/NoticeModify.css';

export default function NoticeModify() {
    const location = useLocation();
    const notice = location.state;
    const [id, setId] = useState(notice.id);
    const [title, setTitle] = useState(notice.title);
    const [content, setContent] = useState(notice.content);
    const navigate = useNavigate();

    const modifyCompleteHandler = () => {
        if (title.length === 0 || content.length === 0){
            alert("제목과 내용을 입력하세요.");
            return;        
    }

    const data = {
        "id" : id,
        "title" :title,
        "content" : content,
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
        <div>
            <Header />
        <div align="center" class="notice-modify-board">
        <div class="notice-title">
                공지사항
        </div>
            <table class="notice-modify-table">
                <tr>
                    <input 
                        className = "modify-title"  
                        defaultValue= {notice.title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                </tr>
                <tr>
                    <div class="modify-member-id">
                        <td class="modify-member-id2">작성자</td>
                        <td>{notice.memberId}</td>
                    </div>
                    <div class="modify-createdDate">
                        <td class="modify-createdDate2">작성일시</td>
                        <td class="modify-createdDate3">{notice.createdDate}</td>
                    </div>
                </tr>
                {/* <p>조회수 : {notice.viewCount}</p><br/> */}
                <tr>
                    <td>
                        <textarea
                        className = "modify-content"
                        defaultValue= {notice.content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                    </td>
                </tr>
            </table>
        <button
        type="submit" className="btn btn-primary-modify"
        onClick={() => modifyCompleteHandler()}
        >수정하기</button>
        </div>
        </div>
    );

};