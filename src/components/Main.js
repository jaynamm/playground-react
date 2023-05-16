import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import '../styles/Main.css';

const Main = () => {
    const location = useLocation();
    const getData = {...location.state}

    console.log(getData);

    return (
        <>
            <Header />
        <>

                <div className="body">
                    <img src="./home2.jpg" alt="Example image" />
                </div>

                <div className="container">
                    <div className="text">요즘 개발자들의 커뮤니티</div>
                    <div className="text2">플레이 그라운드</div>
                    <div className="text3">개발 트렌드부터 Q&amp;A,네트워킹까지</div>
                </div>
                
                <Link to="/signin"><button className="start-button">지금 시작하기</button></Link>

        </>
            <Footer />
        </>
        
    )
}

export default Main;