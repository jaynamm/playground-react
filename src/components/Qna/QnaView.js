import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const QnaView = () => {
    const location = useLocation();
    const getId = location.state.id;

    const [questionViewData, setQuestionViewData] = useState(null);
    const [content, setContent] = useState("");
    const [memberId, setMemberId] = useState("");

    useEffect(() => {
        console.log(`/api/qna/question/view/${getId}`);

        axios({
            method: "GET",
            url: `/api/qna/question/view/${getId}`,
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then((res) => {
                console.log(res);

                setQuestionViewData(res.data.question);

                console.log(questionViewData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const onClickCreateAnswer = () => {
        console.log("답변 작성하기!");
        console.log(content);

        axios({
            method: "POST",
            url: `/api/qna/answer/create/${getId}`,
            data: {
                "memberId": memberId,
                "content": content
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>


            <br></br><br></br>
            <h1>질문보기</h1>
            <br></br>

            {questionViewData ? ( // questionViewData가 비어있지 않은 경우에만 렌더링
                <div>
                    <h1>{questionViewData.title}</h1>
                    <h3>{questionViewData.memberId}</h3>
                    <h3>{questionViewData.content}</h3>
                </div>
            ) : (
                <div>Loading...</div> // 데이터 로딩 중에는 로딩 표시
            )}

            <br></br>

            <form>
                <label>답변</label>
                <br></br>
                <textarea id="content" name="content" 
                        value={content} 
                        onChange={(e) => { setContent(e.target.value) }} />
                <br></br>
                <label>작성자</label>
                <br></br>
                <input id='author' name='aurhor' 
                        value={memberId} 
                        onChange={(e) => { setMemberId(e.target.value) }} />
                <br></br>
                
                <button className='qnabutton'><Link to="/qna" >질문 목록으로 돌아가기</Link></button>

                <button className='qnabutton' type='button' onClick={onClickCreateAnswer}>작성하기</button>

            </form>
        </div>
    )
}
