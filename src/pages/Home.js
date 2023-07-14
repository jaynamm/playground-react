import React, { useEffect, useState, useRef } from 'react';
import axios from '../components/Token/Interceptor';
import '../styles/Home.css';
import { redirect, useHistory } from 'react-router-dom';
import NewsFeed from '../components/Feed/NewsFeed';
import Header from '../components/Base/Header';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Skeleton from '../components/Feed/Skeleton';
import { confetti } from '../App';

const Hello = () => {
  confetti.addConfetti({
    confettiColors: [
      '#FF0000', // Red
      '#FFA500', // Orange
      '#FFFF00', // Yellow
      '#00FF00', // Green
      '#0000FF', // Blue
      '#FF00FF', // Magenta
    ],
    confettiRadius: 5,
    confettiNumber: 500,
  });
  Swal.fire({
    title: 'Welcome to PlayGround',
    width: 500,
    padding: '50',
    color: 'white',
    background: 'url(homeCoding.gif)',
    backdrop: `
            rgba(0,0,0,0)
            url("")
            left top
            no-repeat
        `,
  });
};

const Home = () => {
  const [feeds, setFeeds] = useState([]);
  const [hotFeeds, setHotFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 피드 무한스크롤
  const lastFeedRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/feed/list',
    })
      .then((res) => {
        console.log(res.data);
        let feedData = res.data.content;
        setFeeds(feedData);
        setIsLoading(false);
        const isLast = res.data.last;
        setIsLast(isLast);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    axios.get('/api/feed/hotfeed')
        .then((res) => {
          setHotFeeds(res.data);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
  }, []);

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
        url: '/api/feed/list',
        params: {
          page: currentPage,
        },
        // Add necessary parameters or headers for the API request
      })
        .then((res) => {
          // Process the response data and append the new feeds to the existing feeds array
          const newFeeds = res.data.content;
          setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
          const page = res.data.number;
          setCurrentPage(page + 1);
          const isLast = res.data.last;
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
  }, [feeds]);

  return (
    <>
      <Header />
      <div className="w-[1024px] px-6 grid grid-cols-12 gap-12 bg-slate-50 mx-auto">
        <div className="flex flex-col py-8 col-span-8 gap-4">
          {/* 피드작성 */}
          <div className="bg-white border border-solid border-slate-300 border-x-0">
            <div className=" items-center gap-5 p-4">
              <Link to="/createfeed">
                <button
                  type="button"
                  className="shadow-none w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-center"
                >
                  <p className="text-sm text-slate-400">나누고 싶은 생각이 있으신가요?</p>
                </button>
              </Link>
            </div>
          </div>
          {/* 피드작성 */}

          {/* 피드 */}
          <div className="infinite-scroll-component__outerdiv">
            <div className="infinite-scroll-component flex flex-col gap-5 h-auto overflow-auto">
              <div>
                <div className="feed-wrapper">
                  {isLoading ? (
                    // 로딩될 때 스켈레톤 UI 생성
                    <>
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </>
                  ) : (
                    // 로딩되면 피드 생성
                    feeds.map((feed, index) => {
                      if (index === feeds.length - 1) {
                        return (
                          <div ref={lastFeedRef} key={feed.id}>
                            <NewsFeed feed={feed} />
                          </div>
                        );
                      } else {
                        return <NewsFeed feed={feed} key={feed.id} />;
                      }
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 피드 */}

        {/* 추천게시물 */}
        <div id="right" className="hidden md:inline col-span-4 sticky top-14 h-[calc(100vh-56px)] overflow-scroll overscroll-contain hide-scroll-bar ">
          <div className="py-8 flex flex-col gap-5">
            <div className="flex p-4 bg-white border border-solid border-slate-300">
              <p className="flex-1 font-bold py-4">PlayGround</p>
              <div className="relative">
                <button onClick={Hello}>
                  <img className="h-20 w-20" src="/pixelHome3.gif" alt="ok" />
                </button>
              </div>
            </div>

            <div className="bg-white border border-solid border-slate-300">
              {/*상단 탭*/}
              <div>
                <div className="pt-4 px-4">
                  <h5 className="mb-0 font-bold">주간 인기 TOP 10</h5>
                  <p className="text-sm text-slate-700 mt-2">지난주 인기 있던 게시물이에요!</p>
                </div>
                {/*상단 탭*/}

                {/*하단 탭 */}
                <div className="pb-4">
                  {/* 박스디자인 */}
                  { hotFeeds.map((hotFeeds, index) =>
                  <button className="hotFeeds">
                    <div className="md:hover:bg-slate-50 h-20 px-4 flex items-center gap-3">
                      <div className="flex-none w-[24px] flex justify-center">
                        <span className="leading-none font-bold text-xl text-cyan-600">{index + 1}</span>
                      </div>

                      <div className="flex-1 pl-1">
                        <p className="mb-1 text-sm text-slate-900 line-clamp-2">
                          {hotFeeds.content}
                        </p>
                        <p className="text-xs text-slate-700 line-clamp-1">
                          <span className="font0bold text-slate-900">
                            {hotFeeds.nickname}
                          </span>
                        </p>
                      </div>
                    </div>
                  </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 추천게시물 */}
      </div>
    </>
  );
};
export default Home;
