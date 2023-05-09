import React, { useEffect, useState } from "react";
import axios from 'axios'
import NewsFeed from "./Feed/NewsFeed";
import '../styles/Home.css';
import Header from "./Header";

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
        
        <div>
            <Header />
            {feeds.map((feed) => (
                <NewsFeed feed={feed} setLikeCount={setLikeCount} />
            ))}
        </div>
    );
}
export default Home;