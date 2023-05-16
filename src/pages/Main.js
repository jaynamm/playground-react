import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Base/Footer";
import Header from "../components/Base/Header";
import '../styles/Main.css';

const Main = () => {
    const location = useLocation();
    const getData = {...location.state}

    console.log(getData);

    return (
        <>
            <Header />
            닉네임
            {/* <p> {getData.data.nickname} </p> */}
            <Link to="/signin"> 로그인 </Link>
            <Link to="/signup"> 회원가입 </Link>
            <div>
                <div className="body">
                    <img src="./home2.jpg" alt="Example image" />
                </div>
                <div className="container">
                    <div className="text">요즘 개발자들의 커뮤니티</div>
                    <div className="text2">플레이 그라운드</div>
                    <div className="text3">개발 트렌드부터 Q&amp;A,네트워킹까지</div>
                </div>
                <Link to="/signin"><button className="start-button">지금 시작하기</button></Link>
            </div>
            <Footer />
        </>
        
    )
}

export default Main;