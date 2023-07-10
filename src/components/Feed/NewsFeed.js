import React, { useState, useEffect, useRef } from 'react'
import '../../styles/Feed/Newfeed.css'
import Moment from 'react-moment'
import { useNavigate, Link } from 'react-router-dom';


export default function NewsFeed({ feed, likeCount, setLikeCount }) {

    const navigate = useNavigate();
    const feedViewHandler = (id) => {

        navigate(`/feed/view/${id}`, {
            state: {
                "id": id
            }
        })
    };

    // 수정삭제 마우스다운
    // const optionsRef = useRef(null);
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (optionsRef.current && !optionsRef.current.contains(event.target)) {
    //             setOptionsVisible(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    // 피드 수정 삭제 드랍다운
    // const [optionsVisible, setOptionsVisible] = useState(false);
    // const toggleDrop = () => {
    //     setOptionsVisible(!optionsVisible);
    // };




    return (
        <>
            <div className='bg-white border border-solid border-slate-300'>
                <div className='flex justify-between items-center p-4'>
                    <div className='flex gap-4 items-center'>
                        <img src="/user.png" alt="User profile picture" className='w-8 h-8' />
                        <div className='flex-1'>
                            <p className='text-sm text-slate-900 font-bold'>{feed.nickname}</p>
                            <p className='text-xs text-slate-700'>{feed.userId}</p>
                        </div>
                    </div>
                    <div className='flex-none'>
                        <button className='btn btn-sm btn-coral-100 bg-slate-300 hover:bg-slate-200 text-coral-600 font-bold' type='button'>팔로우</button>
                    </div>
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
                                {/* <img alt aria-hidden='true' src="/" className='block max-w-full w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0' /> */}
                            </span>
                        </div>
                    </a>
                </div>

                <div className=' mx-4 mb-2 border-slate-500 py-3 flex justify-between'>
                    <p className='text-sm text-slate-500'>
                        <Moment format="YYYY-MM-DD HH:mm:ss">{feed.createdDate}</Moment>
                    </p>
                    <p className='text-xs text-slate-500 false'>
                        댓글 <b>{feed.commentCount}</b> * 조회 <b>224</b>
                    </p>
                </div>


                <div className=''>
                    <div className='flex px-1 justify-between'>
                        <div id="likeRepost" className='flex'>
                            <button type="button" className='flex items-center gap-1 p-3 focus:outline-none false'>
                                <i class="fa-regular fa-thumbs-up"></i>
                                <p className='font-bold text-xs text-slate-500'>좋아요</p>
                            </button>
                            <button type="button" className='flex items-center gap-1 p-3 focus:outline-none false'>
                                <i class="fa-regular fa-paper-plane"></i>
                                <p className='font-bold text-xs text-slate-500'>리포스트</p></button>
                        </div>

                        <div className='py-3 flex gap-3 pr-6'>
                            <button><i class="fa-regular fa-message" onClick={() => feedViewHandler(feed.id)}></i></button>
                            {/* <button><i ref={optionsRef} class="fa-solid fa-ellipsis-vertical" onClick={toggleDrop}></i></button> */}
                            {/* <div className='relative'>
                                {optionsVisible && (
                                    <div className='absolute top shadow-lg bg-white rounded border border-slate-300 transform opacity-100 scale-100'>

                                        <button type="button" className='py-2 px-4 hover:bg-slate-50' >
                                            <span className='text-slate-900 text-sm text-keep whitespace-nowrap'>
                                                <i class="fa-solid fa-pen"></i>
                                                수정
                                            </span>
                                        </button>

                                        <button type='button' className='py-2 px-4 hover:bg-slate-50'>
                                            <span className='text-slate-900 text-sm whitespace-nowrap'>
                                                <i class="fa-solid fa-trash"></i>
                                                삭제
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div> */}
                        </div>

                    </div>
                </div>
            </div >
            <br />
            <br />

        </>
    )
}