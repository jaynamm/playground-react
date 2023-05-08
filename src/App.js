import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import './styles/App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
