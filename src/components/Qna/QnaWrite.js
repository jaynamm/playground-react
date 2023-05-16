import React, { useState } from 'react'
import Header from '../Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const QnaWrite = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
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
                "author": author,
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
            <h1>질문 작성하기</h1>

            <form>
                <label>제목</label>
                <input type='text' id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <br></br>
                <label>작성자</label>
                <input type='text' id='author' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                <br></br>
                <label>내용</label>
                <input type='text' id='content' name='content' view={content} onChange={(e) => setContent(e.target.value)} />
                <br></br>
                <button type='button' onClick={onSubmitQnaHandler}>질문 등록</button>
            </form>
        </div>
    )
}
