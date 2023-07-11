import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/App.css';

import Home from './pages/Home';
import Main from './pages/Main';
import Notice from './pages/Notice';
import Idsearch from './components/Login/Idsearch';
import PasswordSearch from './components/Login/PasswordSearch';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import NoticeView from './components/Notice/NoticeView';
import NoticeWrite from './components/Notice/NoticeWrite';
import NoticeModify from './components/Notice/NoticeModify';
import Qna from './pages/Qna';
import { QnaWrite } from './components/Qna/QnaWrite';
import { QnaView } from './components/Qna/QnaView';
import QnaModify from './components/Qna/QnaModify';

import MyPage from './components/Mypage/MyPage';
import MyPageModify from './components/Mypage/MyPageModify';

import Create from './components/Feed/Create';
import View from './components/Feed/View';
import Modify from './components/Feed/Modify';
import MySkill from './components/Mypage/MySkill';

import Recommend from './components/Recommend/Recommend';
import RecommendResult from './components/Recommend/RecommendResult';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/idsearch" element={<Idsearch />} />
          <Route path="/passwordsearch" element={<PasswordSearch />} />

          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/write" element={<NoticeWrite />} />
          <Route path="/notice/view/:id" element={<NoticeView />} />
          <Route path="/notice/modify" element={<NoticeModify />} />

          <Route path="/qna" element={<Qna />} />
          <Route path="/qna/write" element={<QnaWrite />} />
          <Route path="/qna/view/:id" element={<QnaView />} />
          <Route path="/qna/qnaModify" element={<QnaModify />} />

          <Route path="/recommend" element={<Recommend />} />
          <Route path="/recommend/result" element={<RecommendResult />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/modify" element={<MyPageModify />} />
          <Route path="/mypage/myskill" element={<MySkill />} />

          <Route path="/createfeed" element={<Create />} />
          <Route path="/feed/view/:id" element={<View />} />
          <Route path="/feed/modify/:id" element={<Modify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
