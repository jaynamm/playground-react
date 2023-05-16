import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/App.css';

import Home from './components/Home';
import Main from './components/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Qna from './pages/Qna';
import { QnaWrite } from './components/Qna/QnaWrite';
import { QnaView } from './components/Qna/QnaView';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/qna' element={<Qna />} />
          <Route path='/qna/write' element={<QnaWrite />} />
          <Route path='/qna/view/:id' element={<QnaView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
