import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from "../../components/Base/Header";
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Notice/NoticeView.css';
import Moment from "react-moment";

const NoticeView = () =>{
    const location = useLocation();
    const id = location.state.id;
    const navigate = useNavigate();
    const [notice, setNotice] = useState([]);
    console.log(id);

    useEffect(()=> {
        axios({
            method: 'GET',
            url : `/api/notice/view/${id}`,
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then((res) => {
            console.log(res.data);
            setNotice(res.data);          
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])




    const noticeModifyHandler = () => {
        navigate('/notice/modify', {state:notice})
    }

    const noticeDeleteHandler = () => {
        const data = {
            "id" : notice.id,
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
        <div>
            <Header />
        <div align="center" class="notice-view-board">
        <div class="notice-title">
                공지사항
        </div>
        <table class="notice-view-table">
            <tr class="notice-view-title"> 
                {/* <td>제목</td> */}
                <td>{notice.title}</td>
            </tr>
            <tr>
                <div class="view-member-id">
                    <td class="view-member-id2">작성자</td>
                    <td>{notice.memberId}</td>
                </div>
                <div class="view-created-date">
                <td class="view-created-date2">작성일시</td>
                <td class="view-created-date3"><Moment format="YYYY-MM-DD HH:mm:ss">{notice.createdDate}</Moment></td>
                </div>
            </tr>
            {/* <tr>조회수 : {notice.viewCount}</tr><br/> */}
            <tr class="view-content">
                <td>{notice.content}</td>
            </tr>
        </table>
        <div class="view-buttons">
            <button
            type="submit" className="btn btn-primary-view"
            onClick={() => noticeDeleteHandler()}
            >삭제하기
            </button>

            <button 
            type="submit" className="btn btn-primary-view"
            onClick={() => noticeModifyHandler()}
            >수정하기
            </button>

            <button
            type="submit" className="btn btn-primary-view"
            onClick={()=>{
                navigate('/notice')
            }}
            >목록보기</button>

        </div>
        </div>
        </div>
    );
}
    export default NoticeView;

