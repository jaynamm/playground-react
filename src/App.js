import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';

import Home from './pages/Home';
import Main from './pages/Main';
import Notice from './pages/Notice';
import Idsearch from'./components/Login/Idsearch';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import NoticeView from './components/Notice/NoticeView'
import NoticeWrite from './components/Notice/NoticeWrite';
import NoticeModify from './components/Notice/NoticeModify';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/idsearch' element={<Idsearch />}/>
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
