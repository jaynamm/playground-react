import React, { useEffect, useState } from "react";
import axios from 'axios'
import '../styles/Home.css';
import { redirect, useHistory } from 'react-router-dom';
import NewsFeed from "../components/Feed/NewsFeed";
import Header from "../components/Base/Header";
import Footer from "../components/Base/Footer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


// Swal.fire({
//     title: 'Welcome to PlayGround',
//     width: 500,
//     padding: '50',
//     color: 'white',
//     background: '#fff url(homeCoding.gif)',
//     backdrop: `
//             rgba(0,0,123,0.4)
//             url("")
//             left top
//             no-repeat
//         `
// })



const action = () => {
    localStorage.removeItem('token');
    return redirect('/.signin')
}

const Home = () => {
    const [likeCount, setLikeCount] = useState(0);
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
        axios({
            method: 'GET',
            url: "/api/feed/list",
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then((res) => {
                console.log(res.data);
                let feedData = res.data.content;
                setFeeds(feedData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>

            <Header />
            <div className='w-[1024px] px-6 grid grid-cols-12 gap-12 bg-slate-50 mx-auto'>
                <div className="flex flex-col py-8 col-span-8 gap-4">

                    {/* 피드작성 */}
                    <div className="bg-white border border-solid border-slate-300 border-x-0">
                        <div className=" items-center gap-5 p-4">
                            <Link to="/createfeed">
                                <button type="button" className="shadow-none w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                                    <p className="text-sm text-slate-400">나누고 싶은 생각이 있으신가요?</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* 피드작성 */}

                    {/* 피드 */}
                    <div className="infinite-scroll-component__outerdiv">
                        <div className="infinite-scroll-component flex flex-col gap-5 h-auto overflow-auto">
                            <div>
                                <div className="feed-wrapper">
                                    {/* <FeedModal /> */}
                                    {feeds.map((feed) => (
                                        <NewsFeed feed={feed} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 피드 */}

                {/* 추천게시물 */}
                <div className="hidden md:inline col-span-4 sticky top-14 h-[calc(100vh-56px)] overflow-scroll overscroll-contain hide-scroll-bar ">
                    <div className="py-8 flex flex-col gap-5">
                        <div className="flex p-4 bg-white border border-solid border-slate-300">
                            <p className="flex-1 font-bold py-4">PlayGround</p>
                            <div className="relative">
                                <img className="h-20 w-20" src="/pixelHome3.gif" />
                            </div>
                        </div>

                        <div className="bg-white border border-solid border-slate-300">
                            {/*상단 탭*/}
                            <div>
                                <div className="pt-4 px-4">
                                    <h5 className="mb-0 font-bold">
                                        주간 인기 TOP 10
                                    </h5>
                                    <p className="text-sm text-slate-700 mt-2">
                                        지난주 인기 있던 게시물이에요!
                                    </p>
                                </div>
                                {/*상단 탭*/}

                                {/*하단 탭 */}
                                <div className="pb-4">

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                {/* 추천게시물 */}


            </div >

        </>
    );
}
export default Home;