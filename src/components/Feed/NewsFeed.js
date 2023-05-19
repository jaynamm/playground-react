import React from 'react'
import '../../styles/Feed/Newfeed.css'
import Moment from 'react-moment'

export default function NewsFeed({ feed, likeCount, setLikeCount }) {
    return (
        <div id="news-feed">
            {/* 뉴스피드 박스 */}
            <div className="post">
                <div className="post-header">
                    <img src="./user.png" alt="User profile picture" />
                    <div>
                        <h2>{feed.memberId}</h2>
                        <p><Moment format="YYYY-MM-DD HH:mm:ss">{feed.createdDate}</Moment></p>
                    </div>
                </div>
                <div className="post-content">
                    <p className="content">{feed.content}</p>
                    <br></br>
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