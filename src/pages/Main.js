import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Base/Footer";
import Header from "../components/Base/Header";
// import Three from "../three/Three";
// import ThreeScene from "../three/ThreeScene";
// import '../styles/Main.css';

const Main = () => {
    const location = useLocation();
    const getData = { ...location.state }

    console.log(getData);


    return (
        <>
            <Header />
            {/* <ThreeScene /> */}

            <div style={{
                backgroundImage: `url(./black.jpg)`,
                backgroundSize: 'cover',
                width: '100vw',
                height: '100vh'
            }}>
                <p className="text">요즘 개발자들의 커뮤니티</p>
                <p className="text2">플레이 그라운드</p>
                <p className="text3">개발 트렌드부터 Q&A,네트워킹까지</p>
                <Link to="/signin">
                    <button className="start-button">지금 시작하기</button>
                </Link>
            </div>
            
            <Footer />
        </>

    )
}

export default Main;