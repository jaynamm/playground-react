import React, { useEffect, useState } from "react";
import axios from 'axios'
import '../styles/Home.css';
import { redirect } from 'react-router-dom';
import Button from '@mui/material/Button';
import NewsFeed from "../components/Feed/NewsFeed";
import Header from "../components/Base/Header";
import FeedModal from "../components/Feed/FeedModal";
import Footer from "../components/Base/Footer";
import FeedCard from "../components/Feed/FeedCard";


const action = () => {
    localStorage.removeItem('token');
    return redirect('/.signin')
}

const Home = () => {
    const [feeds, setFeeds] = useState([]);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        axios({
            method: 'GET',
            url: "/api/feed/list",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data);

                let feedData = res.data;

                setFeeds(feedData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <Header />

            <div className="feed-wrapper">
                <FeedModal />
                    {feeds.map((feed) => (
                        <NewsFeed feed={feed} setLikeCount={setLikeCount} />
                    ))}
            </div>

            {/* <div className="feed-card-wrapper"> */}
                <FeedCard />
            {/* </div> */}


            <Footer />
        </>
    );
}
export default Home;