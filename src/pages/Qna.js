import React, { useEffect, useState } from 'react'
import Header from '../components/Base/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Qna = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [id, setId] = useState(0);

    useEffect (() => {
        axios({
            method: "GET",
            url: "/api/qna/question/list"
        })
        .then((res) => {
            console.log(res.data);
            setQuestions(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    const onClickCreateQnaHandler = () => {
        navigate("/qna/write");
    }

    const onClickQnaViewHandler = (questionId) => {
        console.log(questionId);

        console.log(`/qna/view/${questionId}`);

        navigate(`/qna/view/${questionId}`, {
            state: {
                "id": questionId
            }
        });
        // navigate(`/qna/view/${questionId}`)
    }

    return (
        <div>
            <Header />
            <h1>질문 게시판</h1>
            <table>
                <thead>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>생성일</th>
                </thead>
                <tbody>
                    {questions.map((question) => (    
                    <tr>
                        <td>{question.id}</td>
                        <td onClick={() => {onClickQnaViewHandler(question.id)}}>{question.title}</td>
                        <td>{question.memberId}</td>
                        <td>{question.createdDate}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button type='button' onClick={() => {onClickCreateQnaHandler()}}>질문하기</button>
        </div>
    )
}

export default Qna;