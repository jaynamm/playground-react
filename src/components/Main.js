import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Main = () => {
    const location = useLocation();
    const getData = {...location.state}

    console.log(getData);

    return (
        <div>
            <Header />
            닉네임
            {/* <p> {getData.data.nickname} </p> */}

            <Link to="/signin"> 로그인 </Link>
            <Link to="/signup"> 회원가입 </Link>

            <Footer />
        </div>
    )
}

export default Main;