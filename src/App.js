import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Notice from './pages/Notice';
import NoticeView from './pages/NoticeView'

import './styles/App.css';
import NoticeWrite from './pages/NoticeWrite';
import NoticeModify from './pages/NoticeModify';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/notice/write' element={<NoticeWrite />} />
          <Route path='/notice/view' element={<NoticeView />} />
          <Route path='/notice/modify' element={<NoticeModify />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
