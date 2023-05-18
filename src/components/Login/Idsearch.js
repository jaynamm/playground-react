import React, { useState } from "react";
import '../../styles/Idsearch.css';
import axios from "axios";

export default function IdSearch() {
    const [userEmail, setEmail] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const idCheckHandler = () => {
        const email = {
            "email": userEmail,
        };

        axios
        .post("/api/member/search/id", email)
        .then((response) => {
            console.log(response.data);
            const responseData = response.data;
            setSearchResult(responseData)
            alert("아이디를 찾았습니다.")
        })

        .then((result) => {
            console.log(result);
        })

        .catch((error) => {
            console.log(error)
            alert("입력하신 이메일로 가입한 아이디가 없습니다.")
        })
    }

 return (
    <div className="wrap">
        <div className="box">
        <p className='play'>PLAY <span className="ground">GROUND</span></p>
            <div className="emailinput">아이디를 찾고자하는 이메일을 입력해주세요.</div>
            
            <input 
            className="idinput"
            onSubmit={idCheckHandler} 
            type="email" 
            id="userEmail" 
            placeholder="이메일을 입력해주세요."
            onChange={(e) => setEmail(e.target.value)}
            />

            <button className="idsearch" onClick={idCheckHandler}>아이디 찾기</button>
            <br/>
            <a className="searchresult">{searchResult}</a>
            <br></br>
            <a href="/Signin"> 로그인하러 가기</a>
        </div>
    </div>    
    )
} 
