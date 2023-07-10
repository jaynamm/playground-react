import React from 'react'
import Header from "../Base/Header";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import Moment from 'react-moment';
import Swal from 'sweetalert2';





export default function View() {

  // 수정삭제 마우스다운
  // const optionsRef = useRef(null);
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (optionsRef.current && !optionsRef.current.contains(event.target)) {
  //       setOptionsVisible(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // 피드 수정 삭제 드랍다운
  // const [optionsVisible, setOptionsVisible] = useState(false);
  // const toggleDrop = () => {
  //   setOptionsVisible(!optionsVisible);
  // };


  const [feed, setFeed] = useState([]);
  const [comments, setComments] = useState([]);

  const location = useLocation();
  const feedId = location.state.id;

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/feed/view/${feedId}`,
      headers: {
        // 'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('Authorization')
      }
    })
      .then((res) => {
        console.log(res.data);

        let feedData = res.data.data;

        setFeed(feedData.feed);
        console.log(feedData.feed);
        setComments(feedData.comments.content);
        console.log(feedData.comments);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  // 수정화면으로 id 들고가기
  const navigate = useNavigate();
  const modifyHandler = (id) => {

    navigate(`/feed/modify/${id}`, {
      state: {
        "id": id
      }
    })
  };




  const [textareaValue, setTextareaValue] = useState('');
  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleCommentRegistration = () => {
    // Create the comment object with the required information
    const commentData = {
      feedId: feedId, // Replace with the actual feedId value
      content: textareaValue,
    };

    axios.post('/api/comment/write', commentData, {
      headers: {
        'Authorization': localStorage.getItem('Authorization')
      }
    })
      .then((res) => {
        console.log('Comment registered successfully:', res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log('Error registering comment:', err);
      });
  };


  // 피드 삭제
  const feedDelete = () => {
    Swal.fire({
      title: '정말 삭제하시겠어요?',
      text: "삭제한 게시글은 복구할 수 없습니다",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '취소',
      cancelButtonColor: 'gray',
      confirmButtonText: '삭제',
      confirmButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('/api/feed/delete', { id: feed.id },
            {
              headers: {
                'Authorization': localStorage.getItem('Authorization')
              }
            })
          .then((res) => {
            Swal.fire(
              '삭제 되었습니다',
              '',
              'success'
            ).then(() => {
              window.location.replace("/home");
            });
          })
          .catch((error) => {
            console.error('Failed to delete comment:', error);
            Swal.fire(
              'X',
              '게시글을 삭제할 수 없습니다',
              'error'
            );
          });
      }
    });
  };

  return (
    <>
      <Header />
      <div className='w-[1024px] px-6 grid grid-cols-12 gap-12 bg-slate-50 mx-auto'>
        <div className='flex flex-col false py-8 col-span-8 gap-5'>
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
              <h1 className='mb-6 font-bold text-xl'>{feed.content}</h1>
              <p className='auto-line-break text-base text-slate-900 whitespace-pre-wrap'>

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
                    <img alt aria-hidden='true' src="/" className='block max-w-full w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0' />
                  </span>
                </div>
              </a>
            </div>

            <div className=' mx-4 mb-2 border-slate-500 py-3 flex justify-between'>
              <p className='text-sm text-slate-500'>
                <Moment format="YYYY-MM-DD HH:mm:ss">{feed.createdDate}</Moment>
              </p>
              {/* <p className='text-xs text-slate-500 false'>
                조회 <b>224</b>
              </p> */}
              <div id="modifyDeleteButton">

                <button type="button" className='px-2' onClick={() => modifyHandler(feed.id)}>
                  <i class="fa-solid fa-pen"></i>
                </button>


                <button type='button' className='px-2' onClick={feedDelete}>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>

              {/* <div className=''>
                <button><i ref={optionsRef} class="fa-solid fa-ellipsis-vertical" onClick={toggleDrop}></i></button>
                <div className='relative'>
                  {optionsVisible && (
                    <div className='absolute top shadow-lg bg-white rounded border border-slate-300 transform opacity-100 scale-100'>

                      <button type="button" className='py-2 px-4 hover:bg-slate-50'>
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
                </div>
              </div> */}


            </div>
            <div className='flex h-11'>
              <div className='flex px-1'>
                <button type="button" className='flex items-center gap-1 p-3 focus:outline-none false'>
                  <i class="fa-regular fa-thumbs-up"></i>
                  <p className='font-bold text-xs text-slate-500'>좋아요</p></button>
                <button type="button" className='flex items-center gap-1 p-3 focus:outline-none false'>
                  <i class="fa-regular fa-paper-plane"></i>
                  <p className='font-bold text-xs text-slate-500'>리포스트</p></button>

              </div>
            </div>
          </div>

          {/* 댓글 */}

          <div id='comment'>
            <h3 class="false m-0 py-6 font-bold mx-1 text-2xl">
              댓글 {feed.commentCount}
            </h3>
            <div className='bg-white border border-solid border-slate-300'>
              <form className='p-4'>
                <div className='flex gap-4 items-center'>
                  <div className='w-full items-center flex gap-2'>
                    <img src='/user.png' alt='userIcon' className='w-6 h-6'></img>
                    <div className='flex flex-grow'>
                      <textarea placeholder='댓글을 남겨보세요.' className='focus:ring-0 focus:outline-none leading-normal overflow-hidden resize-none font-sans flex-grow' style={{ height: '25px' }} value={textareaValue} onChange={(e) => {
                        handleTextareaChange(e);
                      }}></textarea>
                    </div>
                  </div>
                  <button type="button" className={`flex-none border border-solid bg-red-500 px-3 py-2 rounded-md text-white text-xs ${textareaValue === '' ? 'opacity-50' : ''}`} disabled={textareaValue === ''} onClick={handleCommentRegistration}>
                    등록
                  </button>
                </div>
              </form>

              {comments.map((comment) => (
                <Comments comment={comment} />
              ))}
            </div>
          </div>
        </div>

        {/* 추천 게시물  */}
        <div className='hidden md:inline col-span-4 sticky top-14 h-[calc(100vh-56px)] overflow-scroll overscroll-y-contain hide-scroll-bar'>
          <div className='py-8 flex flex-col gap-5'>
            <div className='bg-white border border-solid border-slate-300'>

              <div>
                <div className='pt-4 px-4'>
                  <h5 className='mb-0 font-bold'>주간 인기 TOP 10</h5>
                  <p className='text-sm text-slate700 mt-2'>
                    지난주 인기 있던 게시물이에요!
                  </p>
                </div>

                <div className='pb-4'>
                  <div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </>
  )
}
