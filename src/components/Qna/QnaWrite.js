import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Base/Header'
import Footer from "../Base/Footer";
import axios from 'axios';
import '../../styles/Qna/QnaWrite.css';


export const QnaWrite = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [memberId, setMemberId] = useState("");
    const [content, setContent] = useState("");

    const onSubmitQnaHandler = () => {
        axios({
            method: "POST",
            url: "/api/qna/question/write",
            headers: {
                "Content-Type": 'application/json'
            },
            data: {
                "title": title,
                "memberId": memberId,
                "content": content
            }
        })
        .then((res) => {
            console.log(res.data);
                
            alert("질문 등록이 완료되었습니다.");
            
            navigate("/qna");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <Header />
                <div align="center" class="top-margin">
                    <div class="notice-title">질문 작성하기</div>
                        <table class="notice-write-table">
                            <tr class ="write-member-id">
                                <td class="write-member-id2">작성자 
                                <input
                                class="qna-memberid"
                                type='text' 
                                id='author' 
                                name='memberId' 
                                value={memberId} 
                                onChange={(e) => setMemberId(e.target.value)}
                                />
                                </td>
                            </tr>
                            <tr>
                                <input 
                                className = "write-title"
                                type='text' 
                                id='title' 
                                name='title' 
                                value={title} 
                                placeholder="제목을 입력하세요." 
                                onChange={(e) => setTitle(e.target.value)}
                                />
                            </tr>
                            <br></br>
                            <textarea 
                                type='text'
                                className = "write-content" 
                                id='content' 
                                name='content' 
                                view={content} 
                                placeholder="내용을 입력하세요." 
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button class="qnabutton" type='button' onClick={onSubmitQnaHandler}>질문 등록</button>
                            </table>       
                </div>
            <Footer />
        </div>
    )
}
