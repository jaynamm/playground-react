import React, { useEffect, useState } from 'react'
import Header from '../components/Base/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Footer from "../components/Base/Footer";
import '../styles/Qna/Qna.css'

const Qna = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
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
            <div align="center" class="notice-board">
                <div class="notice-title">
                    Q & A
                </div>
                <table class="notice-table">
                    <thead>
                        <tr class="notice-label">
                            <th>글 번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            {/* <th>조회수</th> */}
                            <th>작성일시</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question) => (
                            <tr>
                                <td>{question.id}</td>
                                <td onClick={() => { onClickQnaViewHandler(question.id) }}>{question.title}</td>
                                <td>{question.memberId}</td>
                                <td><Moment format="YYYY-MM-DD HH:mm:ss">{question.createdDate}</Moment></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button class="btn btn-primary-notice" type='button' onClick={() => { onClickCreateQnaHandler() }}>질문하기</button>
            </div>
            <Footer />
        </div>

    )
}

export default Qna;