import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../Token/Interceptor';

function Dashboard() {
  const [feedArticle, setFeedArticle] = useState('');
  const createFeed = () => {
    console.log(feedArticle);

    axios({
      method: 'post',
      url: '/api/feed/write',
      data: {
        memberId: 'userid',
        content: feedArticle,
      },

    })
      .then((res) => {
        console.log(res.data);
        window.location.replace('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showElements, setShowElements] = useState(false);
  const [commentTitle, setCommentTitle] = useState('');

  const handleButtonClick = () => {
    setShowElements(!showElements);
  };

  const handleCancelButtonClick = () => {
    setShowElements(false);
    setCommentTitle('');
  };

  return (
    <>
      <div className="h-screen bg-slate-50 flex flex-col">
        <nav className="h-14 w-full px-0 bg-slate-50 border-bottom-0">
          <div className="h-full w-full max-w-3xl mx-auto px-2 bg-white flex items-center justify-between border border-solid border-slate-300 border-t-0 border-x-0 md:border-x">
            <Link to="/home">
              <button type="button" className="w-10 h-10 p-0 flex items-center justify-center focus:outline-none">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </Link>

            <div className="flex gap-2 px-2">
              {/* <button
                type="button"
                className="focus:outline-0 rounded bg-white border border-solid border-color-coral-600 flex-none px-4 py-2 text-sm opacity-80"
              >
                <span className="text-color-coral-600">보관</span>
              </button> */}

              <button
                type="button"
                className="focus:outline-0 rounded bg-black flex-none px-4 py-2 text-sm opacity-60"
                onClick={createFeed}
              >
                <span className="text-white">완료</span>
              </button>
            </div>
          </div>
        </nav>

        {/* <div className="bg-white flex items-center gap-4 w-full max-w-screen-md mx-auto px-3 py-2 border border-solid border-slate-300 border-t-0 border-x-0 md:border-x">
                    <button type="button" className="p-1 focus:outline-none">
                        <i class="fa-regular fa-image"></i>
                    </button>
                </div> */}

        <div className="bg-white border border-solid w-full max-w-3xl flex-1 mx-auto overflow-auto hide-scroll-bar md:border-slate-300 md:border-y-0">
          <div className="mx-auto w-full max-w-[633px] px-4 flex flex-col py-5">
            {/* <div className="flex flex-row gap-3 justify-end">
                            <label className="flex items-center mb-0 justify-end">
                                <input
                                    type="checkbox"
                                    className="form-checkbox bg-white border border-solid border-slate-300 text-black rounded-sm focus:ring-0"
                                />
                                <p className="ml-2 text-xs font-bold text-slate-500">LinkedIn 공유</p>
                            </label>

                            <label className="flex items-center mb-0 justify-end">
                                <input
                                    type="checkbox"
                                    className="form-checkbox bg-white border border-solid border-slate-300 text-black rounded-sm focus:ring-0"
                                />
                                <p className="ml-2 text-xs font-bold text-slate-500">Facebook 공유</p>
                            </label>
                        </div> */}

            <div className="flex flex-col">
              {/* {!showElements ? (
                                <div
                                    role="button"
                                    className="py-3 flex gap-2 items-center group"
                                    aria-hidden="true"
                                    onClick={handleButtonClick}
                                >
                                    +{' '}
                                    <p className="font-bold text-slate-300 md:group-hover:text-slate-300 text-xl leading-normal">
                                        제목 추가
                                    </p>
                                </div>
                            ) : null} */}

              {showElements && (
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <div
                      role="button"
                      className="py-3 flex gap-2 items-center group"
                      aria-hidden="true"
                      onClick={handleCancelButtonClick}
                    >
                      🆇{' '}
                      <p className="font-bold text-slate-300 mg:group-hover:text-slate-400 text-sm leading-[30px]">
                        취소
                      </p>
                    </div>
                    <p className="text-slate-400 text-sm">0 / 40</p>
                  </div>
                  <textarea
                    id="commentTitle"
                    className="font-bold text-slate-900 text-xl leading-normal placeholder:text-slate-300 border-0 rounded-none px-0 py-3 w-full resize-none focus:ring-0 focus:outline-none caret-color-teal-800"
                    name="comentTitle"
                    placeholder="제목을 입력하세요."
                    rows="1"
                    style={{ height: '54px' }}
                    value={commentTitle}
                    onChange={(e) => setCommentTitle(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>

            <textarea
              id="description"
              className="text-slate-900 placeholder:text-slate-300 border-0 rounded-none px-0 py-6 resize-none focus:ring-0 focus:outline-none caret-color-teal-800 overflow-y-hidden"
              name="description"
              // placeholder="나누고 싶은생각을 적어주세요. 링크나 사진을 추가할 수도 있어요."
              placeholder="여기에 나누고 싶은생각을 적어주세요."
              style={{ height: '500px', important: true }}
              onChange={(e) => setFeedArticle(e.target.value)}
            ></textarea>
            <div className="h-4"></div>
            <div className="py-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
