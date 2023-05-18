import React, { useState } from "react";
import axios from "axios";
// import { styles } from'./styles'

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
    <div>
        <input 
        onSubmit={idCheckHandler} 
        type="email" 
        id="userEmail" 
        onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={idCheckHandler}>아이디찾기</button>  
        <div>{searchResult}</div>  
    </div>    
    )
} 
