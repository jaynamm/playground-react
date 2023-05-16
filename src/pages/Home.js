import React, { useEffect, useState } from "react";
import axios from 'axios'
import NewsFeed from "../components/Feed/NewsFeed";
import '../styles/Home.css';
import Header from "../components/Base/Header";
import { redirect } from 'react-router-dom';
import Button from '@mui/material/Button';
import FeedModal from "../components/Feed/FeedModal";


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
            url: "/api/feed/getallfeeds",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data);

                let feedData = res.data.feeds;

                setFeeds(feedData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <Header />
            <FeedModal />
            {feeds.map((feed) => (
                <NewsFeed feed={feed} setLikeCount={setLikeCount} />

            ))}
            <Button variant="outlined" color="primary" href='/' onClick={action}>로그아웃</Button>
        </>
    );
}
export default Home;