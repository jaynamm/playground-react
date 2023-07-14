import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../Token/Interceptor';
import Swal from 'sweetalert2';

function Modify() {
  // 네비게이트
  const navigate = useNavigate();

  // 제목추가 on off
  const [showElements, setShowElements] = useState(false);
  const [commentTitle, setCommentTitle] = useState('');

  // const handleButtonClick = () => {
  //   setShowElements(!showElements);
  // };

  // const handleCancelButtonClick = () => {
  //   setShowElements(false);
  //   setCommentTitle('');
  // };

  // 상세보기 내용 가져오기
  const location = useLocation();
  const feedId = location.state.id;

  const [feed, setFeed] = useState([]);
  const [modifyFeed, setModifyFeed] = useState("");

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/feed/view/${feedId}`,
    })
      .then((res) => {
        console.log(res.data);
        const feedData = res.data.data.feed;
        setFeed(feedData);
        setModifyFeed(feedData.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const modifyHandler = (id) => {
    navigate(`/feed/view/${id}`, {
      state: {
        id: id,
      },
    });
  };

  // 피드 수정
  const modifySave = () => {
    const modifyData = {
      id: feed.id,
      content: modifyFeed,
    };

    axios
      .post('/api/feed/modify', modifyData, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      })
      .then((res) => {
        console.log('Feed modified successfully', res.data);
        modifyHandler(modifyData.id);
      })
      .catch((error) => {
        console.error('Failed to modify feed:', error);
      });
  };

  // 피드 나가기

  const modifyBack = () => {
    Swal.fire({
      text: '이 화면을 나가면 작성중이던 내용이 사라져요',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: '취소',
      cancelButtonColor: 'gray',
      confirmButtonText: '나가기',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/feed/view/${feedId}`, {
          state: {
            id: feedId,
          },
        });
      }
    });
  };

  return (
    <>
      <div className="h-screen bg-slate-50 flex flex-col">
        <nav className="h-14 flex justify-between items-center fixed z-20 w-full bg-white p-2 border">
          <button
            type="button"
            className="w-10 h-10 p-0 flex items-center justify-center focus:outline-none"
            onClick={modifyBack}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <h1 className="font-bold text-slate-900">피드 수정</h1>

          <button
            type="button"
            className="focus:outline-0 rounded bg-black flex-none px-4 py-2 text-sm opacity-60"
            onClick={modifySave}
          >
            <span className="text-white">완료</span>
          </button>
        </nav>

        {/* <div className="bg-white flex items-center gap-4 w-full max-w-screen-md mx-auto px-3 py-2 border border-solid border-slate-300 border-t-0 border-x-0 md:border-x">
          <button type="button" className="p-1 focus:outline-none">
            📷
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

            {/* <div className="flex flex-col">
              {!showElements ? (
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
              ) : null}

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
            </div> */}

            <textarea
              id="description"
              className="text-slate-900 placeholder:text-slate-300 border-0 rounded-none px-0 py-6 resize-none focus:ring-0 focus:outline-none caret-color-teal-800 overflow-y-hidden"
              name="description"
              style={{ height: '500px', important: true, marginTop: "50px" }}
              value={modifyFeed}
              onChange={(e) => {setModifyFeed(e.target.value)}}
            ></textarea>

            <div className="h-4"></div>
            <div className="py-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modify;
