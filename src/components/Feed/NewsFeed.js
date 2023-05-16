import React from 'react'

export default function NewsFeed({ feed, likeCount, setLikeCount }) {
    return (
        <div id="news-feed">
            {/* 뉴스피드 박스 */}
            <div className="post">
                <div className="post-header">
                    <img src="https://source.unsplash.com/random/50x50" alt="User profile picture" />
                    <div>
                        <h2>{feed.userid}</h2>
                        <p>{feed.uploadTime}</p>
                    </div>
                </div>

                <div className="post-content">
                    <p>{feed.article}</p>
                    <br></br>
                    {/* <img src="./TEST.jpeg" alt="Post image" height="500px"/> */}
                </div>

                <div className='likeAct'>
                    <p>좋아요 {feed.likeCount}</p>
                    <br></br>
                </div>

                <div className="post-footer">
                    <div className='like'>
                        <button><span onClick={() => { setLikeCount(likeCount + 1) }}><i class="fa-regular fa-heart"></i></span></button>
                    </div>

                    <div className='CSD'>
                        <a href="#"><i class="fa-regular fa-message"></i></a>
                        <a href="#"><i class="fa-solid fa-share-nodes"></i></a>
                        <a href="#"><i class="fa-solid fa-ellipsis-vertical"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
