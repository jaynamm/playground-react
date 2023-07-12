import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Feed/Newfeed.css';
import Moment from 'react-moment';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confetti } from '../../App';
import axios from '../Token/Interceptor';


export default function NewsFeed({ feed }) {

    // View 창으로 id 들고가기
    const navigate = useNavigate();
    const feedViewHandler = (id) => {
        navigate(`/feed/view/${id}`, {
            state: {
                "id": id
            }
        })
    };

    // 좋아요 토글
    const [liked, setLiked] = useState(false);
    useEffect(() => { setLiked(feed.liked); }, [])

    // 좋아요 카운트
    const [likeCount, setLikeCount] = useState(feed.likeCount);

    // 팔로우 토글
    const [follow, setFollow] = useState(false);

    // 팔로우 토스트알람
    const followHandler = () => {
        setFollow((prevFollow) => !prevFollow);
        toast.info("팔로우 했어요 !", { position: "top-center", autoClose: 2000, hideProgressBar: true, })
    }
    // 언팔로우 토스트알람
    const unFollowHandler = () => {
        setFollow((prevFollow) => !prevFollow);
        toast.warning("팔로우 취소 했어요 !", { position: "top-center", autoClose: 2000, hideProgressBar: true, })
    }


    // 좋아요 api
    const likeHandler = () => {
        axios.post('/api/likesCancel', { feedId: feed.id })
        setLiked(!liked);
        setLikeCount((likeCount) => likeCount - 1);

    }



    // confetti 효과 , 좋아요 api
    const confettiClick = () => {

        axios.post('/api/likes', { feedId: feed.id })

        confetti.addConfetti({
            emojis: ["👍"],
            emojiSize: 80,
            confettiNumber: 30,
        });
        setLiked(!liked);
        setLikeCount((likeCount) => likeCount + 1);
    };





    return (
        <>
            <div className='bg-white border border-solid border-slate-300'>
                <div className='flex justify-between items-center p-4'>
                    <div className='flex gap-4 items-center'>
                        <img src='/user.png' alt="User profile " className='w-8 h-8 rounded-full' />
                        <div className='flex-1'>
                            <p className='text-sm text-slate-900 font-bold'>{feed.nickname}</p>
                            <p className='text-xs text-slate-700'>{feed.userId}</p>
                        </div>
                        <div className='text-xs'>
                            <Moment format="YYYY-MM-DD HH:mm:ss">{feed.createdDate}</Moment>
                        </div>
                    </div>

                    {!follow ? (

                        <div className='flex-none'>
                            <button className='btn btn-sm btn-coral-100 bg-blue-200 hover:bg-slate-200 text-coral-600 font-bold' type='button' onClick={followHandler}>팔로우</button>
                            <ToastContainer />
                        </div>
                    ) : (
                        <div>
                            <button className='btn btn-sm bg-red-200 hover:bg-red-100' onClick={unFollowHandler}>
                                <i class="fa-solid fa-user-xmark"></i>
                            </button>
                            <ToastContainer />
                        </div>

                    )}

                </div>
                <div className='p-4'>
                    <h1 className='mb-6 font-bold text-xl'>플레이그라운드</h1>
                    <p className='auto-line-break text-base text-slate-900 whitespace-pre-wrap'>
                        {feed.content}
                        <a className='text-slate-900 mt-6 flex underline' target="_blank" rel='origin' href="https://www.lipsum.com/">
                            https://www.lipsum.com/
                        </a>
                    </p>
                </div>

                <div id="article" className='px-4 py-2'>
                    <a href="https://www.lipsum.com/" target="_blank" rel="origin">
                        <div className='border border-solid border-slate-200 rounded-lg overflow-hidden bg-slate-50 flex'>
                            <div className='flex-1 p-4'>
                                <p className='mb-1 text-sm font-bold text-slate-900 line-clamp-3'>
                                    북마크 샘플
                                </p>
                                <p className='text-sm text-slate-700 line-clamp-1'>정보 샘플</p>
                            </div>
                            <span className='box-border inline-block overflow-hidden w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 relative max-w-full'>
                                <span className='box-border block w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 max-w-full'>
                                </span>
                            </span>
                        </div>
                    </a>
                </div>

                <div className=' mx-4 mb-2 border-slate-500 py-3 flex justify-between'>
                    <p className='text-xs text-slate-500'>
                        좋아요 {likeCount}

                    </p>
                    <p className='text-xs text-slate-500 false'>
                        댓글 <b>{feed.commentCount}</b> * 조회 <b>{feed.viewCount}</b>
                    </p>
                </div>


                <div className=''>
                    <div className='flex px-1 justify-between'>
                        <div id="likeRepost" className='flex'>


                            {liked ? (
                                <button className="flex items-center gap-1 p-3 focus:outline-none false" onClick={likeHandler}>
                                    <i className="fa-solid fa-thumbs-up"></i>
                                    <p className="font-bold text-xs text-slate-500">좋아요 취소</p>
                                </button>
                            ) : (
                                <button type="button" className="flex items-center gap-1 p-3 focus:outline-none false" onClick={confettiClick}>
                                    <i className="fa-regular fa-thumbs-up"></i>
                                    <p className="font-bold text-xs text-slate-500">좋아요</p>
                                </button>
                            )}

                            <button type="button" className='flex items-center gap-1 p-3 focus:outline-none false'>
                                <i class="fa-regular fa-paper-plane"></i>
                                <p className='font-bold text-xs text-slate-500'>리포스트</p>
                            </button>
                        </div>

                        <div className='py-3 flex gap-3 pr-6'>
                            <button><i class="fa-regular fa-message" onClick={() => feedViewHandler(feed.id)}></i></button>
                        </div>

                    </div>
                </div>
            </div >

            <br />
            <br />

        </>
    )
}
