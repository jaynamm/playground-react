import React from 'react';
import Header from '../Base/Header';
import { useState, useEffect, useRef } from 'react';
import axios from '../Token/Interceptor';
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { confetti } from '../../App';
import Avvvatars from 'avvvatars-react';
import base64 from 'base-64';


export default function View() {
  const [userId, setUserId] = useState("");
  const jwtToken = localStorage.getItem("accessToken"); // localStorage 에 있는 토큰 가져오기
  let payload = jwtToken.substring(jwtToken.indexOf('.')+1,jwtToken.lastIndexOf('.'));  // payload 추출하기
  let decodeMemberInfo = JSON.parse(base64.decode(payload)); // 디코딩 후 JSON 타입으로 파싱

  const navigate = useNavigate();
  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    setUserId(decodeMemberInfo.sub);
  }, [])

  const [feed, setFeed] = useState([]);
  const [comments, setComments] = useState([]);
  const [editButton, setEditButton] = useState();
  const location = useLocation();
  const feedId = location.state.id;

  const [liked, setLiked] = useState(false); // 좋아요 토글
  const [likeCount, setLikeCount] = useState(0); // 좋아요 카운트

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/feed/view/${feedId}`,
      headers: {
      },
    })
      .then((res) => {
        console.log(res.data)
        let feedData = res.data.data;
        setFeed(feedData.feed);
        setComments(feedData.comments.content);
        setEditButton(!res.data.responseMessage.includes('FAILED'));

        setLiked(feedData.feed.liked); 
        setLikeCount(feedData.feed.likeCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 수정화면으로 id 들고가기  
  const modifyHandler = (id) => {
    navigate(`/feed/modify/${id}`, {
      state: {
        id: id,
      },
    });
  };

  
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
          Authorization: localStorage.getItem('Authorization'),
        },
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
      text: '삭제한 게시글은 복구할 수 없습니다',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '취소',
      cancelButtonColor: 'gray',
      confirmButtonText: '삭제',
      confirmButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            '/api/feed/delete',
            { id: feed.id },
            {
              headers: {
                Authorization: localStorage.getItem('Authorization'),
              },
            }
          )
          .then((res) => {
            Swal.fire('삭제 되었습니다', '', 'success').then(() => {
              window.location.replace('/home');
            });
          })
          .catch((error) => {
            console.error('Failed to delete comment:', error);
            Swal.fire('X', '게시글을 삭제할 수 없습니다', 'error');
          });
      }
    });
  };

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

  const likeHandler = () => {
    if (liked) {
      console.log("좋아요 취소", likeCount);
  
      setLiked(false);
      setLikeCount((prevLikeCount) => prevLikeCount - 1);
  
      axios.post('/api/likesCancel', { feedId: feed.id });
    } else {
      console.log("좋아요 누름", likeCount);
  
      confetti.addConfetti({
        emojis: ["👍"],
        emojiSize: 80,
        confettiNumber: 30,
      });
  
      setLiked(true);
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
  
      axios.post('/api/likes', { feedId: feed.id });
    }
  };


  // 피드 무한스크롤
  const lastFeedRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLast, setIsLast] = useState();

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 1.0, // Trigger when the entire target is visible
    };

    const handleIntersect = (entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting && !isLast) {
        loadMoreContent();
      }
    };


    const loadMoreContent = () => {
      // Add your logic to fetch more feeds or load additional content here
      axios({
        method: 'GET',
        url: `/api/comment/list/${feedId}`,
        params: {
          page: currentPage
        }
      })
        .then((res) => {
          console.log(res.data);
          let commentData = res.data.content;
          setComments([...comments, ...commentData]);
          const page = res.data.number;
          setCurrentPage(page + 1);
          let isLast = res.data.last;
          setIsLast(isLast);
          console.log(isLast);
        })
        .catch((err) => {
          console.log(err);
        });
    };


    const observer = new IntersectionObserver(handleIntersect, options);
    if (lastFeedRef.current) {
      observer.observe(lastFeedRef.current);
    }

    return () => {
      if (lastFeedRef.current) {
        observer.unobserve(lastFeedRef.current);
      }
    };
  }, [comments]);


  const detailDate = (a) => {
		const milliSeconds = new Date() - a;
		const seconds = milliSeconds / 1000;
		if (seconds < 60) return `방금 전`;
		const minutes = seconds / 60;
		if (minutes < 60) return `${Math.floor(minutes)}분 전`;
		const hours = minutes / 60;
		if (hours < 24) return `${Math.floor(hours)}시간 전`;
		const days = hours / 24;
		if (days < 7) return `${Math.floor(days)}일 전`;
		const weeks = days / 7;
		if (weeks < 5) return `${Math.floor(weeks)}주 전`;
		const months = days / 30;
		if (months < 12) return `${Math.floor(months)}개월 전`;
		const years = days / 365;
		return `${Math.floor(years)}년 전`;
	};

  const calcFeedDetailDatetime = detailDate(new Date(feed.createdDate));



  return (
    <>
      <Header />
      <div className="w-[1024px] px-6 grid grid-cols-12 gap-12 bg-slate-50 mx-auto">
        <div className="flex flex-col false py-8 col-span-8 gap-5">
          <div className="bg-white border border-solid border-slate-300">
            <div className="flex justify-between items-center p-4">
              <div className="flex gap-4 items-center">
                {/* <img src="/user.png" alt="User profile picture" className="w-8 h-8" /> */}
                <Avvvatars value={feed.userId} style="shape" size={40}/>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{feed.nickname}</p>
                  {/* <p className="text-xs text-slate-700">{feed.userId}</p> */}
                </div>
              </div>

              {editButton ? (
                <div id="modifyDeleteButton">
                  <button type="button" className="px-2" style={{ color: "grey", fontSize: "12px" }} onClick={() => modifyHandler(feed.id)}>
                    <i class="fa-solid fa-pen"></i> 수정
                  </button>
                  <button type="button" className="px-2" style={{ color: "darkred", fontSize: "12px" }} onClick={feedDelete}>
                    <i className="fa-solid fa-trash"></i> 삭제
                  </button>
                </div>
              ) : (
                !follow ? (

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
  
                )
              )}

            </div>
            <div className="p-4">
              <p className="auto-line-break text-base text-slate-900 whitespace-pre-wrap">
                <h1 className="mb-6 font-bold text-xl">{feed.content}</h1>  
                {/* <a
                  className="text-slate-900 mt-6 flex underline"
                  target="_blank"
                  rel="origin"
                  href="https://www.lipsum.com/"
                >
                  https://www.lipsum.com/
                </a> */}
              </p>
            </div>
            {/* <div id="article" className="px-4 py-2">
              <a href="https://www.lipsum.com/" target="_blank" rel="origin">
                <div className="border border-solid border-slate-200 rounded-lg overflow-hidden bg-slate-50 flex">
                  <div className="flex-1 p-4">
                    <p className="mb-1 text-sm font-bold text-slate-900 line-clamp-3">북마크 샘플</p>
                    <p className="text-sm text-slate-700 line-clamp-1">정보 샘플</p>
                  </div>
                  <span className="box-border inline-block overflow-hidden w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 relative max-w-full">
                    <span className="box-border block w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 max-w-full"></span>
                    <img
                      alt
                      aria-hidden="true"
                      src="/"
                      className="block max-w-full w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0"
                    />
                  </span>
                </div>
              </a>
            </div> */}
            <div className=' mx-4 mb-2 border-slate-500 py-3 flex justify-between'>
              <p className="text-xs text-slate-500">조회 {feed.viewCount} </p>
              <p className="text-xs text-slate-500 false">
                <pre>좋아요 <b>{likeCount}</b>        댓글 <b>{feed.commentCount}</b></pre>
              </p>
            </div>


            <div className=''>
              <div className='flex px-1 justify-between'>
                <div className="flex px-1 items-center" style={{ marginLeft: "15px", fontSize: "12px" }}>
                  {/* <Moment format="YYYY-MM-DD HH:mm:ss">{feed.createdDate}</Moment> */}
                  {calcFeedDetailDatetime}
                </div>
                <div id="likeRepost" className='flex'>
                  {liked ? (
                    <button className="flex items-center gap-1 p-3 focus:outline-none false" onClick={likeHandler}>
                      <i className="fa-solid fa-thumbs-up"></i>
                      <p className="font-bold text-xs text-slate-500">좋아요 취소</p>
                    </button>
                  ) : (
                    <button type="button" className="flex items-center gap-1 p-3 focus:outline-none false" onClick={likeHandler}>
                      <i className="fa-regular fa-thumbs-up"></i>
                      <p className="font-bold text-xs text-slate-500">좋아요</p>
                    </button>
                  )}

                  {/* <button type="button" className='flex items-center gap-1 p-3 focus:outline-none false'>
                    <i class="fa-regular fa-paper-plane"></i>
                    <p className='font-bold text-xs text-slate-500'>리포스트</p>
                  </button> */}
                </div>


              </div>
            </div>
          </div >

          {/* 댓글 */}
          <div id="comment">
            <h3 className="false m-0 py-6 font-bold mx-2 text-2xl">댓글 {feed.commentCount}</h3>
            <div className="bg-white border border-solid border-slate-300">
              <form className="p-4">
                <div className="flex gap-4 items-center">
                  <div className="w-full items-center flex gap-2">
                    {/* <img src="/user.png" alt="userIcon" className="w-6 h-6"></img> */}
                    <Avvvatars value={userId} style="shape" size={40}/>
                    <div className="flex flex-grow">
                      <textarea
                        placeholder="댓글을 남겨보세요."
                        className="focus:ring-0 focus:outline-none leading-normal overflow-hidden resize-none font-sans flex-grow"
                        style={{ height: '25px' }}
                        value={textareaValue}
                        onChange={(e) => {
                          handleTextareaChange(e);
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`flex-none border border-solid bg-red-500 px-3 py-2 rounded-md text-white text-xs ${textareaValue === '' ? 'opacity-50' : ''
                      }`}
                    disabled={textareaValue === ''}
                    onClick={handleCommentRegistration}
                  >
                    등록
                  </button>
                </div>
              </form>

              {/* {comments.map((comment) => (
                <Comments comment={comment} />
              ))} */}

              {comments.map((comment, index) => {
                if (index === comments.length - 1) {
                  return (
                    <div ref={lastFeedRef} key={comment.id}>
                      <Comments comment={comment} />
                    </div>
                  );
                } else {
                  return <Comments comment={comment} key={comment.id} />;
                }
              })}


            </div>
          </div>
        </div>
        {/* 추천 게시물  */}
        <div className="hidden md:inline col-span-4 sticky top-14 h-[calc(100vh-56px)] overflow-scroll overscroll-y-contain hide-scroll-bar">
          <div className="py-8 flex flex-col gap-5">
            <div className="bg-white border border-solid border-slate-300">
              <div>
                <div className="pt-4 px-4">
                  <h5 className="mb-0 font-bold">주간 인기 TOP 10</h5>
                  <p className="text-sm text-slate700 mt-2">지난주 인기 있던 게시물이에요!</p>
                </div>
                <div className="pb-4">

                  {/* 박스디자인 */}
                  <button>
                    <div className='md:hover:bg-slate-50 h-20 px-4 flex items-center gap-3'>
                      <div className='flex-none w-[24px] flex justify-center'>
                        <span className='leading-none font-bold text-xl text-cyan-600'>
                          1
                        </span>
                      </div>
                      <div className='relative flex-none w-10 h-10 border border-slate-200 bg-white rounded-full'>

                      </div>
                      <div className='flex-1 pl-1'>
                        <p className='mb-1 text-sm text-slate-900 line-clamp-2'>
                          우아한형제들에서 시니어 개발자로 일하면 어떨까? – (1) 일
                        </p>
                        <p className='text-xs text-slate-700 line-clamp-1'>
                          <span className='font0bold text-slate-900'>
                            우아한형제들
                          </span>
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* 박스디자인 */}
                  <button>
                    <div className='md:hover:bg-slate-50 h-20 px-4 flex items-center gap-3'>
                      <div className='flex-none w-[24px] flex justify-center'>
                        <span className='leading-none font-bold text-xl text-cyan-600'>
                          2
                        </span>
                      </div>
                      <div className='relative flex-none w-10 h-10 border border-slate-200 bg-white rounded-full'>

                      </div>
                      <div className='flex-1 pl-1'>
                        <p className='mb-1 text-sm text-slate-900 line-clamp-2'>
                          사이드 프로젝트에 사용하기 좋은 upstash.com 서비스
                        </p>
                        <p className='text-xs text-slate-700 line-clamp-1'>
                          <span className='font0bold text-slate-900'>
                            asbubam
                          </span>
                          당근마켓 SRE팀
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* 박스디자인 */}
                  <button>
                    <div className='md:hover:bg-slate-50 h-20 px-4 flex items-center gap-3'>
                      <div className='flex-none w-[24px] flex justify-center'>
                        <span className='leading-none font-bold text-xl text-cyan-600'>
                          3
                        </span>
                      </div>
                      <div className='relative flex-none w-10 h-10 border border-slate-200 bg-white rounded-full'>

                      </div>
                      <div className='flex-1 pl-1'>
                        <p className='mb-1 text-sm text-slate-900 line-clamp-2'>
                          사이드 프로젝트에 사용하기 좋은 upstash.com 서비스
                        </p>
                        <p className='text-xs text-slate-700 line-clamp-1'>
                          <span className='font0bold text-slate-900'>
                            asbubam
                          </span>
                          당근마켓 SRE팀
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* 박스디자인 */}
                  <button>
                    <div className='md:hover:bg-slate-50 h-20 px-4 flex items-center gap-3'>
                      <div className='flex-none w-[24px] flex justify-center'>
                        <span className='leading-none font-bold text-xl text-cyan-600'>
                          4
                        </span>
                      </div>
                      <div className='relative flex-none w-10 h-10 border border-slate-200 bg-white rounded-full'>

                      </div>
                      <div className='flex-1 pl-1'>
                        <p className='mb-1 text-sm text-slate-900 line-clamp-2'>
                          사이드 프로젝트에 사용하기 좋은 upstash.com 서비스
                        </p>
                        <p className='text-xs text-slate-700 line-clamp-1'>
                          <span className='font0bold text-slate-900'>
                            asbubam
                          </span>
                          당근마켓 SRE팀
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* 박스디자인 */}
                  <button>
                    <div className='md:hover:bg-slate-50 h-20 px-4 flex items-center gap-3'>
                      <div className='flex-none w-[24px] flex justify-center'>
                        <span className='leading-none font-bold text-xl text-cyan-600'>
                          5
                        </span>
                      </div>
                      <div className='relative flex-none w-10 h-10 border border-slate-200 bg-white rounded-full'>

                      </div>
                      <div className='flex-1 pl-1'>
                        <p className='mb-1 text-sm text-slate-900 line-clamp-2'>
                          사이드 프로젝트에 사용하기 좋은 upstash.com 서비스
                        </p>
                        <p className='text-xs text-slate-700 line-clamp-1'>
                          <span className='font0bold text-slate-900'>
                            asbubam
                          </span>
                          당근마켓 SRE팀
                        </p>
                      </div>
                    </div>
                  </button>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="w-[1024px] px-6 grid grid-cols-12 gap-12 bg-slate-50 mx-auto">
        <div className="flex flex-col false py-8 col-span-8 gap-5">
          <div className="bg-white border border-slate-300">
            <div className="items-center flex text-sm text-slate-400">
              <i class="fa-regular fa-comments p-4"></i>
              <p>이 글의 첫 댓글을 달아보세요!</p>
            </div>
          </div>
        </div>
      </div> */}

    </>
  );
}