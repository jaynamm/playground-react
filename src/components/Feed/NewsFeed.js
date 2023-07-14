import React, { useState, useEffect } from 'react';
import '../../styles/Feed/Newfeed.css';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confetti } from '../../App';
import axios from '../Token/Interceptor';
import Avvvatars from 'avvvatars-react';
import base64 from 'base-64';
import { Typography } from '@mui/material';

export default function NewsFeed({ feed }) {
  const [userId, setUserId] = useState('');
  const jwtToken = localStorage.getItem('accessToken'); // localStorage 에 있는 토큰 가져오기
  let payload = jwtToken.substring(jwtToken.indexOf('.') + 1, jwtToken.lastIndexOf('.')); // payload 추출하기
  let decodeMemberInfo = JSON.parse(base64.decode(payload)); // 디코딩 후 JSON 타입으로 파싱

  useEffect(() => {
    setUserId(decodeMemberInfo.sub);
  }, []);

  // View 창으로 id 들고가기
  const navigate = useNavigate();
  const feedViewHandler = (id) => {
    navigate(`/feed/view/${id}`, {
      state: {
        id: id,
      },
    });
  };

  // 좋아요 토글
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(feed.liked);
  }, []);

  // 좋아요 카운트
  const [likeCount, setLikeCount] = useState(feed.likeCount);

  // 팔로우 토글 - 피드 리스트에서 팔로우 기능을 사용하지 않아서 주석 처리함
  // const [follow, setFollow] = useState(false);

  // 팔로우 토스트알람 - 피드 리스트에서 팔로우 기능을 사용하지 않아서 주석 처리함
  // const followHandler = () => {
  //   setFollow((prevFollow) => !prevFollow);
  //   toast.info('팔로우 했어요 !', { position: 'top-center', autoClose: 2000, hideProgressBar: true });
  // };

  // 언팔로우 토스트알람 - 피드 리스트에서 팔로우 기능을 사용하지 않아서 주석 처리함
  // const unFollowHandler = () => {
  //   setFollow((prevFollow) => !prevFollow);
  //   toast.warning('팔로우 취소 했어요 !', { position: 'top-center', autoClose: 2000, hideProgressBar: true });
  // };

  // 좋아요 api
  const likeHandler = () => {
    axios.post('/api/likesCancel', { feedId: feed.id });
    setLiked(!liked);
    setLikeCount((likeCount) => likeCount - 1);
  };

  // confetti 효과 , 좋아요 api
  const confettiClick = () => {
    axios.post('/api/likes', { feedId: feed.id });

    confetti.addConfetti({
      emojis: ['👍'],
      emojiSize: 80,
      confettiNumber: 30,
    });
    setLiked(!liked);
    setLikeCount((likeCount) => likeCount + 1);
  };

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

  const calcDatetime = detailDate(new Date(feed.createdDate));

  return (
    <>
      <div className="bg-white border border-solid border-slate-300">
        <div className="flex justify-between items-center p-4 pb-0">
          <div className="flex gap-3 items-center pt-1">
            <Avvvatars value={feed.userId} style="shape" size={40} />

            <div className="flex-1">
              <p
                className="text-sm text-slate-900 font-bold"
                onClick={() => {
                  if (feed.userId !== userId) {
                    navigate(`/userpage/${feed.userId}`, { state: { id: feed.userId } });
                  } else {
                    navigate(`/mypage`, { state: { id: feed.userId } });
                  }
                }}
              >
                {feed.nickname}
              </p>
            </div>
          </div>

          <div className="flex px-1" style={{ marginLeft: '15px', fontSize: '12px' }}>
            {calcDatetime}
          </div>

          {/* { userId === feed.userId ? (
              <></>
          ) : (
            !follow ? (
              <div className="flex-none">
                <button type="button" 
                        className="btn btn-sm btn-coral-100 bg-blue-200 hover:bg-slate-200 text-coral-600 font-bold" 
                        onClick={followHandler} >
                  팔로우
                </button>
                <ToastContainer />
              </div>
            ) : (
              <div>
                <button className="btn btn-sm bg-red-200 hover:bg-red-100" onClick={unFollowHandler}>
                  <i class="fa-solid fa-user-xmark"></i>
                </button>
                <ToastContainer />
              </div>
            )
          )} */}
        </div>

        <div className="p-4">
          {/* <h1 className="mb-6 font-bold text-xl">{feed.content}</h1> */}
          <Typography className="m-1 font-bold text-xl" gutterBottom component="h1" style={{ whiteSpace: 'pre-line', overflowWrap: "break-word" }}>
            {feed.content}
          </Typography>
        </div>

        <div className="">
          <div className="flex px-1">
            <div className="flex px-1 items-center" style={{ marginLeft: '15px', fontSize: '12px' }}>
              <p className="text-xs text-slate-500 false">
                좋아요 <b>{likeCount}</b>
              </p>
            </div>
            <div className="flex px-1 items-center" style={{ marginLeft: '15px', fontSize: '12px' }}>
              <p className="text-xs text-slate-500 false">
                댓글 <b>{feed.commentCount}</b>
              </p>
            </div>
            <div className="flex px-1 items-center" style={{ marginLeft: '15px', fontSize: '12px' }}>
              <p className="text-xs text-slate-500">조회 {feed.viewCount} </p>
            </div>
            <div className="flex-grow"></div> {/* 빈 공간을 채우기 위한 추가 요소 */}
            <div className="flex">
              <div id="likeRepost" className="flex">
                {liked ? (
                  <button className="flex gap-1 p-3 focus:outline-none false" onClick={likeHandler}>
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p className="font-bold text-xs text-slate-500">좋아요 취소</p>
                  </button>
                ) : (
                  <button type="button" className="flex gap-1 p-3 focus:outline-none false" onClick={confettiClick}>
                    <i className="fa-regular fa-thumbs-up" style={{ fontSize: '15px' }}></i>
                    <p className="font-bold text-xs text-slate-500">좋아요</p>
                  </button>
                )}
                {/* <button type="button" className="flex items-center gap-1 p-3 focus:outline-none false">
                  <i class="fa-regular fa-paper-plane"></i>
                  <p className="font-bold text-xs text-slate-500">리포스트</p>
                </button> */}
              </div>
            </div>
            <div className="py-3 flex gap-3 pr-6">
              <div id="feedComment" className="flex">
                <button className="flex gap-1" style={{ fontSize: '15px' }} onClick={() => feedViewHandler(feed.id)}>
                  <i class="fa-regular fa-message"></i>
                  <p className="font-bold text-xs text-slate-500">댓글</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
